/* code for changing anything relating to the image viewer
*/
var index = 0; //current image index: used for keeping track of what image
               //to display when user navigates through the list
var importedFiles = null; //array of uploaded images
//
// window.onload=func1;
//
// function func1() {
//   alert("This is the first.");
//   try {
//     transfer();
//   } catch (e){}
// }

//updates the list of img names in the drop-down
//only called at end of viewName()
function updateIndex(arr) {
  //clear previous options
  $("#selectList").empty();
  //add selection box options
  for (var i = 0; i < arr.length; i++) {
    var o = new Option(arr[i].name, i);
    /// jquerify the DOM object 'o' or <option> so we can use the html method
    $(o).html(arr[i].name);
    $("#selectList").append(o);
  }
}

//called when upload button is pressed, or when the displayed image needs to be updated
function viewName() {
  /*
  //creates drop-down element and added to DOM
  if($('#selectList').length == 0){
  $( '<select id="selectList" onchange="updatePic()"></select> <br>' ).insertAfter( "#get-files" );
}*/
importedFiles = document.getElementById("getFiles"); //saves the array of selected images

//updates the displayed image
try {
  let file = importedFiles.files[index];
  document.getElementById('inside-pic').src = URL.createObjectURL(file);
} catch {
  alert ('index is out of bounds');
}

updateIndex(importedFiles.files);
// load_start(importedFiles);
}

//the first time files are uploaded
function startOff(index){
  viewName();
  load_start(importedFiles,index);
}

function swipe() {
  var largeImage = document.getElementById('inside-pic');
  largeImage.style.display = 'block';
  var url=largeImage.getAttribute('src');
  window.open(url,'Image','width=largeImage.stylewidth,height=largeImage.style.height,resizable=1');
}

function  loadpic(){
  window.open(this.src);
}

//called when an image (name) is selected from the drop-down box
//updates the displayed image on the screen
function updatePic() {
  index = document.getElementById('selectList').value;
  startOff(index);

  document.getElementById('selectList').options[index].selected = true;
}


//changes to next image in array
function nextBtn(){
  if (index + 1 === importedFiles.files.length) {
    alert ('No next image!');
  } else {
    index ++;
    startOff(index);
  }
}

function prevBtn(){
  if (index === 0) {
    alert ('No previous image!');
  } else {
    index --;
    startOff(index);
  }
}
