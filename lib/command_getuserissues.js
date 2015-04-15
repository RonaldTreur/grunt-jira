/*
    Get all issues for specific user.
 */
module.exports = function (task, jira, grunt, callback) {
    'use strict';

    // ## Get issues related to a user ##
    // ### Takes ###
    //
    // *  user: username of user to search for
    // *  open: `boolean` determines if only open issues should be returned
    // *  callback: for when it's done
    //
    // ### Returns ###
    //
    // *  error: string if there's an error
    // *  issues: array of issues for the user
    //
    // [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id296043)
    
    var username = task.getValue('user'),
    	openOnly = task.getValue('openOnly', false);

    jira.getUsersIssues(username, openOnly, callback);
};