var greetings = require("./test.js");

function uploadFile() {
  return new Promise(resolve => {
greetings.upload();

    setTimeout(() => {
          resolve('resolved');
        }, 10000);
  });
}



async function yep() {


  var get = await uploadFile();
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
