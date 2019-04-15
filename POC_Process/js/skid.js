var i;
function removeSkid(event) {
  var bol;
  //alert (j);
  if( nowSkid > json.totalSkid){
    nowSkid--;
    bol = true;
  }
  else if (json.totalSkid > 1) {
    json.totalSkid --;
    bol = false;
  }
  else {
    alert ('Cannot have less than 1 skid!!');
  }
  //try & catch for when user tries to remove skid while there is 1 remaining
  try {
    if(bol){
      var skidSum = nowSkid;
    }else{
      var skidSum = json.totalSkid;
    }
  for (let j = event.substring(1); j < skidSum; j++) {
    //if we're creating a new skid to the array
    if (json.skidList[j] === undefined) {
        let tempObj = {scale_length: null, scale_width: null, scale_height: null,
                      scale_weight_bol: null, scale_weight_rescale: null};
        json.skidList.push(tempObj);
      }
      json.skidList[j].pin = document.getElementById('id_pin_' + (parseInt(j) + 1)).value;
      json.skidList[j].scale_length = document.getElementById('id_scale_length_' + (parseInt(j) + 1)).value;
      json.skidList[j].scale_width = document.getElementById('id_scale_width_' + (parseInt(j) + 1)).value;
      json.skidList[j].scale_height = document.getElementById('id_scale_height_' + (parseInt(j) + 1)).value;
      json.skidList[j].scale_weight_bol = document.getElementById('id_scale_weight_bol_' + (parseInt(j) + 1)).value;
      json.skidList[j].scale_weight_rescale = document.getElementById('id_scale_weight_rescale_' + (parseInt(j) + 1)).value;

      //update screen
      document.getElementById('id_pin_' +  parseInt(j)).value = json.skidList[j].pin;
      document.getElementById('id_scale_length_' + parseInt(j)).value = json.skidList[j].scale_length;
      document.getElementById('id_scale_width_' + parseInt(j)).value = json.skidList[j].scale_width;
      document.getElementById('id_scale_height_' + parseInt(j)).value = json.skidList[j].scale_height;
      document.getElementById('id_scale_weight_bol_' + parseInt(j)).value = json.skidList[j].scale_weight_bol;
      document.getElementById('id_scale_weight_rescale_' + parseInt(j)).value = json.skidList[j].scale_weight_rescale;
    }
    //update screen (remove div)
    $("#skidDiv_" + skidSum).remove();
    document.getElementById('id_totalSkid').value = json.totalSkid;
  } catch (e) {}
  //update the thing
  //downloadJson();
}
function addSkid() {

  //create components
  let $pin = $("<input type='text' name='pronum' size='20' maxlength='17'></input>");
  let $Llab = $("<input type = 'text' size='5' maxlength='5'></input>");
  let $Wlab = $("<input type = 'text' size = '5' maxlength = '5'</input>");
  let $Hlab = $("<input type = 'text' size='5' maxlength='5'></input>");

  let $trtable = $("<tr></tr>");
  let $tdtable = $("<td></td>");
  let $header = $("<th></th>");

  let $divider = $("<div></div>");
  let $delBut = $("<button type='button'>Remove Skid</button>")
  //add ids
  $divider.attr("id", "skidDiv_" + i);
  $pin.attr("id", "id_pin_" + i);
  $Llab.attr("id", "id_scale_length_" + i);
  $Wlab.attr("id", "id_scale_width_" + i);
  $Hlab.attr("id", "id_scale_height_" + i);
  $delBut.attr("id","r" + i);
  $delBut.attr("onclick","removeSkid(this.id)");

  $($header).append ("Skid " + (parseInt(i) + 1) + "   ");
  $($header).append ($delBut);
  $($tdtable).append($header);


  $($tdtable).append("Pin #:");
  $($tdtable).append($pin);
  $($trtable).append($tdtable);
  $($divider).append($trtable);

  $trtable = $("<tr></tr>");
  $tdtable = $("<td></td>")

  $($tdtable).append("Cube dimensions: L");
  $($tdtable).append($Llab);
  $($tdtable).append("W");
  $($tdtable).append($Wlab);
  $($tdtable).append("H");
  $($tdtable).append($Hlab);

  $($trtable).append($tdtable);
  $($divider).append($trtable);


  let $BolWeight = $("<input type = 'text' size='5' maxlength='5'></input>");
  let $ReWeight = $("<input type = 'text' size='5' maxlength='5'></input>");

  $BolWeight.attr("id", "id_scale_weight_bol_" + i);
  $ReWeight.attr("id", "id_scale_weight_rescale_" + i);


  $trtable = $("<tr></tr>");
  $tdtable = $("<td></td>")

  $($tdtable).append("BOL Weight:");
  $($tdtable).append($BolWeight);
  $($tdtable).append("Rescaled Weight:");
  $($tdtable).append($ReWeight);

  $($trtable).append($tdtable);
  $($divider).append($trtable);
  $('#skidTable').append($divider);
  nowSkid++;
}

function addNewSkid() {
  i = json.totalSkid - 1;
  i++;
  addSkid();
  json.totalSkid ++;
  document.getElementById('id_totalSkid').value = json.totalSkid;

}
