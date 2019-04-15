//bug: remove skid doesn't properly work when addNewSkid() is used
var json;
var nowSkid=1;

function load_start(IF,index){
  var jsonfiles= ["iceriver.json","syn.json"];
if(IF != null){
$.getJSON(jsonfiles[index], function(test) {
  json = test;

  //fill in existing information
  document.getElementById('id_pro').value = json.proNum;

  document.getElementById('id_date_day').value = json.date_day;
  document.getElementById('id_date_month').value = json.date_month;
  document.getElementById('id_date_year').value = json.date_year;

  document.getElementById('id_recieve_name').value = json.recieve_name;
  document.getElementById('id_recieve_address').value = json.recieve_address;
  document.getElementById('id_recieve_city').value = json.recieve_city;
  document.getElementById('id_recieve_state').value = json.recieve_state;
  document.getElementById('id_recieve_zip').value = json.recieve_zip;

  document.getElementById('id_ship_name').value = json.ship_name;
  document.getElementById('id_ship_address').value = json.ship_address;
  document.getElementById('id_ship_city').value = json.ship_city;
  document.getElementById('id_ship_state').value = json.ship_state;
  document.getElementById('id_ship_zip').value = json.ship_zip;

  document.getElementById('id_bill_name').value = json.bill_name;
  document.getElementById('id_bill_address').value = json.bill_address;
  document.getElementById('id_bill_city').value = json.bill_city;
  document.getElementById('id_bill_state').value = json.bill_state;
  document.getElementById('id_bill_zip').value = json.bill_zip;
  document.getElementById('id_bill_acc').value = json.bill_acc;
   $('#id_bill_term').val(json.bill_term);

  let index = 0;
  while(index < json.totalSkid){
    while(json.totalSkid < nowSkid){
      var cur = "r" + json.totalSkid.toString();
      removeSkid(cur);
     }
    if (index > 0) {
      i = index;
      if(nowSkid < json.totalSkid){
        addSkid();
        //nowSkid++;
      }
    }
    document.getElementById('id_pin_' + index).value = json.skidList[index].pin;
    document.getElementById('id_scale_length_' + index).value = json.skidList[index].scale_length;
    document.getElementById('id_scale_height_' + index).value = json.skidList[index].scale_height;
    document.getElementById('id_scale_width_' + index).value = json.skidList[index].scale_width;
    document.getElementById('id_scale_weight_bol_' + index).value = json.skidList[index].scale_weight_bol;
    document.getElementById('id_scale_weight_rescale_' + index).value = json.skidList[index].scale_weight_rescale;
  //  document.getElementById('id_scale_lin_feet_' + index).value = json.skidList[index].scale_lin_feet;
//    $('#id_scale_stack_' + index).val(json.skidList[index].scale_stack);
    index++;
  }
  // document.getElementById('id_scale_length_0').value = json.scale_length;
  // document.getElementById('id_scale_height_0').value = json.scale_height;
  // document.getElementById('id_scale_width_0').value = json.scale_width;
  // document.getElementById('id_scale_weight_bol_0').value = json.scale_weight_bol;
  // document.getElementById('id_scale_weight_rescale_0').value = json.scale_weight_rescale;
  // document.getElementById('id_scale_lin_feet_0').value = json.scale_lin_feet;
//  $("#id_appointment").val(json.appointment);
  document.getElementById('id_instruction').value = json.instruction;
  document.getElementById('id_totalPackage').value = json.totalPackage;
//  document.getElementById('id_customer_pin').value = json.customer_pin;
  document.getElementById('id_customer_po').value = json.customer_po;
  document.getElementById('id_totalSkid').value = json.totalSkid;


});
}
}

