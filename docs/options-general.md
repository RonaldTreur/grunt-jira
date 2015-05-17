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