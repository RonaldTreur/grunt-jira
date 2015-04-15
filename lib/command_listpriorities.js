/*
    List all priorities.
 */
module.exports = function (task, jira, grunt, callback) {
	'use strict';

	// ## List listPriorities ##
    // ### Takes ###
    //
    // *  callback: for when it's done
    //
    // ### Returns ###
    // *  error string
    // *  array of priorities
    //
    // [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id290489)
    /*
     * [{
     *    "self": "http://localhostname:8090/jira/rest/api/2.0/priority/1",
     *    "statusColor": "#ff3300",
     *    "description": "Crashes, loss of data, severe memory leak.",
     *    "name": "Major",
     *    "id": "2"
     * }]
     */

   jira.listPriorities(callback);
};