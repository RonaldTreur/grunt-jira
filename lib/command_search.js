/*
	Search users on Jira.
 */
module.exports = function (task, jira, grunt, callback) {
	'use strict';

	function constructQuery(query) {
		var parts = [],
			part, key;

		for (key in query) {
			if (grunt.util.kindOf(query[key]) === 'object') {
				part = key + ' '+ (query[key].op|| '=') + ' ' + query[key].value;
			} else {
				part = key + '=' + query[key];
			}
			parts.push(part);
		}

		return parts.join(' AND ');
	}

	var searchString = task.getValue('query'),
		optional = task.getValue('optional', {}),
		fields = task.getValue('fields');
	
	if (grunt.util.kindOf(searchString) === 'object') {
		searchString = constructQuery(searchString);
	}

	if (fields && !optional.fields) {
		optional.fields = fields;
	}

	// ## Pass a search query to Jira ##
	// ### Takes ###
	//
	// *  searchString: jira query string
	// *  optional: object containing any of the following properties
	//   *  startAt: optional index number (default 0)
	//   *  maxResults: optional max results number (default 50)
	//   *  fields: optional array of desired fields, defaults when null:
	//     *  "summary"
	//     *  "status"
	//     *  "assignee"
	//     *  "description"
	// *  callback: for when it's done
	//
	// ### Returns ###
	//
	// *  error: string if there's an error
	// *  issues: array of issues for the user
	//
	// [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id333082)
	jira.searchJira(searchString, optional, callback);
};