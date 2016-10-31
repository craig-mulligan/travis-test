const request = require('request');

console.log('Triggering dependent builds')

var options = {
  url: 'https://api.github.com/repos/craig-mulligan/travis-slave/request',
  method: 'post',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Travis-API-Version": "3",
    "Authorization": 'token ' + process.env.TRAVIS_API_TOKEN,
  },
  body: JSON.stringify({
    request: {
      message: 'Trigger build',
      branch: 'source',
    },
  }),
  json: true
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log("Triggered build of slave repo");
  } else {
    console.log('error', error)
    process.exit(-1);
  }
}

request(options, callback)
