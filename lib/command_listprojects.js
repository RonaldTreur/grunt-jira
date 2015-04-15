/*
    List all projects.
 */
module.exports = function (task, jira, grunt, callback) {
	'use strict';

	// ## List all Viewable Projects ##
    // ### Takes ###
    //
    // *  callback: for when it's done
    //
    // ### Returns ###
    // *  error string
    // *  array of projects
    //
    // [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id289193)
    /*
     * Result items are in the format:
     * {
     *      "self": "http://www.example.com/jira/rest/api/2/project/ABC",
     *      "id": "10001",
     *      "key": "ABC",
     *      "name": "Alphabetical",
     *      "avatarUrls": {
     *          "16x16": "http://www.example.com/jira/secure/projectavatar?size=small&pid=10001",
     *          "48x48": "http://www.example.com/jira/secure/projectavatar?size=large&pid=10001"
     *      }
     * }
     */

   jira.listProjects(callback);
};