/*
    Transition an issue.
 */
module.exports = function (task, jira, grunt, callback) {
	'use strict';

	// ## Transition issue in Jira ##
    // ### Takes ###
    //
    // *  issueId: the Id of the issue to delete
    // *  issueTransition: transition Object
    // *  callback: for when it's done
    //
    // ### Returns ###
    // *  error string
    // *  success string
    //
    // [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id290489)
	
	var projectKey = task.getValue('project_key'),
        number = task.getValue('number'),
        transition = task.getValue('transition'),
        issueKey =  projectKey + '-' + number;

    jira.transitionIssue(issueKey, transition, callback);
};