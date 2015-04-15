/*
    Create a new version.
 */
module.exports = function (task, jira, grunt, callback) {
	'use strict';

	// ## Create a version ##
    // ### Takes ###
    //
    // *  version: an object of the new version
    // *  callback: for when it's done
    //
    // ### Returns ###
    //
    // *  error: error text
    // *  version: should be the same version you passed up
    //
    // [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id288232)
    //
    /* {
     *    "description": "An excellent version",
     *    "name": "New Version 1",
     *    "archived": false,
     *    "released": true,
     *    "releaseDate": "2010-07-05",
     *    "userReleaseDate": "5/Jul/2010",
     *    "project": "PXA"
     * }
     */

    var version = task.getValue('version');

	jira.createVersion(version, callback);
};