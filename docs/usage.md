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