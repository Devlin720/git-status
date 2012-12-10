Node application that updates your flowdock with the server status of Github, should the status change.

Use: 
`>>> node git-status.js`

////////////////////////////////////////////////////////////////////////////////////

Config File:
**Rename example-config.json to config.json to use**

* flowdock_api_token [required] Used to send chat messages to your flow
* external_user_name [optional, default="git-status"] Displays the chat username
* tags [optional default=["git-status"]] adds the tags to the message

```javascript
{
  "flowdock_api_token": "abcdefghi123456789abcdefghi",
  "external_user_name": "my_git_status",
  "tags": ["example_tag", "example_tag_2"]
}```