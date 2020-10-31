
google.charts.load('current', {'packages':['sankey']});
google.charts.load("current", {packages:["corechart"]});

var az2016outcome = [1161167, 1252401, 159597, 3588466];
var ga2016outcome = [1877963, 2089104, 159597, 6657432];
var fl2016outcome = [4504975, 4617886, 297178, 12959185];
var mi2016outcome = [2268836, 2279543, 159597, 7514055];
var mn2016outcome = [1367716, 1322951, 254146, 3279734];
var nc2016outcome = [2189316, 2362631, 189617, 6749460];
var oh2016outcome = [2394164, 2841005, 261318, 7861025];
var pa2016outcome = [2926441, 2970733, 268304, 8722977];
var tx2016outcome = [3877868, 4685047, 406311, 15100824];
var wi2016outcome = [1382536, 1405284, 188330, 3558877];

var azRegisteredVoters = 3989214;
var gaRegisteredVoters = 7587625;
var flRegisteredVoters = 14065627;
var miRegisteredVoters = 7748541;
var mnRegisteredVoters = 3537003;
var ncRegisteredVoters = 7309385;
var ohRegisteredVoters = 8073417;
var paRegisteredVoters = 9089998;
var txRegisteredVoters = 16955519;
var wiRegisteredVoters = 3583804;

var azDemocrats = [727687, 775537, 872210, 955633, 1036817, 1088709];
var azRepublicans = [662124, 714106, 843244, 937486, 1034082, 1099789];
var azIndependents = [88815,  95923,  111730, 129325, 145156, 154661];

var gaDemocrats = [1127028, 1203359, 1284839, 1367047, 1455074, 1530501];
var gaRepublicans = [1255877, 1330288, 1446393, 1562760, 1678728, 1776130];
var gaIndependents = [172140, 185093, 201942, 219538, 238009, 254578];

var flDemocrats = [2703172, 2839748, 2998368, 3183118, 3367655, 3541847];
var flRepublicans = [2524687, 2667026, 2885185, 3126037, 3350302, 3563458];
var flIndependents = [378400, 400470, 428808, 463262, 497670, 531157];

var miDemocrats = [864367, 925885, 980819, 1014367, 1059732];
var miRepublicans = [767532,  820683, 879718, 915148, 962716];
var miIndependents = [382752, 409211, 437560, 453811, 476691];

var mnDemocrats = [566700, 575641, 600793, 632879, 663680, 695641];
var mnRepublicans = [362082,  364252, 389865, 419452, 447514, 477834];
var mnIndependents = [273319, 274636, 290878, 308394, 326165, 344682];

var ncDemocrats = [1519115,  1552973, 1647835, 1732689, 1823212, 1832158];
var ncRepublicans = [1344880,  1378065, 1501176, 1613318, 1732275, 1740248];
var ncIndependents = [190515, 195179, 211452, 226235, 243165, 245826];

var ohDemocrats = [902605,  950118, 1009652, 1063669, 1117579, 1174300];
var ohRepublicans = [993819,  1039350, 1119723, 1188383, 1260171, 1338051];
var ohIndependents = [271433, 284839, 307304, 326753, 345748, 370009];

var paDemocrats = [925638,  1096538, 1172784, 1249297, 1323538];
var paRepublicans = [391722,  478173, 527514, 567613, 616235];
var paIndependents = [104255, 127404, 138506, 148313, 162089];

var txDemocrats = [2609755,  2710428, 2930211, 3007296, 3293048, 3462626];
var txRepublicans = [3487232, 3628581, 3906024, 3996550, 4366847, 4567597];
var txIndependents = [617128, 647539, 711543, 743315, 830513, 881027];

var wiDemocrats = [511245, 528962, 562167, 592089, 640488];
var wiRepublicans = [470977, 478982, 521859, 559722, 606777];
var wiIndependents = [290311, 294884, 317180, 336590, 369073];

var democrats = [];
var republicans = [];
var independents = [];

var registeredVoters;

var resultsIn2016= [];

function start(){
  democrats = azDemocrats;
  resultsIn2016 = az2016outcome;
  republicans = azRepublicans;
  independents = azIndependents;
  registeredVoters = azRegisteredVoters;
  drawChart1();
  drawChart2();
  drawChart3();
  results2016Chart();
  specialMessage();
}

function drawChart1() {

  var data = google.visualization.arrayToDataTable([
    ['Political Party', 'Early Voters'],
    ['Democrats',     democrats[democrats.length - 1]],
    ['Republicans',      republicans[republicans.length-1]],
    ['Third-Party',  independents[independents.length-1]],
    ]);

  var options = {
    pieHole: 0.4,
    backgroundColor: "#DC5AD7",
  };

  var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
  chart.draw(data, options);
}

