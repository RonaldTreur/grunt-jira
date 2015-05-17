/*
    Search users on Jira.
 */
module.exports = function (task, jira, grunt, callback) {
	'use strict';

	// ## Search user on Jira ##
    // ### Takes ###
    //
    // *  username: A query string used to search username, name or e-mail address
    // *  startAt: The index of the first user to return (0-based)
    // *  maxResults: The maximum number of users to return (defaults to 100).
    // *  includeActive: If true, then active users are included in the results (defaults to true)
    // *  includeInactive: If true, then inactive users are included in the results (defaults to false)
    // *  callback: for when it's done
    //
    // ### Returns ###
    //
    // *  error: string if there's an error
    // *  users: array of users for the user
    //
    // [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#d2e3756)
	
	var username = task.getValue('username'),
        startAt = task.getValue('startAt', 0),
        maxResults = task.getValue('maxResults', 100),
        includeActive = task.getValue('includeActive', true),
        includeInactive = task.getValue('includeInactive', false);

    jira.searchUsers(username, startAt, maxResults, includeActive, includeInactive, callback);
};