var json =[{
  "PO_#": "1",
  "Pro_#":"",
  "Billing_terms": "",
  },
  {
  "PO_#": "2",
  "Pro_#":"",
  "Billing_terms": "",
  },
  {
  "PO_#": "3",
  "Pro #":"",
  "Billing_terms": "",
  }
]

function test(){
  for(var i = 0; i< json.length; i++){
    console.log("haha");
    if(json[i]["PO_#"]==2){
      json.splice(i,1);
      console.log(json[i]);
      i--;
    }
    console.log(json.length);
  }
}

test();
console.log(json);
