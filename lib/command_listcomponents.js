/*
    List all components for a specific project.
 */
module.exports = function (task, jira, grunt, callback) {
	'use strict';

	// ## List Components ##
    // ### Takes ###
    //
    // *  project: key for the project
    // *  callback: for when it's done
    //
    // ### Returns ###
    // *  error string
    // *  array of components
    //
    // [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id290489)
    /*
     * [{
     *     "self": "http://localhostname:8090/jira/rest/api/2.0/component/1234",
     *     "id": "1234",
     *     "name": "name",
     *     "description": "Description.",
     *     "assigneeType": "PROJECT_DEFAULT",
     *     "assignee": {
     *         "self": "http://localhostname:8090/jira/rest/api/2.0/user?username=user@domain.com",
     *         "name": "user@domain.com",
     *         "displayName": "SE Support",
     *         "active": true
     *     },
     *     "realAssigneeType": "PROJECT_DEFAULT",
     *     "realAssignee": {
     *         "self": "http://localhostname:8090/jira/rest/api/2.0/user?username=user@domain.com",
     *         "name": "user@domain.com",
     *         "displayName": "User name",
     *         "active": true
     *     },
     *     "isAssigneeTypeValid": true
     * }]
     */
    
    var projectKey = task.getValue('project_key');

   jira.listComponents(projectKey, callback);
};