
var azEarlyVoters = [775537, 714106, 95923, "10/27", 3989214];
var az2016outcome = [1161167, 1252401, 159597, 3588466];

var gaEarlyVoters = [1284839, 1446393, 201942, "10/28", 7587625];
var ga2016outcome = [1877963, 2089104, 159597, 6657432];

var flEarlyVoters = [2998368, 2885185, 428808, "10/28", 14065627];
var fl2016outcome = [4504975, 4617886, 297178, 12959185];

var miEarlyVoters = [980819, 879718, 437560, "10/28", 7748541];
var mi2016outcome = [2268836, 2279543, 159597, 7514055];

var mnEarlyVoters = [600793, 389865, 290878, "10/28", 3537003];
var mn2016outcome = [1367716, 1322951, 254146, 3279734];

var ncEarlyVoters = [1647835, 1501176, 290878, "10/28", 7309385];
var nc2016outcome = [2189316, 2362631, 189617, 6749460];

var ohEarlyVoters = [1009652, 1119723, 307304, "10/28", 8073417];
var oh2016outcome = [2394164, 2841005, 261318, 7861025];

var paEarlyVoters = [1172784, 527514, 138506, "10/28", 9089998];
var pa2016outcome = [2926441, 2970733, 268304, 8722977];

var txEarlyVoters = [2930211, 3906024, 711543, "10/28", 16955519];
var tx2016outcome = [3877868, 4685047, 406311, 15100824];

var wiEarlyVoters = [528962, 478982, 294884, "10/27", 3583804];
var wi2016outcome = [1382536, 1405284, 188330, 3558877];



var earlyVoters = [];
var outcome16 = [];
var state;
var winner;
var winBy;


function statusCheck(){

  var x = document.getElementById("status").selectedIndex;  
  var y = (document.getElementsByTagName("option")[x].value);

    if (y == "az") {
      earlyVoters = azEarlyVoters;
      outcome16 = az2016outcome;
      state = "Arizona";
    } else if (y == "ge") {
      earlyVoters = gaEarlyVoters;
      outcome16 = ga2016outcome;
      state = "Georgia";
    } else if (y == "fl") {
      earlyVoters = flEarlyVoters;
      outcome16 = fl2016outcome;
      state = "Florida";
    } else if (y == "mi") {
      earlyVoters = miEarlyVoters;
      outcome16 = mi2016outcome;
      state = "Michigan";
    } else if (y == "mn") {
      earlyVoters = mnEarlyVoters;
      outcome16 = mn2016outcome;
      state = "Minnesota";
    } else if (y == "nc") {
      earlyVoters = ncEarlyVoters;
      outcome16 = nc2016outcome;
      state = "North Carolina";
    } else if (y == "oh") {
      earlyVoters = ohEarlyVoters;
      outcome16 = oh2016outcome;
      state = "Ohio";
    } else if (y == "pa") {
      earlyVoters = paEarlyVoters;
      outcome16 = pa2016outcome;
      state = "Pennsylvania";
    } else if (y == "tx") {
      earlyVoters = txEarlyVoters;
      outcome16 = tx2016outcome;
      state = "Texas";
    } else if (y == "wi") {
      earlyVoters = wiEarlyVoters;
      outcome16 = wi2016outcome;
      state = "Wisconsin";
    } else {
      alert();
    }
    
    firstStart();
}


function arizona(){
      earlyVoters = azEarlyVoters;
      outcome16 = az2016outcome;
      state = "Arizona";
      firstStart();
}


