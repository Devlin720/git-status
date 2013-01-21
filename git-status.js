var request = require('request');
var http = require('http');
var fs = require('fs');
var args = process.argv;
var path = args[1];
var script_path = path.split('\\');
script_path.pop();
script_path = script_path.join('/');

var config = fs.readFileSync(script_path + '/config.json');
config = JSON.parse(config);

var server_status = 'good';

var flowdock_api_token = config.flowdock_api_token;

if (args.indexOf('-once') >= 0)
  getServerStatus();
else
  setInterval(getServerStatus, 30000);

function getServerStatus() {
  console.log('getServerStatus: ' + server_status);
  try {
    request('https://status.github.com/api/last-message.json', serverStatusRequest);
  }
  catch (e) {
    console.log('Could not retrieve github server status: ' + e.message);
  }
}

function serverStatusRequest(error, response, body) {
  response = JSON.parse(body);

  if (server_status != response.status) {
    updateStatus(response.status);
    console.log('server status changed: ' + server_status);
    try {
      sendUpdateStatus(response.body);
    }
    catch(e) {
      console.log('Sending to flowdock failed: ' + e.message);
    }
  }
}

function updateStatus(status) {
  server_status = status;
}

function sendUpdateStatus(message) {
  var options = {
    'url': 'https://api.flowdock.com/v1/messages/chat/' + flowdock_api_token,
    'qs': {
      'content': message,
      "external_user_name": config.external_user_name || 'git-status',
      'tags': config.tags || ['git-status']
    }
  };

  var req = request.post(options, function(error, response, body) {
    console.log(body);
  });
}