var fs = require("fs");
var request = require("request");
var Base64 = require('js-base64').Base64;

var encoding = Base64.encode('tasha.xiao@purolator.com:Jpg323947408!');
var options = {
  method: 'DELETE',
  url: 'https://purolator-poc.bpm.ibmcloud.com/backendbaca-purolator/ca/rest/content/v1/contentAnalyzer/4fd27ca0-5c7e-11e9-b790-09b27a967cd8',
  headers:
  {
    'apiKey' : '021c6c7e-606c-42c0-85d2-3a300a7fc9b9',
    'authorization': "Basic " + encoding
  },
};

request(options, function (error, response, body) {
  console.log(response.body);
  if (error) throw new Error(error);
});
