# grunt-jira 

> JIRA integration for Grunt

## Jump to Section

* [Introduction](#introduction)
* [Getting Started](#getting-started)
* [Usage](#usage)
* [Options](#options)
* [General Options](#general-options)
* [Task Options](#task-options)
* [Specific Task Options](#specific-task-options)
* [Example Configurations](#example-configurations)
* [Credits](#credits)
* [Releases](#releases)

## Introduction
[[Back To Top]](#jump-to-section)

There a few ways in which you can automate a workflow that involves [Atlassian Jira](https://www.atlassian.com/software/jira), using its administration dashboard. Unfortunately the options offered by Jira's own interface are severly limited. Their API however isn't. 

If you're using Grunt, there is a good chance that you'd like to manipulate Jira using Grunt, as you would any other part of your workflow. If that is the case you've come to the right place. Building on top Jira's rich API via its Node [wrapper](https://www.npmjs.com/package/jira) (created by Steven Surowiec), this Grunt task allows you query and manipulate Jira the way in every way possible.

## Getting Started
[[Back To Top]](#jump-to-section)

This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jira --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jira');
```


## Usage
[[Back To Top]](#jump-to-section)

In your project's Gruntfile, add a section named `jira` to the data object passed into grunt.initConfig().

```js
grunt.initConfig({
  jira: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})

// Load the task
grunt.loadNpmTasks('grunt-jira');
```

## Options
[[Back To Top]](#jump-to-section)

There are two sets of properties you can use to configure Grunt-Jira. The properties that are part of the first set should always be part of your task's `options`-property. Most of these properties are mandatory (in order to connect to your Jira service) but some are not. This first set is dubbed **General options**.

Note: It makes sense to add the connection-properties to your task's `options`-property, instead of reiterating them for each of your targets.

The second set contains properties that can either be part of your target's `options`-property, or can be part of the array assigned to the `tasks`-property (which itself is a general option). See the description of the [tasks](#tasks) property for more details. These properties are in general related to querying Jira to get specific results. Most of these are entirely dependent on the type of task you want Jira to perform. This second set of properties is dubbed **Task options**.

## General Options
[[Back To Top]](#jump-to-section)

Below is the full list of general options. These options should be assigned to either the `options`-property of either your Jira task, or of your Jira task's target.

### protocol (*required*)
> Either http or https

`nuff said.

```js
protocol: 'http:'
```

### host (*required*)
> The host running Jira

```js
host: 'jira.yourdomain.com'
```

### port (*required*)
> The port on which Jira is available

```js
port: '4444'
```

Assigning an empty string makes sure no port-number is postfixed to the host-address.

```js
port: ''
```
		
### user (*required*)
> The username for the account used to access Jira

```js
user: 'peterp'
```

It's best-practice to not include the username into the Gruntfile. In all scenario's it's best to import a seperate file (not part of the project) and have it define the credentials used for authentication.

```js
user: jiraConfig.user
```

### password (*required*)
> The password for the account used to access Jira

**Never** save your password into the Gruntfile, always store it in a seperate JSON-file outside your project's folder (so it does not end up in your repository).

```js
password: jiraConfig.password
```

### tasks
> A list of jira tasks to perform

When one task isn't enough, you can define several inside a single target. Use the `tasks`-property to define an array of task-definitions. These definitions should be objects that consist solely of *task* options.

The tasks in this array will be excuted synchronously, one-by-one in the order they were defined. You can easily use the response value from a succesfull task in the subsequent one. By assigning a function instead of a static value to any of the  task's properties, you can dynamically return its value. The result object of the previous Jira task (if any) will be passed along to this function when it is invoked. This means you can use its contents to generate the data needed for the task following it.

A tasks-array containing several tasks, is called a task-chain.

```js
tasks: [{..}, {..}]
```

## Task Options
[[Back To Top]](#jump-to-section)

The options mentioned below should be (normally) part of either the `options`-property inside your Jira's task target, or of a task-definition object that is assigned to the `tasks`-property.

### type (*required*)
> The Jira request you want to perform

This has to be one of the following strings:

 * findissue
 * listfields
 * getuserissues
 * search
 * searchusers

*Note:* More commands, and additional information on the commands will be added shortly.

```js
type: 'findissue'
```

### config
> Either a String or a dictionary object defining where to save the result

When a Jira tasks completes, the resulting object can be saved into Grunt's
configuration. You can then use this value lateron in your workflow. 

By assigning a string to this property you can either:

 * set or overwrite the config of other Grunt tasks: `config: 'git.commit.issue'`, or
 * create an arbitrary value, that you can then read using grunt.config: `grunt.config('git.commit.issue')`

The example below will copy the complete result-object into Grunt's 'git.commit.issue'-config-property:
```
config: 'git.commit.issue'
```


You can also specify a dictionary object, where the keys are the config-properties you want to set. 
The value you specify for each of these keys, should be a string that depicts a property in Jira's
result-object that you want to assign to it.

This gives you more fine-grained control over what properties are assigned to what config-property, instead
of having to deal with the complete result-object down the line.

The example below will copy the issueNumber into both the *git.commit.issue* config, 
as well as to the *prompt.issue.number*-config:
```
config: {
	'git.commit.issue': 'issue.number',
	'prompt.issue.number': 'issue.number'
}
```


### process
> A function that will process the result

The function assigned to this property will be invoked immediately when the
Jira-request returns successfully. This means it will be executed even before the result value will be assigned to
the `config`-property (if one was provided). When invoked, this function will receive the result of the
Jira-request as its first parameter. If the assigned function returns a 'truthy' value, that value will become the new result-value.

There are generally three use-cases for this function:

1) If storing Jira's raw result-object (or part of it) into Grunt's configuration is not working
for you, you can define a process-function in order to manipulate it first. Since the original (input) result value
will be overwritten by whatever (truthy value) is returned, you have full control over what ends up in Grunt's configuration.

2) A second use-case is when writing a value to Grunt's config is not your desired outcome. Perhaps you want to
write it to a file, or do other crazy things with it. You can do so in this function. 

3) Lastly, when the completed task was part of a task-chain (i.e. it was defined as an element of an
array assigned to the tasks-property), the function defined will receive the (processed) result-object of
the previous task (as a second parameter). This allows you to, amongst other things, combine the results from several seperate Jira tasks together in order for a future task to operate on this combined information.

```js
process: function(result, [previous_result]) {...}
```

## Specific Task Options
[[Back To Top]](#jump-to-section)

Aside from the task-properties mentioned above, there are many more that are only needed/used depending on the type of request that is to be performed.

Depending on the `type` that was set, different properties need to (and can) be set.
Below is a list providing an overview of the various tasks you can perform and the properties associated with them.
See the [Examples](#examples)-section for practical use-cases.


### Find a specific issue
> Fetch a JIRA issue by its issue-key
`type: 'findissue'`

Returns an object containing an issue definition.

#### project_key
> Project key to use

```js
project_key: 'DEMO'
```

#### number
> Issue number to use

```js
number: 1234
```


### Get issues assigned to a user
> Fetch all JIRA issues assigned to a specific user
`type: 'getuserissues'`

Returns an array containing an object for each issue found.

#### username
> Username of the user

```js
username: 'PeterP'
```

#### openOnly
> True to only return open issues

```js
openOnly: true
```


### Search users
> Fetch a user's JIRA profile
`type: 'searchusers'`

Returns an array containing (hopefully) a single object containing a user's profile.

#### username
> Username 

```js
username: 'PeterP'
```


## Example Configurations
[[Back To Top]](#jump-to-section)

Below are some examples of the things you can do with grunt-jira.

### Authentication

It's best not to store your authentication credentials inside your Grunt file. The examples below all use the following snippet to load the correct credentials.

```js
var jiraConfig = grunt.file.readJSON('../jira.creds.json');
```

Instead of setting these credentials repeatedly for all of your targets, it's best to set them once using the task's options-property.

```js
jira: {
	options: {
		protocol: 'http:',
		host: 'jira.yourdomain.com',
		port: '',
		user: jiraConfig.user,
		password: jiraConfig.password,
		timeout: 10000 //optional timeout parameter, in ms
	}
}
```

### Get your own user account
> Or get someone else's

Once the user was found, output the complete response-object on the command-line.

```js
target: {
	options: {
		type: 'searchusers',
		username: jiraConfig.user, // or 'PeterP'
		process: function(users) {
			console.log(users);
		}
	}
}
```

### Get a specific issue
> Usually part of a chain or input (via grunt-prompt for instance)

```js
target: {
	options: {
		type: 'findissue',
		number: 4225,
		config: 'git.commit.issues'	
	}
}
```

### List all issue fields available
> Probably only used during development


```js
target: {
	options: {
		type: 'listfields',
		config: ''
	}
}
```

### Complex custom queries
> aka: Do what you want.

If the rich assortment of tasks offered by grunt-jira is not enough for you, you can always write your own custom queries.

The example below gets a list of a issues that are yours and are considered *Open*. They are further filtered by project-name and require a specific label to be attached.

Instead of returning the default fields for each issue, a selection of output-fields is specified as well.

Processing takes the resulting issues and prints a short summary on screen. Additionally, a more concise list of them is saved into Grunt's configuration.

An interesting use-case could be having [grunt-prompt](https://www.npmjs.com/package/grunt-prompt) showing the user a list of open issues to choose from. Then when the user selects one, it's key can be added to a generated commit-message using [grunt-git](https://www.npmjs.com/package/grunt-git).

```js
jira: {
	query: {
		options: {
			type: 'search',
			query: 'assignee=' + jiraConfig.user + ' AND project=DEMO AND labels in (someGroovyLabel) AND (status=4 OR status=1)',
			fields: [
				'summary',
				'issuekey',
				'issuetype',
				'status'
			],
			config: 'some.task.issues',
			process: function(data) {
				var issues = [];

				data.issues.forEach(function(issue) {
					var key = issue.key,
						title = issue.fields.summary,
						issueType = issue.fields.issuetype.name;

					issues.push({
						key: key,
						title: title,
						issueType: issueType
					});

					console.log('Open: [' + key +'] ' + title + ' (' + issueType + ')');
				});

				return issues;
			}
		}
	}
}
```


## Credits
[[Back To Top]](#jump-to-section)

This grunt task was originally created by Vincent "@shift" Palmer. It was created for the sole purpose of creating new version for Jira projects. Unfortunately it saw little activity after its initial unveiling and was never extended to include more functionality. After the project had slumbered for well over a year, I (Ronald Treur) asked him if I could take over and continue the good work. He graceously complied with this request, so many thanks to @shift for taking the first steps and for passing on the torch!

***Please note***
Though the original code-base by @shift has served as the starting point for the current version of this plugin, little of it (if at all) remains. Most of it was rewritten and severely extended in order to support additional Jira functionality. 

The result of this is that that version 0.2 and later are **not backwards compatible** with any prior version.

## Releases
[[Back To Top]](#jump-to-section)

 * 0.1.* - Travis CI
 * 0.1.0 - Initial release by @shift
 * 0.2.0 - Renewed release by @ronaldtreur (breaking)
 * 0.2.1 - Empowered the *process* function and added documentation
 * 0.2.2 - Updated `jira-client` support



--------
<small>_This readme has been automatically generated by [readme generator](https://github.com/aponxi/grunt-readme-generator) on Thu Jul 13 2017 16:40:24 GMT-0700 (PDT)._</small>
