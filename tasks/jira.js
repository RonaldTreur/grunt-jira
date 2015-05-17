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

			When you use a function and your tasks-property contains multiple tasks, this function will be passed the result
			from the JIRA-task that was invoked previously (unless it's the first, obviously).

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

				return isFunction(value) ? value(taskManager.passValueOn) : value;
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
    		option.process (optional) - The function assigned to this property will be invoked immediately when the
    		Jira-request returns successfully. This means it is invoked even before the result value will be assigned to
    		the `config`-property (if one was provided). When invoked, this function will receive the result of the
    		Jira-request as its first parameter. Note that if the process-function returns anything 'truthy', the
    		returned value will override Jira's result and take its place.

    		So, if assigning Jira's raw result-object (or part of it) into Grunt's configuration is not working
    		for you, you can define a process-function in order to manipulate it.

    		A second use-case is when writing a value to Grunt's config is not your desired outcome. Perhaps you want to
    		write it to a file, or do other crazy things with it. You can do so in the process-function. 

    		Lastly, when the completed task was part of a task-chain (i.e. it was defined as an element of the
    		tasks-property), the function defined will also receive the (potentially processed) result-object of
    		the previous task (as a second parameter).

    		This allows you, amongst other things, to combine the results from several seperate Jira tasks together
    		in order to then perform a task that depends on this combined information.
    	 */
    	if (task.process) {
    		if (isFunction(task.process)) {
    			result = task.process(result, taskManager.passValueOn) || result;
    		} else {
				grunt.log.fail('The `process`-property only accepts a function value');
    			done(false);
    			return;
    		}
    	}

		/*
			option.config (optional) - Either a String or a dictionary object.

			The resulting object, returned by your Jira-command can be saved into Grunt's
			configuration. This is helpful, because you can then use it / build on it using 
			other Grunt tasks.

			Defining the config option as a string has the following effect:

			* it will set or overwrite the config of other Grunt tasks: `config: 'git.commit.issue'`, or
			* it can be an arbitrary value, that you can then read using grunt.config: `grunt.config('git.commit.issue')`

			Example:
			```
			config: 'git.commit.issue'
			```

			This will copy the complete result-object into Grunt's 'git.commit.issue'-config-property.

			You can also specify a dictionary object, where the keys are the config-properties you want to set. 
			The value you specify for each of these keys, should be a string that depicts a property in Jira's
			result-object that you want to assign to it.

			This gives you more fine-grained control over what properties are assigned to what config-property, instead
			of having to deal with the complete result-object down the line.
	
			Example:
			```
			config: {
				'git.commit.issue': 'issue.number',
				'prompt.issue.number': 'issue.number'
			}
			```

			This particular example will copy the issueNumber into both the *git.commit.issue* config, 
			as well as to the *prompt.issue.number*-config.
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

    	taskManager.passValueOn = result;
    	
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

		var next = function next(cont) {
			if (cont !== false && taskNr < self.tasks.length) {
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