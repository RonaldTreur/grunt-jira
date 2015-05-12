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
    //
    /* {
     *    'linkType': 'Duplicate',
     *    'fromIssueKey': 'HSP-1',
     *    'toIssueKey': 'MKY-1',
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
