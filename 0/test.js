//from ibm's documentation
module.exports = {
upload: function() {
var fs = require("fs");
var request = require("request");
var Base64 = require('js-base64').Base64;
var json;

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
  fs.writeFile("post.json", response.body, (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });
  if (error) throw new Error(error);
});


},
status: function (analyzerId) {
  var fs = require("fs");
  var request = require("request");
  var Base64 = require('js-base64').Base64;
  var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();

  var encoding = Base64.encode('tasha.xiao@purolator.com:Jpg323947408!');
  var options = {
    method: 'GET',
    url: 'https://purolator-poc.bpm.ibmcloud.com/backendbaca-purolator/ca/rest/content/v1/contentAnalyzer/' + analyzerId,
    headers:
    {
      'apiKey' : '021c6c7e-606c-42c0-85d2-3a300a7fc9b9',
      'authorization': "Basic " + encoding
    },
  };

  request(options, function (error, response, data) {
    body.data = data;
    body.emit('update');
    /*
    fs.writeFile("data2.json", response.body, (err) => {
      if (err) console.log(err);
      console.log("Successfully Written to File. 1");
    });

    if (error) throw new Error(error);*/
  });
  body.on('update', function () {
    console.log(body.data); // HOORAY! THIS WORKS!
});
},

getJson: function (analyzerId) {
  var fs = require("fs");
  var request = require("request");
  var Base64 = require('js-base64').Base64;

  var encoding = Base64.encode('tasha.xiao@purolator.com:Jpg323947408!');
  var options = {
    method: 'GET',
    url: 'https://purolator-poc.bpm.ibmcloud.com/backendbaca-purolator/ca/rest/content/v1/contentAnalyzer/' + analyzerId + '/json',
    headers:
    {
      'apiKey' : '021c6c7e-606c-42c0-85d2-3a300a7fc9b9',
      'authorization': "Basic " + encoding
    },
  };

  request(options, function (error, response, body) {
    fs.writeFile("data2.json", response.body, (err) => {
      if (err) console.log(err);
      console.log("Successfully Written to File. 1");
    });

    if (error) throw new Error(error);
  });

}
};
