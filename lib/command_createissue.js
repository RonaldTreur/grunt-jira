/*
    Add a new Jira issue.
 */
module.exports = function (task, jira, grunt, callback) {
	'use strict';

	// ## Add issue to Jira ##
    // ### Takes ###
    //
    // *  issue: Properly Formatted Issue
    // *  callback: for when it's done
    //
    // ### Returns ###
    // *  error object (check out the Jira Doc)
    // *  success object
    //
    // [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id290028)

    var issue = task.getValue('issue');

	jira.addNewIssue(issue, callback);
};