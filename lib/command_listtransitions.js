/*
    List all transition types for a specific issue.
 */
module.exports = function (task, jira, grunt, callback) {
	'use strict';

	// ## List Transitions ##
    // ### Takes ###
    //
    // *  issueId: get transitions available for the issue
    // *  callback: for when it's done
    //
    // ### Returns ###
    // *  error string
    // *  array of transitions
    //
    // [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id290489)
    /*
     *  {
     *  "expand": "transitions",
     *  "transitions": [
     *      {
     *          "id": "2",
     *          "name": "Close Issue",
     *          "to": {
     *              "self": "http://localhostname:8090/jira/rest/api/2.0/status/10000",
     *              "description": "The issue is currently being worked on.",
     *              "iconUrl": "http://localhostname:8090/jira/images/icons/progress.gif",
     *              "name": "In Progress",
     *              "id": "10000"
     *          },
     *          "fields": {
     *              "summary": {
     *                  "required": false,
     *                  "schema": {
     *                      "type": "array",
     *                      "items": "option",
     *                      "custom": "com.atlassian.jira.plugin.system.customfieldtypes:multiselect",
     *                      "customId": 10001
     *                  },
     *                  "name": "My Multi Select",
     *                  "operations": [
     *                      "set",
     *                      "add"
     *                  ],
     *                  "allowedValues": [
     *                      "red",
     *                      "blue"
     *                  ]
     *              }
     *          }
     *      }
     *  ]}
     */
    
    var projectKey = task.getValue('project_key'),
        number = task.getValue('number'),
        issueKey =  projectKey + '-' + number;

   jira.listTransitions(issueKey, callback);
};