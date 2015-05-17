Aside from the task-properties mentioned above, there are many more that are only needed/used depending on the type of request that is to be performed.

Depending on the `type` that was set, different properties need to (and can) be set.
Below is a list providing an overview of the various tasks you can perform and the properties associated with them.
See the [Examples](#examples)-section for practical use-cases.


### Find a specific issue
> Fetch a JIRA issue by its issue-key
`type: 'findissue'`

Returns an object containing an issue definition.

#### project_key
> Project key to use

```js
project_key: 'DEMO'
```

#### number
> Issue number to use

```js
number: 1234
```


### Get issues assigned to a user
> Fetch all JIRA issues assigned to a specific user
`type: 'getuserissues'`

Returns an array containing an object for each issue found.

#### username
> Username of the user

```js
username: 'PeterP'
```

#### openOnly
> True to only return open issues

```js
openOnly: true
```


### Search users
> Fetch a user's JIRA profile
`type: 'searchusers'`

Returns an array containing (hopefully) a single object containing a user's profile.

#### username
> Username 

```js
username: 'PeterP'
```
