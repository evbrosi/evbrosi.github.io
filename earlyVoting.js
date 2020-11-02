google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

var bidenAt7 = 16;
var trumpAt7 = 28;

var bidenAt7half = 0;
var trumpAt7half = 5;

var bidenAt8 = 78;
var trumpAt8 = 43;

var bidenAt8half = 0;
var trumpAt8half = 6;

var bidenAt9 = 43;
var trumpAt9 = 24;

var bidenAt10 = 6;
var trumpAt10 = 15;

var bidenAt11 = 74;
var trumpAt11 = 4;

var bidenAt12 = 4;
var trumpAt12 = 3;

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Time', 'Biden', 'Trump', 'To Win'],
    ['6:00 pm',  0, 0, 270],
    ['7:00 pm',  bidenAt7, trumpAt7, 270],
    ['7:30 pm',  bidenAt7half + bidenAt7, trumpAt7half + trumpAt7, 270],
    ['8:00 pm',  bidenAt7half + bidenAt7 + bidenAt8, trumpAt7half + trumpAt7 + trumpAt8, 270],
    ['8:30 pm',  bidenAt7half + bidenAt7 + bidenAt8 + bidenAt8half, trumpAt7half + trumpAt7 + trumpAt8 + trumpAt8half, 270],
    ['9:00 pm',  bidenAt7half + bidenAt7 + bidenAt8 + bidenAt8half + bidenAt9, trumpAt7half + trumpAt7 + trumpAt8 + trumpAt8half + trumpAt9, 270],
    ['10:00 pm',  bidenAt7half + bidenAt7 + bidenAt8 + bidenAt8half + bidenAt9 + bidenAt10, trumpAt7half + trumpAt7 + trumpAt8 + trumpAt8half + trumpAt9 + trumpAt10, 270],
    ['11:00 pm',  bidenAt7half + bidenAt7 + bidenAt8 + bidenAt8half + bidenAt9 + bidenAt10 + bidenAt11, trumpAt7half + trumpAt7 + trumpAt8 + trumpAt8half + trumpAt9 + trumpAt10 + trumpAt11, 270],
    ['1:00 am',  bidenAt7half + bidenAt7 + bidenAt8 + bidenAt8half + bidenAt9 + bidenAt10 + bidenAt11 + bidenAt12, trumpAt7half + trumpAt7 + trumpAt8 + trumpAt8half + trumpAt9 + trumpAt10 + trumpAt11 + trumpAt12, 270],
    ]);

  var options = {
    curveType: '',
    height: 500,
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
  printNames();
}



// Okay this guy is giving me problems but we can fix this...
var va= "democrat";
var ga= "-";
var nc= "-";
var oh= "-";
var pa= "-";
var fl = "-";
var me = "republican";
var nh = "democrat";
var mi= "-";
var mn = "-";
var wi = "-";
var az = "-";
var tx = "-";
var io = "republican";
var nv = "democrat";

function statusCheck(a, b){
  if (a=="va") {
      virginia(b);
  } else if (a== "ga") {
    georgia(b);
  } else if (a== "nc"){
    northCarolina(b);
  } else if (a== "oh"){
    ohio(b);
  } else if (a== "pa"){
    penn(b);
  } else if (a== "fl"){
    florida(b);
  } else if (a== "me"){
    maine(b);
  } else if (a== "nh"){
    newHampshire(b);
  } else if (a == "mi"){
    michigan(b);
  } else if (a== "mn"){
    minnesota(b);
  } else if (a== "wi"){
    wisconsin(b);
  } else if (a== "az"){
    arizona(b);
  } else if (a== "tx"){
    texas(b);
  } else if (a == "io"){
    iowa(b);
  } else if (a == "nv"){
    nevada(b);
  }

printNames();
drawChart();
}


function virginia(b) {
  if (va =="democrat" ) {
      trumpAt7 = trumpAt7 + (+b);
      bidenAt7 = bidenAt7 - (+b);
      va= "republican";
      $("#va").css('background-color', "#fd0e35");
  } else {
    trumpAt7 = trumpAt7 - (+b);
    bidenAt7 = bidenAt7 + (+b);
    va= "democrat";
      $("#va").css('background-color', "#24a0ed");
  }
}

