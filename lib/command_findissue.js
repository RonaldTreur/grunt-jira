/*
    Find a JIRA issue by its issue-number.
 */
module.exports = function (task, jira, grunt, callback) {
	'use strict';

	// ## Find an issue in jira ##
    // ### Takes ###
    //
    // *  issueNumber: the issueNumber to find
    // *  callback: for when it's done
    //
    // ### Returns ###
    //
    // *  error: string of the error
    // *  issue: an object of the issue
    //
    // [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id290709)

    var projectKey = task.getValue('project_key'),
    	number = task.getValue('number'),
		issueKey =  projectKey + '-' + number;

	jira.findIssue(issueKey, callback);
};