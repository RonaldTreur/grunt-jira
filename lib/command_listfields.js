/*
    List all fields.
 */
module.exports = function (task, jira, grunt, callback) {
	'use strict';

	// ## List listFields ##
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
     *    "id": "field",
     *    "name": "Field",
     *    "custom": false,
     *    "orderable": true,
     *    "navigable": true,
     *    "searchable": true,
     *    "schema": {
     *        "type": "string",
     *        "system": "field"
     *    }
     * }]
     */

   jira.listFields(callback);
};