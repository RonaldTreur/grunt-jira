/*
    Update a Jira issue.
 */
module.exports = function (task, jira, grunt, callback) {
	'use strict';

    // ## Update issue in Jira ##
    // ### Takes ###
    //
    // *  issueId: the Id of the issue to delete
    // *  issueUpdate: update Object
    // *  callback: for when it's done
    //
    // ### Returns ###
    // *  error string
    // *  success string
    //
    // [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id290878)

    var projectKey = task.getValue('project_key'),
    	number = task.getValue('number'),
    	update = task.getValue('update'),
		issueKey =  projectKey + '-' + number;

	jira.updateIssue(issueKey, update, callback);
};