function georgia(b) {
  if (ga =="democrat" ) {
      trumpAt7 = trumpAt7 + (+b);
      bidenAt7 = bidenAt7 - (+b);
      ga= "republican";
      $("#ga").css('background-color', "#fd0e35");
  } else if (ga == "republican") {
    trumpAt7 = trumpAt7 - (+b);
    bidenAt7 = bidenAt7 + (+b);
    ga= "democrat";
    $("#ga").css('background-color', "#24a0ed");
  } else {
    trumpAt7 = trumpAt7 + (+b);
    ga= "republican";
    $("#ga").css('background-color', "#fd0e35");
  }
}

function northCarolina(b) {
  if (nc =="democrat" ) {
      trumpAt7half = trumpAt7half + (+b);
      bidenAt7half = bidenAt7half - (+b);
      nc = "republican";
      $("#nc").css('background-color', "#fd0e35");
  } else if (ga == "republican") {
      trumpAt7half = trumpAt7half - (+b);
      bidenAt7half = bidenAt7half + (+b);
      nc= "democrat";
    $("#nc").css('background-color', "#24a0ed");
  } else {
      bidenAt7half = bidenAt7half + (+b);
      nc= "democrat";
    $("#nc").css('background-color', "#24a0ed");
  }
}

function ohio(b) {
  if (oh =="democrat" ) {
      trumpAt7half = trumpAt7half + (+b);
      bidenAt7half = bidenAt7half - (+b);
      oh = "republican";
      $("#oh").css('background-color', "#fd0e35");
  } else if (oh == "republican") {
      trumpAt7half = trumpAt7half - (+b);
      bidenAt7half = bidenAt7half + (+b);
      oh= "democrat";
    $("#oh").css('background-color', "#24a0ed");
  } else {
      trumpAt7half = trumpAt7half + (+b);
      oh = "republican";
      $("#oh").css('background-color', "#fd0e35");
  }
}

function penn(b) {
  if (pa =="democrat" ) {
        trumpAt8 = trumpAt8 + (+b);
      bidenAt8 = bidenAt8 - (+b);
      pa = "republican";
      $("#pa").css('background-color', "#fd0e35");
  } else if (pa == "republican") {
      trumpAt8 = trumpAt8 - (+b);
      bidenAt8 = bidenAt8 + (+b);
      pa= "democrat";
    $("#pa").css('background-color', "#24a0ed");
  } else {
      bidenAt8 = bidenAt8 + (+b);
      pa= "democrat";
    $("#pa").css('background-color', "#24a0ed");
  }
}

function florida(b) {
  if (fl =="democrat" ) {
        trumpAt8 = trumpAt8 + (+b);
      bidenAt8 = bidenAt8 - (+b);
      fl = "republican";
      $("#fl").css('background-color', "#fd0e35");
  } else if (fl == "republican") {
      trumpAt8 = trumpAt8 - (+b);
      bidenAt8 = bidenAt8 + (+b);
      fl = "democrat";
    $("#fl").css('background-color', "#24a0ed");
  } else {
      bidenAt8 = bidenAt8 + (+b);
      fl= "democrat";
    $("#fl").css('background-color', "#24a0ed");
  }
}

function maine(b) {
  if (me =="democrat" ) {
        trumpAt8 = trumpAt8 + (+b);
      bidenAt8 = bidenAt8 - (+b);
      me = "republican";
      $("#me").css('background-color', "#fd0e35");
  } else if (me == "republican") {
      trumpAt8 = trumpAt8 - (+b);
      bidenAt8 = bidenAt8 + (+b);
      me= "democrat";
    $("#me").css('background-color', "#24a0ed");
  } else {
      bidenAt8 = bidenAt8 + (+b);
      me= "democrat";
    $("#me").css('background-color', "#24a0ed");
  }
}

function newHampshire(b) {
  if (nh =="democrat" ) {
        trumpAt8 = trumpAt8 + (+b);
      bidenAt8 = bidenAt8 - (+b);
      nh = "republican";
      $("#nh").css('background-color', "#fd0e35");
  } else if (nh == "republican") {
      trumpAt8 = trumpAt8 - (+b);
      bidenAt8 = bidenAt8 + (+b);
      nh = "democrat";
    $("#nh").css('background-color', "#24a0ed");
  } else {
      bidenAt8 = bidenAt8 + (+b);
      nh = "democrat";
    $("#nh").css('background-color', "#24a0ed");
  }
}

