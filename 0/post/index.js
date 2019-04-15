//TODO: rename json_c, KVP_c etc etc to more meaningful names

///var json = require('./Batch-20190111-0742 (1).json')
///var KVP = json.pageList[0].KVPTable;

//import template/blank json that will be read into the form
var after = require('./syn.json');
//import file reader
var fs = require('fs');

///console.log(KVP);

/* cutoff_KVP() - removes the baca-created kvps that are not declared in ontology
 * @param KVP - the KVPTable of the read-in json
 * @return - the edited KVP array
 */
function cutoff_KVP(KVP){
  var length = KVP.length;
  var count;
  //finds the number of created kvps declared in ontology
  for(var i =0;i < length; i++){
    //break the loop if it starts to introduce self-created kvps
     if(KVP[i].KeyClass == ""){
       count = i;
       break;
     }
  }
  var deleted = length - count;
  console.log(count);
  console.log(deleted);
  KVP.splice(count,deleted);
  console.log(length);
  return KVP;
}//end of cutoff_KVP()

/* sepearte() - purpose?
 * @param KVP - what the heckie
 * @param key2 -
 * @param key3 -
 * @return - ??????
 */
function seperate(key1,key2,KVP){
  var length = KVP.length;
  console.log(length);
  var data = fs.readFileSync('output.json');
  var count = 0;
  for(var i =0;i < length; i++){
    if(KVP[i].KeyClass == key1){
      if(count == 0){
        after["ship_"+key2] = KVP[i].Value;
      }
      else if(count == 1){
        after["recieve_"+key2] = KVP[i].Value;
      }
      else if(count == 2){
        after["bill_"+key2] = KVP[i].Value;
      }
      count++;
    }
  }
  fs.writeFile("output.json", JSON.stringify(after), function (err) {
      if (err) throw err;
      console.log('Saved!');
  });
  ///console.log(after);
}//end of seperate()

/* for_C() - purpose?
 * @param doc(string) - the json document name recieved from datacap
 */
function for_C(doc){
  //the entire json document
  var json_c = require('./' + doc);
  //the kvp table of said json document
  var KVP_c = json_c.pageList[0].KVPTable;
  KVP_c = cutoff_KVP(KVP_c);
  ///console.log(KVP_c);
  seperate("Name","name",KVP_c);
  seperate("Address","address",KVP_c);
  seperate("City","city",KVP_c);
  seperate("Prov","state",KVP_c);
  seperate("Zip","zip",KVP_c);
}//end of for_C()

for_C('Syn16772403Batch-20190402-9721_Page_001_2.json');
