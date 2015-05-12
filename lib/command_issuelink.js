/*
    Create an issue link
 */
module.exports = function (task, jira, grunt, callback) {
	'use strict';

    // ## Create an issue link between two issues ##
    // ### Takes ###
    //
    // *  link: a link object
    // *  callback: for when it’s done
    //
    // ### Returns ###
    // *  error: string if there was an issue, null if success
    //
    // [Jira Doc](http://docs.atlassian.com/jira/REST/latest/#id288232)
    /* {
     *    'type': {
     *        'name': 'requirement'
     *    },
     *    'inwardIssue': {
     *        'key': 'SYS-2080'
     *    },
     *    'outwardIssue': {
     *        'key': 'SYS-2081'
     *    },
     *    'comment': {
     *        'body': 'Linked related issue!',
     *        'visibility': {
     *            'type': 'GROUP',
     *            'value': 'jira-users'
     *        }
     *    }
     * }
     */

    var link = task.getValue('link');

	jira.issueLink(link, callback);
};