function drawChart2() {
    var earlyVoters = independents[independents.length-1] + republicans[republicans.length-1] + democrats[democrats.length - 1];
    var unlikelyVoters = registeredVoters * ((resultsIn2016[0] + resultsIn2016[1] + resultsIn2016[2])/resultsIn2016[3]);

  var data = google.visualization.arrayToDataTable([
    ['Voters', 'Voters'],
    ['Registered Voters who have not voted yet',     registeredVoters-earlyVoters],
    ['Early Voters',      earlyVoters],
    ]);

  var options = {
    pieHole: 0.4,
    colors: ['#FFaaDd', '#FF8000'],
    backgroundColor: "#DC5AD7",
  };

  var chart = new google.visualization.PieChart(document.getElementById('donutchart1'));
  chart.draw(data, options );
}


function drawChart3() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Democrats', 'Republicans' ,  'Indies'],
          ['10/26',  democrats[0], republicans[0], independents[0]],
          ['10/27', democrats[1], republicans[1], independents[1]],
          ['10/28', democrats[2], republicans[2], independents[2]],
          ['10/29', democrats[3], republicans[3], independents[3]],
          ['10/30', democrats[4], republicans[4], independents[4]],
          ['10/31', democrats[5], republicans[5], independents[5]]
        ]);

        var options = {
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }



function results2016Chart() {
    var didntVoters = resultsIn2016[3] - (resultsIn2016[0] + resultsIn2016[1] + resultsIn2016[2]);

  var data = google.visualization.arrayToDataTable([
    ['Category', 'Voters'],
    ['Democrats',     resultsIn2016[0]],
    ['Republicans',      resultsIn2016[1]],
    ['Indie',      resultsIn2016[2]],
    ['Registered Voter that did not vote',      didntVoters],
    ]);

  var options = {
    pieHole: 0.4,
    backgroundColor: "#DC5AD7",
  };

  var chart = new google.visualization.PieChart(document.getElementById('result16'));
  chart.draw(data, options );
}


function specialMessage() {
    var leader;
    var leadBy = Math.abs(democrats[democrats.length-1] - republicans[republicans.length-1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


    if (democrats[democrats.length-1] < republicans[republicans.length-1]) {
      var specialMessage = leadBy + " more votes from registered Republicans than registered Democrats.";
    } else {
          var specialMessage = leadBy + " more votes from registered Democrats than registered Democrats.";
        }

  var div = document.getElementById('specialMessage');
    div.innerHTML = specialMessage;

}



function statusCheck(){

  var x = document.getElementById("status").selectedIndex;  
  var y = (document.getElementsByTagName("option")[x].value);

    if (y == "az") {  
      democrats = azDemocrats;
  resultsIn2016 = az2016outcome;
  republicans = azRepublicans;
  independents = azIndependents;
  registeredVoters = azRegisteredVoters;
      state = "Arizona";
    } else if (y == "ge") {
      democrats = gaDemocrats;
  resultsIn2016 = ga2016outcome;
  republicans = gaRepublicans;
  independents = gaIndependents;
  registeredVoters = gaRegisteredVoters;
      state = "Georgia";
    } else if (y == "fl") {
      democrats = flDemocrats;
  resultsIn2016 = fl2016outcome;
  republicans = flRepublicans;
  independents = flIndependents;
  registeredVoters = flRegisteredVoters;
      state = "Florida";
    } else if (y == "mi") {
      democrats = miDemocrats;
  resultsIn2016 = mi2016outcome;
  republicans = miRepublicans;
  independents = miIndependents;
  registeredVoters = miRegisteredVoters;
      state = "Michigan";
    } else if (y == "mn") {
      democrats = mnDemocrats;
  resultsIn2016 = mn2016outcome;
  republicans = mnRepublicans;
  independents = mnIndependents;
  registeredVoters = mnRegisteredVoters;
      state = "Minnesota";
    } else if (y == "nc") {
      democrats = ncDemocrats;
  resultsIn2016 = nc2016outcome;
  republicans = ncRepublicans;
  independents = ncIndependents;
  registeredVoters = ncRegisteredVoters;
      state = "North Carolina";
    } else if (y == "oh") {
      democrats = ohDemocrats;
  resultsIn2016 = oh2016outcome;
  republicans = ohRepublicans;
  independents = ohIndependents;
  registeredVoters = ohRegisteredVoters;
      state = "Ohio";
    } else if (y == "pa") {
      democrats = paDemocrats;
  resultsIn2016 = pa2016outcome;
  republicans = paRepublicans;
  independents = paIndependents;
  registeredVoters = paRegisteredVoters;
      state = "Pennsylvania";
    } else if (y == "tx") {
      democrats = txDemocrats;
  resultsIn2016 = tx2016outcome;
  republicans = txRepublicans;
  independents = txIndependents;
  registeredVoters = txRegisteredVoters;
      state = "Texas";
    } else if (y == "wi") {
      democrats = wiDemocrats;
  resultsIn2016 = wi2016outcome;
  republicans = wiRepublicans;
  independents = wiIndependents;
  registeredVoters = wiRegisteredVoters;
      state = "Wisconsin";
    } else {
      alert();
    }
  drawChart1();
  drawChart2();
  drawChart3();
  results2016Chart();
  specialMessage();
}
