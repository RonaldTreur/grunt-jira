/*
 * grunt-jira
 * https://github.com/ronaldtreur/grunt-jira
 *
 * Copyright (c) 2015 Ronald Treur
 * Licensed under the MIT license.
 */

var JiraApi = require('jira').JiraApi,
	util = require('util'),
	commands = require('../lib/commands'),
	requiredSettings = ['protocol', 'host', 'port', 'user', 'password'];

module.exports = function (grunt) {
	'use strict';

	function processTask(taskDetails, options, jira, grunt, taskManager, done) {
		var fn = commands[taskDetails.type];

		/*
			option.<value> - Most JIRA requests require additional information in order to be successfull.

			The documentation below will describe -per JIRA-task- the values that you need to supply. For all these
			values, you can opt to supply a function that returns a value, instead of a value directly.

			When you use a function, and your target contains multiple tasks, the function will be passed the result
			from the previous JIRA-task.

			This allows you to define a chain of tasks, where each task is reliant on the information obtained by the
			previous one.

			Note that using the `process`-option gives you even more freedom in controlling the input for the next task.
		 */
		var task = {
			getValue: function(key, defaultValue) {
				var value;

				if (taskDetails[key] !== undefined) {
					value = taskDetails[key];
				} else if (options[key] !== undefined) {
					value = options[key];
				} else {
					value = defaultValue;
				}

				return isFunction(value) ? value(taskManager.passValueOn, grunt) : value;
			}
		};

        fn(task, jira, grunt, function(err, result) {
        	processResult(err, taskDetails, grunt, done, taskManager, result);
    	});
    }

    function processResult(err, task, grunt, done, taskManager, result) {
		if (err) {
			grunt.log.fail(err);
			done(false);
			return;
		}

		grunt.verbose.ok("Result received from Jira");
		//grunt.verbose.writeln(JSON.stringify(result));
		//console.log(result);
		
		/*
			option.config (optional) - Either a String or a dicttionary object.

			Say, the Jira result object contains a 'issue'-key that contains an object
			containing issue-related data, then

			Example:
			config: 'git.commit.issue'

			This will copy the complete result-object into the git.commit.issue-config.

			Example:
			config: {
				'git.commit.issue': 'issue.number',
				'prompt.issue.number': 'issue.number'
			}

			This will copy the issueNumber into both the git.commit.issue-config, 
			as well as to the prompt.issue.number-config.
		 */
    	if (task.config) {
    		if (isString(task.config)) {
    			grunt.config(task.config, result);
    		} else if (isPlainObject(task.config)) {
    			for (var configKey in task.config) {
    				grunt.template.process('<%= ' + task.config[configKey] + ' %>', {data: result});
    				grunt.config(configKey, result);
    			}
    		} else {
    			grunt.log.fail('The `config`-property only accepts object and string values');
    			done(false);
    			return;
    		}
    	}

    	/*
    		option.process (optional) - If assigning the resulting object (or part of it) to the grunt config is
    		not enought, you can define a process-function that will receive the resulting object as a parameter.
    		When the Jira request succeeds, this function will be invoked.

    		When part of a task-chain, the process-function (as a second parameter) will also receive the result of the
    		previous task. What's more, the return value (if any) will manipulate the result of the task currently being
    		performed. This means the return value is what will be passed on to the next task, instead of the actual result.

    		Potentially this allows you to stack several result together in order to then perform a task that requires
    		information retrieved by multiple tasks that were performed previously.

    		Note: Using the process-options does not overrule the `config`-option. Both can be used side-by-side just fine,
    		with the config-option being resolved first.
    	 */
    	if (task.process) {
    		taskManager.passValueOn = task.process(result, taskManager.passValueOn) || result;
    	} else {
    		taskManager.passValueOn = result;
    	}

    	taskManager.lastResult = null;
		done();
	}

	grunt.registerMultiTask('jira', 'Perform various Jira tasks', function() {
		var self = this,
			done = self.async(),
			missingOptions = [],
			options = self.options(),
			jira;

		self.tasks = options.tasks || [options];
		self.lastResult = null;
		self.passValueOn = null;

		requiredSettings.forEach(function(setting) {
			if (options[setting] === undefined) {
				missingOptions.push(setting);
			}
		});

		if (missingOptions.length) {
			grunt.log.fail('Required option(s) not found: ' + missingOptions.join(', '));
			done(false);
			return;
		}

		jira = new JiraApi(
			options.protocol,
			options.host,
			options.port,
			options.user,
			options.password,
			'2',
			true
		);

		var taskNr = 0;

		var next = function next() {
			if (taskNr < self.tasks.length) {
				processTask(self.tasks[taskNr], options, jira, grunt, self, next);
				taskNr++;	
			} else {
				done();
			}
		};

		next();
	});

	function isFunction(value) {
		return typeof value === 'function';
	}

	function isString(value) {
		return typeof value === 'string';
	}

	function isPlainObject(value) {
		return typeof value === 'object' && !util.isArray(value);
	}
};
