var after = require('./form_format.json');
var fs = require('fs');
var arr0 = [
"PO_#",
"Pro_#",
"Billing_terms",
"date_Day",
"date_Month",
"date_Year",
"date",
"ship_Customer_#",
"ship_Name",
"ship_Address",
"ship_City",
"ship_Province",
"ship_Postal code",
"receive_Customer #",
"receive_Name",
"receive_Address",
"receive_City",
"receive_State",
"receive_Postal code",
"bill_Name",
"bill_Address",
"bill_City",
"bill_State",
"bill_Postal code",
"PIN_#",
"Length",
"Width",
"Height",
"BOL_weight",
"Cube_weight",
"Special_Instruction",
"Total_#_packages",
"customer_pin",
"customer_po",
"incoterm",
"Total_#_skids"
]


function cutoff_KVP(KVP){
  var length = KVP.length;
  var count;
  for(var i =0;i < length; i++){
     if(KVP[i].KeyClass == ""){
       count = i;
       break;
     }
  }
  var deleted = length - count;
  KVP.splice(count,deleted);
  return KVP;
}


function seperate(key,KVP){
  var data = fs.readFileSync('output.json');
  var count = 0;
  for(var i =0;i < KVP.length; i++){
    if(KVP[i].KeyClass == key){
      if(count == 0){
        after["ship_"+key] = KVP[i].Value;
      }
      else if(count == 1){
        after["receive_"+key] = KVP[i].Value;
      }
      else if(count == 2){
        after["bill_"+key] = KVP[i].Value;
      }
      count++;
      KVP.splice(i,1);
      i--;
    }
  }
  // fs.writeFile("output.json", JSON.stringify(after), function (err) {
  //     if (err) throw err;
  // });
  //console.log(after);
}

//helper for FinalStep
function ForSkid(str,num,va){
  // if(!after["skidList"][num]){
  //
  // }
  after["skidList"][num][str] = va;
  num++;
}


function FinalStep(KVP){
 var length = KVP.length;

 var count_p=0;
 var count_l=0;
 var count_h=0;
 var count_w=0;
 var count_b=0;
 var count_c=0;

 for(var i =0;i < KVP.length; i++){
    if(KVP[i].KeyClass == "Cube_weight"){
        var va = KVP[i].Value
        ForSkid("Cube_weight",count_c,va);
     }
     else if(KVP[i].KeyClass == "Length"){
       var va = KVP[i].Value
       ForSkid("Length",count_l,va);
     }
     else if(KVP[i].KeyClass == "Width"){
       var va = KVP[i].Value
       ForSkid("Width",count_w,va);
     }
     else if(KVP[i].KeyClass == "Height"){
       var va = KVP[i].Value
       ForSkid("Height",count_h,va);
     }
     else if(KVP[i].KeyClass == "BOL_weight"){
       var va = KVP[i].Value
       ForSkid("BOL_weight",count_b,va);
     }
     else if(KVP[i].KeyClass == "PIN_#"){
       var va = KVP[i].Value
       ForSkid("PIN_#",count_p,va);
     }
     else{
       var kc = KVP[i].KeyClass;
       after[kc] = KVP[i].Value;
     }
  }
  return after;
 // fs.writeFile("output.json", JSON.stringify(after), function (err) {
 //     if (err) throw err;
 // });
}

//  for(var i=0, i<len; i++){
//    var cur = arr[i];
//    //if(cur = "Cube_weight" || cur == "Length" || cur == "Width" || cur == "Height" || cur == "BOL_weight" || cur == "Cube_weight"){
//   if(cur = "Cube_weight"){
//     ForSkid(cur,count_w,KV);
//   }
//   else if(cur == "Length"){
//     ForSkid(cur,count_l,KV);
//   }
//   else if(cur == "Width"){
//     ForSkid(cur,count_w,KV);
//   }
//   else if(cur == "Height"){
//     ForSkid(cur,count_w,KV);
//   }
//   else if(cur == "BOL_weight"){
//     ForSkid(cur,count_w,KV);
//   }
//   else if(cur == "Cube_weight"){
//     ForSkid(cur,count_w,KV);
//   }
//   else (KV[cur]){
//      after[cur] = KV[cur];
//   }
//  fs.writeFile("output.json", JSON.stringify(after), function (err) {
//      if (err) throw err;
//  });
// }

function PutToCorrectFields(doc){
  var json = require('./' + doc);
  var KVP = json.pageList[0].KVPTable;
  KVP =  cutoff_KVP(KVP);
  seperate("Name",KVP);
  seperate("Address",KVP);
  seperate("City",KVP);
  seperate("State",KVP);
  seperate("Zip",KVP);
  seperate("Postal_code",KVP);
  seperate("ship_Customer_#",KVP);
  var re = FinalStep(KVP);
  console.log(re);
}




PutToCorrectFields('Syn16772403Batch-20190402-9721_Page_001_2.json');