function firstStart(){
  //fix Date      
  printState();

  var div = document.getElementById('date');
    div.innerHTML = earlyVoters[3];
  //fix indie voters
  //.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") this puts commas in our big numbers...
  var div = document.getElementById('eirv');
    div.innerHTML = (earlyVoters[2].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
      //fix repub voters
var div = document.getElementById('errv');
    div.innerHTML = (earlyVoters[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
// fix demo voters
var div = document.getElementById('edrv');
    div.innerHTML = (earlyVoters[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))

var div = document.getElementById('registeredVoters');
    div.innerHTML = (earlyVoters[4].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))


var totalVoters = earlyVoters[0] + azEarlyVoters[1] + azEarlyVoters[2];

var div = document.getElementById('totalVotes');
    div.innerHTML = (totalVoters.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))

registeredVoterMessaging(totalVoters);
configure2016Results();

if (earlyVoters[0] > earlyVoters[1]) {
    demoOver();
} else {
  repubOver();
}
}

function demoOver(){

    var voteCountDifference = (earlyVoters[0] - earlyVoters[1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    var message = "Democrats have a 'lead' of " + voteCountDifference + " registered voters who have already voted. But that doesn't mean much."; 

    var div = document.getElementById('text');
    div.innerHTML = (message);

}

function repubOver(){
    var voteCountDifference = (earlyVoters[1] - earlyVoters[0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    var message = "Republicans have a 'lead' of " + voteCountDifference + " registered voters who have already voted. But that doesn't mean much."; 

    var div = document.getElementById('text');
    div.innerHTML = (message);

}


function registeredVoterMessaging(a){

    var earlyVotingPercentage = ((a/earlyVoters[4]) * 100).toFixed(0);

    var message = earlyVotingPercentage + "% of registered voters have already voted, but again that doesn't mean much. </br> Keep reading to learn why and see the prediction I have for this state.";

    var div = document.getElementById('registered_predictions');
    div.innerHTML = (message);

}

function configure2016Results (){

    var div = document.getElementById("Clinton16");
    div.innerHTML = (outcome16[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

    var div = document.getElementById("trump16");
    div.innerHTML = (outcome16[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

    var div = document.getElementById("3party16");
    div.innerHTML = (outcome16[2].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

    var div = document.getElementById("register2016");
    div.innerHTML = (outcome16[3].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

    var voters16 = outcome16[1] + outcome16[0] + outcome16[2];

    var div = document.getElementById("16voters");
    div.innerHTML = (voters16).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    var percentOf16Voters = (voters16/outcome16[3]);

    voterOutComePredict2020(percentOf16Voters);


      if (outcome16[0] > outcome16[1]) {
          var div = document.getElementById("whoWonIn16");
        div.innerHTML = ("Hillary Clinton ");

        var spread = (outcome16[0] - outcome16[1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

        var div = document.getElementById("16Spread");
            div.innerHTML = (spread);

      } else {
        var div = document.getElementById("whoWonIn16");
            div.innerHTML = ("Barnyard Hump ");

        var spread = (outcome16[1] - outcome16[0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

        var div = document.getElementById("16Spread");
            div.innerHTML = (spread);

      }


}


function voterOutComePredict2020(a) {

    var probableVoters = (earlyVoters[4] * a);

    var leftOverVoters = probableVoters - (earlyVoters[0] + earlyVoters[1] + earlyVoters[2]);

    var div = document.getElementById("registeredVoters2");
    div.innerHTML = (earlyVoters[4]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    var div = document.getElementById("predictedVoters");
    div.innerHTML = (probableVoters).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      probablePartyVotes(leftOverVoters);

}


function probablePartyVotes(a){

    let demVotesMinusBadDemocrats = earlyVoters[0] - (earlyVoters[0] * .05 ).toFixed(0);

    let repVotesMinusBadRepublicans = earlyVoters[1] - (earlyVoters[1] * .04 ).toFixed(0);

    let indieVoterWhoVoteBiden = earlyVoters[2] * .42;

    let indieVoterWhoVoteTrump = earlyVoters[2] * .44;

    let badRepublicanBidenVoters = earlyVoters[1] * .04;

    let badDemocratTrumpVoters = earlyVoters[0] * .05;

    let percentDem16 = outcome16[0] / (outcome16[0] + outcome16[1] + outcome16[2]);

    let remainingBidenVote = a * percentDem16;

    let percentRep16 = outcome16[1] / (outcome16[0] + outcome16[1] + outcome16[2]);

    let remainingTrumpVote = a * percentRep16;

    let probableBidenVotes = (demVotesMinusBadDemocrats + indieVoterWhoVoteBiden + badRepublicanBidenVoters + remainingBidenVote).toFixed(0);

    let probableTrumpVotes = (repVotesMinusBadRepublicans + indieVoterWhoVoteTrump + badDemocratTrumpVoters + remainingTrumpVote).toFixed(0);

    var probableVoters = (earlyVoters[4] * a);

    var indieVotes = ((a + earlyVoters[0] + earlyVoters[1] + earlyVoters[2])- (probableTrumpVotes + probableBidenVotes)).toFixed(0);


    var div = document.getElementById("bidenPredict");
    div.innerHTML = (probableBidenVotes).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        var div = document.getElementById("trumpPredict");
    div.innerHTML = (probableTrumpVotes).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        var div = document.getElementById("3partyPredict");
    div.innerHTML = (a).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      if (probableTrumpVotes > probableBidenVotes) {
        var div = document.getElementById("whoWillWin");
    div.innerHTML = ("Trump");
        var div = document.getElementById("predictionSpread");
    div.innerHTML = (probableTrumpVotes - probableBidenVotes).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      winner = "Trump";
      winBy = (probableTrumpVotes - probableBidenVotes).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
var div = document.getElementById("whoWillWin");
    div.innerHTML = ("Biden");
        var div = document.getElementById("predictionSpread");
    div.innerHTML = (probableBidenVotes - probableTrumpVotes).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      winner = "Biden";
      winBy = (probableBidenVotes - probableTrumpVotes).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      }  
      configStateCount();

}

function printState() {
  var div = document.getElementById("state");
    div.innerHTML = (state);

  var div = document.getElementById("state2");
    div.innerHTML = (state);

  var div = document.getElementById("state3");
    div.innerHTML = (state);
    
    

}

function configStateCount(){

  if (state == "Arizona") {
        document.getElementById("arizona").style.display = "block";
  var div = document.getElementById("azWinner");
    div.innerHTML = (winner);

  var div = document.getElementById("azSpread");
    div.innerHTML = (winBy);

  } else if (state == "Georgia"){
    document.getElementById("georgia").style.display = "block";
 var div = document.getElementById("gaWinner");
    div.innerHTML = (winner);

  var div = document.getElementById("gaSpread");
    div.innerHTML = (winBy);    

  } else if (state == "Florida"){
    document.getElementById("florida").style.display = "block";
 var div = document.getElementById("flWinner");
    div.innerHTML = (winner);

  var div = document.getElementById("flSpread");
    div.innerHTML = (winBy);

} else if (state == "Michigan"){
    document.getElementById("michigan").style.display = "block";
 var div = document.getElementById("miWinner");
    div.innerHTML = (winner);

  var div = document.getElementById("miSpread");
    div.innerHTML = (winBy);

}  else if (state == "Minnesota"){
    document.getElementById("minnesota").style.display = "block";
 var div = document.getElementById("mnWinner");
    div.innerHTML = (winner);

  var div = document.getElementById("mnSpread");
    div.innerHTML = (winBy);

} else if (state == "North Carolina"){
    document.getElementById("north-carolina").style.display = "block";
 var div = document.getElementById("ncWinner");
    div.innerHTML = (winner);

  var div = document.getElementById("ncSpread");
    div.innerHTML = (winBy);

} else if (state == "Ohio"){
    document.getElementById("ohio").style.display = "block";
 var div = document.getElementById("ohWinner");
    div.innerHTML = (winner);

  var div = document.getElementById("ohSpread");
    div.innerHTML = (winBy);

} else if (state == "Pennsylvania"){
    document.getElementById("pennsylvania").style.display = "block";
 var div = document.getElementById("paWinner");
    div.innerHTML = (winner);

  var div = document.getElementById("paSpread");
    div.innerHTML = (winBy);

} else if (state == "Texas"){
    document.getElementById("texas").style.display = "block";
 var div = document.getElementById("txWinner");
    div.innerHTML = (winner);

  var div = document.getElementById("txSpread");
    div.innerHTML = (winBy);

} else if (state == "Wisconsin"){
    document.getElementById("wisconsin").style.display = "block";
 var div = document.getElementById("wiWinner");
    div.innerHTML = (winner);

  var div = document.getElementById("wiSpread");
    div.innerHTML = (winBy);

} else {

}
}

