/*
	Get the unresolved issue count for a specific version of your project
 */
module.exports = function (task, jira, grunt, callback) {
	'use strict';

	// ## Get the unresolved issue count ##
    // ### Takes ###
    //
    // *  version: version of your product that you want issues against
    // *  callback: function for when it's done
    //
    // ### Returns ###
    // 
    // *  error: string with the error code
    // *  count: count of unresolved issues for requested version
    //
    // [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id288524)
	
	var version = task.getValue('version');

    jira.getUnresolvedIssueCount(version, callback);
};