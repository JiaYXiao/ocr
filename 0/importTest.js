var greetings = require("./test.js");

function uploadFile() {

return new Promise(resolve => {
greetings.upload();
  resolve ('a');
});
}

function checkStatus() {
  var stat = 404;
  return new Promise(resolve => {
    while (stat != 202) {
      var post = require ("./post.json");
      stat = (greetings.status(post.data.analyzerId)).status.code;
      console.log (stat);
    }
    resolve ('a');
  });
}

async function yep() {
  var get = await uploadFile();
   var status = await checkStatus();
  var post = require("./post.json");
  greetings.getJson(post.data.analyzerId);
  console.log (get);
}

yep();

// function resolveAfter2Seconds() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('resolved');
//     }, 2000);
//   });
// }
//
// async function asyncCall() {
//   console.log('calling');
//   var result = await resolveAfter2Seconds();
//   console.log(result);
//   // expected output: 'resolved'
// }
//
// asyncCall();
