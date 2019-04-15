//from ibm's documentation
var fs = require("fs");
var request = require("request");
var Base64 = require('js-base64').Base64;

var encoding = Base64.encode('tasha.xiao@purolator.com:Jpg323947408!');

var options = {
  method: 'POST',
  url: 'https://purolator-poc.bpm.ibmcloud.com/backendbaca-purolator/ca/rest/content/v1/contentAnalyzer',
  headers:
  {
    'content-type': 'multipart/form-data;',
    'apiKey' : '021c6c7e-606c-42c0-85d2-3a300a7fc9b9',
    'authorization': 'Basic ' + encoding
  },

  formData:
  { file:
    { value: fs.createReadStream("test.tif"),
      options: { filename: 'test.tif' }
    },
    responseType: "\"json\", \"pdf\", \"utf8\"",
    jsonOptions: "\"ocr\",\"dc\",\"kvp\""
  }

};

//send the request and display the response
request(options, function (error, response, body) {
  console.log(response.body);
  if (error) throw new Error(error);
});
