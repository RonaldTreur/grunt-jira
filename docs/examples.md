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
		password: jiraConfig.password
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
				