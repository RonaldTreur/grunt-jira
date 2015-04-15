/*
    Delete a Jira issue by its issue-number.
 */
module.exports = function (task, jira, grunt, callback) {
	'use strict';

	// ## Delete issue to Jira ##
    // ### Takes ###
    //
    // *  issueId: the Id of the issue to delete
    // *  callback: for when it's done
    //
    // ### Returns ###
    // *  error string
    // *  success object
    //
    // [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id290791)

    var projectKey = task.getValue('project_key'),
    	number = task.getValue('number'),
		issueKey =  projectKey + '-' + number;

	jira.deleteIssue(issueKey, callback);
};