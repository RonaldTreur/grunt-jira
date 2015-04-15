/*
    List all issue types.
 */
module.exports = function (task, jira, grunt, callback) {
	'use strict';

	// ## List all Issue Types ##
    // ### Takes ###
    //
    // *  callback: for when it's done
    //
    // ### Returns ###
    // *  error string
    // *  array of types
    //
    // [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id295946)
    /*
     * Result items are in the format:
     * {
     *  "self": "http://localhostname:8090/jira/rest/api/2.0/issueType/3",
     *  "id": "3",
     *  "description": "A task that needs to be done.",
     *  "iconUrl": "http://localhostname:8090/jira/images/icons/task.gif",
     *  "name": "Task",
     *  "subtask": false
     * }
     */

   jira.listIssueTypes(callback);
};