function michigan(b) {
  if (mi =="democrat" ) {
      trumpAt9 = trumpAt9 + (+b);
      bidenAt9 = bidenAt9 - (+b);
      mi = "republican";
      $("#mi").css('background-color', "#fd0e35");
  } else if (mi == "republican") {
      trumpAt9 = trumpAt9 - (+b);
      bidenAt9 = bidenAt9 + (+b);
      mi = "democrat";
    $("#mi").css('background-color', "#24a0ed");
  } else {
      bidenAt9 = bidenAt9 + (+b);
      mi = "democrat";
    $("#mi").css('background-color', "#24a0ed");
  }
}

function minnesota(b) {
  if (mn =="democrat" ) {
      trumpAt9 = trumpAt9 + (+b);
      bidenAt9 = bidenAt9 - (+b);
      mn = "republican";
      $("#mn").css('background-color', "#fd0e35");
  } else if (mn == "republican") {
      trumpAt9 = trumpAt9 - (+b);
      bidenAt9 = bidenAt9 + (+b);
      mn = "democrat";
    $("#mn").css('background-color', "#24a0ed");
  } else {
      bidenAt9 = bidenAt9 + (+b);
      mn = "democrat";
    $("#mn").css('background-color', "#24a0ed");
  }
}

function wisconsin(b) {
  if (wi =="democrat" ) {
      trumpAt9 = trumpAt9 + (+b);
      bidenAt9 = bidenAt9 - (+b);
      wi = "republican";
      $("#wi").css('background-color', "#fd0e35");
  } else if (wi == "republican") {
      trumpAt9 = trumpAt9 - (+b);
      bidenAt9 = bidenAt9 + (+b);
      wi = "democrat";
    $("#wi").css('background-color', "#24a0ed");
  } else {
      bidenAt9 = bidenAt9 + (+b);
      wi = "democrat";
    $("#wi").css('background-color', "#24a0ed");
  }
}

function arizona(b) {
  if (az =="democrat" ) {
      trumpAt9 = trumpAt9 + (+b);
      bidenAt9 = bidenAt9 - (+b);
      az = "republican";
      $("#az").css('background-color', "#fd0e35");
  } else if (az == "republican") {
      trumpAt9 = trumpAt9 - (+b);
      bidenAt9 = bidenAt9 + (+b);
      az = "democrat";
    $("#az").css('background-color', "#24a0ed");
  } else {
      trumpAt9 = trumpAt9 + (+b);
      az = "republican";
      $("#az").css('background-color', "#fd0e35");
  }
}

function texas(b) {
  if (tx =="democrat" ) {
      trumpAt9 = trumpAt9 + (+b);
      bidenAt9 = bidenAt9 - (+b);
      tx = "republican";
      $("#tx").css('background-color', "#fd0e35");
  } else if (tx == "republican") {
      trumpAt9 = trumpAt9 - (+b);
      bidenAt9 = bidenAt9 + (+b);
      tx = "democrat";
    $("#tx").css('background-color', "#24a0ed");
  } else {
      trumpAt9 = trumpAt9 + (+b);
      tx = "republican";
      $("#tx").css('background-color', "#fd0e35");
  }
}

function nevada(b) {
  if (nv =="democrat" ) {
      trumpAt10 = trumpAt10 + (+b);
      bidenAt10 = bidenAt10 - (+b);
      nv = "republican";
      $("#nv").css('background-color', "#fd0e35");
  } else if (nv == "republican") {
  trumpAt10 = trumpAt10 - (+b);
  bidenAt10 = bidenAt10 + (+b);
      nv = "democrat";
    $("#nv").css('background-color', "#24a0ed");
  } else {
      trumpAt10 = trumpAt10 + (+b);
      nv = "republican";
      $("#nv").css('background-color', "#fd0e35");
  }
}

function iowa(b) {
  if (io =="democrat" ) {
      trumpAt10 = trumpAt10 + (+b);
      bidenAt10 = bidenAt10 - (+b);
      io = "republican";
      $("#io").css('background-color', "#fd0e35");
  } else if (io == "republican") {
  trumpAt10 = trumpAt10 - (+b);
  bidenAt10 = bidenAt10 + (+b);
      io = "democrat";
    $("#io").css('background-color', "#24a0ed");
  } else {
      trumpAt9 = trumpAt9 + (+b);
      io = "republican";
      $("#io").css('background-color', "#fd0e35");
  }
}



