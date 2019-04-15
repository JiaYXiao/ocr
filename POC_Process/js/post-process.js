function NewStartOff(0){
  var doclist = NewViewName();
  var jsf = PostProcess(doclist);
  Newload_start(doclist,index,doclist);
}


function PostProcess(doclist){
  var jsonfiles = [];
  for(var i=0;i<doclist.length;i++){
    var ul = doclist[i];
    var cur = ReceiveJson(); //Tasha's process: get the json file from Beca
    var re = PutToCorrectFields(cur); //post-processing, put the value into fields
    jsonfiles.push(re);
  }
  return jsonfiles;
}
