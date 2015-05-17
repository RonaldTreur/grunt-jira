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