function printNames(){
  var div = document.getElementById('biden7');
    div.innerHTML = bidenAt7;

    var div = document.getElementById('trump7');
    div.innerHTML = trumpAt7;

  var div = document.getElementById('biden7half');
    div.innerHTML = bidenAt7 + bidenAt7half;

    var div = document.getElementById('trump7half');
    div.innerHTML = trumpAt7 + trumpAt7half;

      var div = document.getElementById('biden8');
    div.innerHTML = bidenAt7 + bidenAt7half + bidenAt8;

    var div = document.getElementById('trump8');
    div.innerHTML = trumpAt7 + trumpAt7half + trumpAt8;

      var div = document.getElementById('biden8half');
    div.innerHTML = bidenAt7 + bidenAt7half + bidenAt8 + bidenAt8half;

    var div = document.getElementById('trump8half');
    div.innerHTML = trumpAt7 + trumpAt7half + trumpAt8 + trumpAt8half;

      var div = document.getElementById('biden9');
    div.innerHTML = bidenAt7 + bidenAt7half + bidenAt8 + bidenAt8half + bidenAt9;

    var div = document.getElementById('trump9');
    div.innerHTML = trumpAt7 + trumpAt7half + trumpAt8 + trumpAt8half + trumpAt9;

    var div = document.getElementById('biden10');
    div.innerHTML = bidenAt7 + bidenAt7half + bidenAt8 + bidenAt8half + bidenAt9 + bidenAt10;

    var div = document.getElementById('trump10');
    div.innerHTML = trumpAt7 + trumpAt7half + trumpAt8 + trumpAt8half + trumpAt9 + trumpAt10;

      var div = document.getElementById('biden11');
    div.innerHTML = bidenAt7 + bidenAt7half + bidenAt8 + bidenAt8half + bidenAt9 + bidenAt10 + bidenAt11;

var div = document.getElementById('trump11');
    div.innerHTML = trumpAt7 + trumpAt7half + trumpAt8 + trumpAt8half + trumpAt9 + trumpAt10 + trumpAt11;
      announceWinner();
}

function announceWinner(){
    if ((bidenAt7 + bidenAt7half + bidenAt8 + bidenAt8half + bidenAt9 + bidenAt10 + bidenAt11) > 270 ){
      $("body").css("background-color", "#24a0ed");
    } else if ((trumpAt7 + trumpAt7half + trumpAt8 + trumpAt8half + trumpAt9 + trumpAt10 + trumpAt11) > 270 ) {
      $("body").css("background-color", "#fd0e35");
    } else {
      $("body").css("background-color", "#ffffff"); 
    }
}

function updateData730(){
    bidenAt7half = bidenAt7 + 0;
    trumpAt7half = trumpAt7 + 5;
}

function updateData8(){
    bidenAt8 = bidenAt7half + 78;
    trumpAt8 = trumpAt7half + 43;
}

function updateData830(){
    bidenAt8half = bidenAt8;
    trumpAt8half = trumpAt8 + 6;
}

function updateData9(){
    bidenAt9 = bidenAt8half + 43;
    trumpAt9 = trumpAt8half + 24;
}

function updateData10(){
    bidenAt10 = bidenAt9 + 6;
    trumpAt10 = trumpAt9 + 15;
}

function updateData11() {
    bidenAt11 = bidenAt10 + 74;
    trumpAt11 = trumpAt10 + 4;

    bidenAt12 = bidenAt11 + 4;
    trumpAt12 = trumpAt11 + 3;

    if (bidenAt12 > 270) {
      alert("JOE BIDEN HAS WON THE 2020 PRESIDENTIAL ELECTION");
    }
    if (trumpAt12 > 270) {
      alert("DONALD TRUMP HAS WON THE 2020 PRESIDENTIAL ELECTION");
    }
}  



function displayIt(){
  var x = document.getElementById("730pm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function displayIt7(){
  var x = document.getElementById("7pm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function displayIt8(){
  var x = document.getElementById("8pm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function displayIt830(){
  var x = document.getElementById("830pm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function displayIt9(){
  var x = document.getElementById("9pm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function displayIt10(){
  var x = document.getElementById("10pm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function displayIt11(){
  var x = document.getElementById("11pm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}