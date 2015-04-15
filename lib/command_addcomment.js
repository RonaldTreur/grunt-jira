/*
    Add a comment to an issue.
 */
module.exports = function (task, jira, grunt, callback) {
    'use strict';

    // ## Add a comment to an issue ##
    // ### Takes ###
    // *  issueId: Issue to add a comment to
    // *  comment: string containing comment
    // *  callback: for when it's done
    //
    // ### Returns ###
    // *  error string
    // *  success string
    //
    // [Jira Doc](https://docs.atlassian.com/jira/REST/latest/#id108798)
    
    var projectKey = task.getValue('project_key'),
        number = task.getValue('number'),
        comment = task.getValue('comment'),
        issueKey =  projectKey + '-' + number;

    jira.addComment(issueKey, comment, callback);
};