function sameBill() {
  json.bill_name = document.getElementById('id_ship_name').value;
  json.bill_address = document.getElementById('id_ship_address').value;
  json.bill_city = document.getElementById('id_ship_city').value;
  json.bill_state = document.getElementById('id_ship_state').value;
  json.bill_zip = document.getElementById('id_ship_zip').value;

  document.getElementById('id_bill_name').value = json.bill_name;
  document.getElementById('id_bill_address').value = json.bill_address;
  document.getElementById('id_bill_city').value = json.bill_city;
  document.getElementById('id_bill_state').value = json.bill_state;
  document.getElementById('id_bill_zip').value = json.bill_zip;
}
function submit() {
  f();
  downloadJson();
}
function f() {
  //update information
  json.proNum = document.getElementById('id_pro').value;
//  json.pinNum = document.getElementById('id_pin').value;

  json.date_day = document.getElementById('id_date_day').value;
  json.date_month = document.getElementById('id_date_month').value;
  json.date_year = document.getElementById('id_date_year').value;

  json.recieve_name = document.getElementById('id_recieve_name').value;
  json.recieve_address = document.getElementById('id_recieve_address').value;
  json.recieve_city = document.getElementById('id_recieve_city').value;
  json.recieve_state = document.getElementById('id_recieve_state').value;
  json.recieve_zip = document.getElementById('id_recieve_zip').value;

  json.ship_name = document.getElementById('id_ship_name').value;
  json.ship_address = document.getElementById('id_ship_address').value;
  json.ship_city = document.getElementById('id_ship_city').value;
  json.ship_state = document.getElementById('id_ship_state').value;
  json.ship_zip = document.getElementById('id_ship_zip').value;

  json.bill_name = document.getElementById('id_bill_name').value;
  json.bill_address = document.getElementById('id_bill_address').value;
  json.bill_city = document.getElementById('id_bill_city').value;
  json.bill_state = document.getElementById('id_bill_state').value;
  json.bill_zip = document.getElementById('id_bill_zip').value;
  json.bill_acc = document.getElementById('id_bill_acc').value;
  json.bill_term = $("#id_bill_term").val();

  let i = 0;
  var tempArr = [];
  while($('#id_scale_length_' +i).length > 0) {
    let tempObj = {pin: null, scale_length: null, scale_width: null, scale_height: null,
       scale_weight_bol: null, scale_weight_rescale: null};
      tempObj.pin = document.getElementById('id_pin_' + i).value;
      tempObj.scale_length = document.getElementById('id_scale_length_' + i).value;
      tempObj.scale_height = document.getElementById('id_scale_height_' + i).value;
      tempObj.scale_width = document.getElementById('id_scale_width_' + i).value;
      tempObj.scale_weight_bol = document.getElementById('id_scale_weight_bol_' + i).value;
      tempObj.scale_weight_rescale = document.getElementById('id_scale_weight_rescale_' + i).value;
    //  alert(tempObj.scale_length);
      tempArr.push(tempObj);
      i++;
      // json["scale_length_"+i] = document.getElementById('id_scale_length_' + i).value;
    }
    json.skidList = tempArr;
    // json.scale_length = document.getElementById('id_scale_length').value;
    // json.scale_height = document.getElementById('id_scale_height').value;
    // json.scale_width = document.getElementById('id_scale_width').value;
    // json.scale_weight_bol = document.getElementById('id_scale_weight_bol').value;
    // json.scale_weight_rescale = document.getElementById('id_scale_weight_rescale').value;
    // json.scale_lin_feet = document.getElementById('id_scale_lin_feet').value;

  //  json.appointment = $("#id_appointment").val();
    json.instruction = document.getElementById('id_instruction').value;
    json.totalPackage = document.getElementById('id_totalPackage').value;
  //  json.customer_pin = document.getElementById('id_customer_pin').value;
    json.customer_po = document.getElementById('id_customer_po').value;
    json.totalSkid = document.getElementById('id_totalSkid').value;

//    downloadJson();
  }

  function downloadJson() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(
      JSON.stringify(json)));
      element.setAttribute('download', 'value.json');

      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      // Start file download.
      download("value.json", JSON.stringify(json));

    }

//confirms before refreshing page
window.onbeforeunload = function(event) {
    return confirm("Confirm refresh");
};

function check()
{
  alert("mandantory field not completed");
  document.getElementById("red1").style.color="red";

  document.getElementById("red3").style.color="red";
  document.getElementById("red4").style.color="red";
  document.getElementById("red5").style.color="red";
  document.getElementById("red6").style.color="red";
}
