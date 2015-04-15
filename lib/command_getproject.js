/*
    Find a JIRA project by its project-key.
 */
module.exports = function (task, jira, grunt, callback) {
    'use strict';

    // ## Get the Project by project key ##
    // ### Takes ###
    //
    // *  project: key for the project
    // *  callback: for when it's done
    //
    // ### Returns ###
    // 
    // *  error: string of the error
    // *  project: the json object representing the entire project
    //
    // [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id289232)
    
    var projectKey = task.getValue('project_key');

    jira.getProject(projectKey, callback);
};