/*
    Get all versions for a project.
 */
module.exports = function (task, jira, grunt, callback) {
    'use strict';

    // ## Get Versions for a project ##
    // ### Takes ###
    // *  project: A project key
    // *  callback: for when it's done
    //
    // ### Returns ###
    // *  error: a string with the error
    // *  versions: array of the versions for a product
    //
    // [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id289653)
    
    var projectKey = task.getValue('project_key');

    jira.getVersions(projectKey, callback);
};