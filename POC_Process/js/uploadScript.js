var imgIndex = 0;
var exportFiles = new Array();

function initialUpload() {
  let uploadFiles = document.getElementById("getFiles"); //saves the array of selected images
  //add to DOM
  //TODO: check for repeats (compare using file name)
  for (var i = 0; i < uploadFiles.files.length; i++) {
    let file = uploadFiles.files[i];
    exportFiles.push(file);
    $("#pic").append("<img src = " + URL.createObjectURL(file) + " id = 'img_" + imgIndex + "'>");
    $("#pic").append("<button class = 'remove' id = 'imgBtn_" + imgIndex + "' onclick ='removeImg(" + imgIndex + ")'>X</button>");
    imgIndex++;
  }
  importedFiles = exportFiles;
  //exportFiles.push(uploadFiles.files);
}
function removeImg(event) {
//alert(event);
$("#img_" + event).remove();
$("#imgBtn_" + event).remove();
exportFiles.splice(event);
}
function nextPage(){
  // importedFiles = exportFiles;
  // alert (exportFiles);
  window.location.href = "form.html";
}
