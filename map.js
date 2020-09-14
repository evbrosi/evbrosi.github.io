
var repubOrganizations = [["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE"],
["REPUBLICAN NATIONAL COMMITTEE"], ["DONALD J. TRUMP FOR PRESIDENT, INC."],
["WINRED"], ["NRCC"], ["NRSC"], ["REPUBLICAN PARTY OF VIRGINIA INC"],
["THE LINCOLN PROJECT"],["6TH CONGRESSIONAL DISTRICT REPUBLICAN FEDERAL COMMITTEE"]
];

var repubMoney = 0;
var repubCounter = 0;

var demoOrganizations = [["ACTBLUE"], ["EMILY'S LIST"], ["BIDEN FOR PRESIDENT"],
["MOVEON.ORG POLITICAL ACTION"], ["SEAL PAC SUPPORTING ELECTING AMERICAN LEADERS PAC"],
]

var demoMoney = 0;
var demoCounter = 0;

var otherDemos = [["FRIENDS OF ANDREW YANG"], ["WARREN FOR PRESIDENT, INC."], 
["BERNIE 2020"], ["AMY FOR AMERICA"], ["WIN THE ERA PAC"]
]

var orgz=[];
var person=[];

//this holds the specific thing of what we want.
var specificInterest = [];

// Initialize and add the map
function initMap(a) {


  if (typeof a === 'undefined') {
    a = locations;
  }

  // The location we center on.
  var center = {lat: 38.440, lng: -78.836};

var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: center
  });

var infowindow =  new google.maps.InfoWindow({});

var marker, count;

for (count = 0; count < a.length; count++) {
    var count2;
    var markerColor="yellow";

    for (count2 = 0; count2 < repubOrganizations.length; count2++){
        if (a[count][0] == repubOrganizations[count2]) {
          markerColor = "red";
          repubMoney = repubMoney + a[count][7];
          repubCounter++;
        }
    }
    var count2 = 0;
    for (count2 = 0; count2 < demoOrganizations.length; count2++){
        if (a[count][0] == demoOrganizations[count2]) {
          markerColor = "blue";
          demoMoney = demoMoney + a[count][7];
          demoCounter++;
        }
    }
    var count2 = 0;
    for (count2 = 0; count2 < otherDemos.length; count2++){
        if (a[count][0] == otherDemos[count2]) {
          markerColor = "green";
        }

    }

    marker = new google.maps.Marker({
      position: new google.maps.LatLng(a[count][9], a[count][10]),
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/' + markerColor +'-dot.png',
      title: a[count][0] + " $" +  a[count][7]
    });

    google.maps.event.addListener(marker, 'click', (function (marker, count) {
      return function () {
      	var nameThings = a[count][0];
      	var address= a[count][2];
			//This takes the ID of the form (A) and then puts (B) into it!
			document.getElementById("name").value = nameThings;
			document.getElementById("address").value = address;
			document.getElementById("amount").value = locations[count][5];			


        infowindow.setContent(a[count][0] + "</br><button id='tinyButton' class='btn btn-outline-dark btn-sm' onclick='lookUpAddress()''>Show Me More</button>");
        infowindow.open(map, marker);
      }
    })(marker, count));
  }

  //we then call Total Donations so we can see all the data... 

}


//This is the start of the page- the very first thing you see...
function totalDonations(){

  var count;
  var donators = [];
  var potatoes = 0;
  var donorCounters = 0;
  var setThemUp;
  for (count = 0; count < locations.length; count++) {
    if (locations[count].length != 0) {
      potatoes = potatoes + locations[count][7];
      donorCounters ++; 
      var count2;
      for (count2 = 0; count2 < donators.length; count2++) {
        if (locations[count][1] == donators[count2]) {
          setThemUp = "pickels";
        }
      }
      if (setThemUp != "pickels") {
        donators.push(locations[count][1]);

        politicalPartyChecker(locations[count]);


      } else {
        setThemUp = "";
      };
  }}


  var organs = "All Donations"

  var orgs=$("#pigPen").html();

        orgs = orgs.replace("", "@@donationCounter@@ Harrisonburgers have donated @@donorCount@@ times and in total given $@@amount@@. </br>Republican Organizations got @@repubPercent@@% of this with $@@repubAmount@@. @@repubCounter@@ have donated @@repubCount@@ times. Democrat organizations recieved @@demoPercentage@@% with a total of $@@demoAmount@@. @@demoCounter@@ have donated @@demoCount@@ times");
        orgs = orgs.replace("@@amount@@", potatoes.toFixed(2));
        orgs = orgs.replace("@@donorCount@@", donorCounters);
        orgs = orgs.replace("@@donationCounter@@", donators.length);
        orgs = orgs.replace("@@repubPercent@@", (repubMoney/potatoes).toFixed(2) * 100);
        orgs = orgs.replace("@@repubAmount@@", repubMoney.toFixed(2));
        orgs = orgs.replace("@@demoPercentage@@", (demoMoney/potatoes).toFixed(2)* 100);
        orgs = orgs.replace("@@demoAmount@@", demoMoney.toFixed(2));
        orgs = orgs.replace("@@demoCount@@", demoCounter);
        orgs = orgs.replace("@@repubCount@@", repubCounter);
        orgs = orgs.replace("@@demoCounter@@", democratPeopleCount);
        orgs = orgs.replace("@@repubCounter@@", republicanPeopleCount);
        


      $("#pigPen").append(orgs);
}



var republicanPeopleCount =0;
var democratPeopleCount =0;

// When someone is a new donator- this guy adds them to a tally of whatever political party- so we can keep track of that...
function politicalPartyChecker(a){

    var compare1= (a[0]);
    var count2;

    for (count2 = 0; count2 < repubOrganizations.length; count2++){
        if (a[0] == repubOrganizations[count2]) {
          republicanPeopleCount++;
        }
    }
    var count2 = 0;
    for (count2 = 0; count2 < demoOrganizations.length; count2++){
        if (a[0] == demoOrganizations[count2]) {
          democratPeopleCount++;
        }
    }
    var count2 = 0;
    for (count2 = 0; count2 < otherDemos.length; count2++){
        if (a[0] == otherDemos[count2]) {
          democratPeopleCount++;
        }
    }
}


    var personCreateToCompileInfo=[];

    var spentPerson = [];


function personCreator(){
    

    var count;
    //we start with the first address... because it pushes the last person and so we have to start at -1.
    var address="156 ABBOTT CIRCLE";
    var spent1 = 0;
    var countingPeopleAsTheyGo = 0;


    for (count=0; count <= locations.length; count++){
      if(typeof locations[count] != 'undefined'){

      if (locations[count][3] == address) {

          spent1 = spent1 + locations[count][7];

      } else {
        personCreateToCompileInfo = personCreateToCompileInfo.concat(locations[count-1]);



          spentPerson = spentPerson.concat([spent1]);

        }
        
        address= locations[count][3];
        spent = locations[count][7];

      }
  }
    alert(personCreateToCompileInfo[1] & " " & personCreateToCompileInfo[2]);
    initMap(personCreateToCompileInfo);
}




var checkValues = function() {
	var value= $("#amount").val();
	if(value === "") {
		alert("Please put something into Amount!")
	} else if (isNaN(value)) {
		alert("Please put a number into Amount!")
	} else {
		getThatLatLng();
	}
}





var getThatLatLng2 = function (a) {

  var address = a[3];
  var totalAddress = address + "%2022801";

    var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" +totalAddress + "&key=AIzaSyAyStvYC97ySEJDh3ow1_LPsdBCDjfrbtI";
    $.ajax(googleUrl).done(function (data) {
        var latitude = data.results[0].geometry.location.lat;
        pushToPerson(latitude);
        var longitude = data.results[0].geometry.location.lng;
        pushToPerson(longitude);
                pushToPerson(address);

        //locations = locations.concat(person);
        document.getElementById("lat").value = latitude;
        document.getElementById("long").value = longitude;

        });
};




function letsGetThatData() {
    var amount = $("#link").val();
    var i;
    var start= 1;
    var message;
    
    for (i = 0; i < amount.length; i++) {
        var hi = amount[i];
        if (hi== "`") {
          start++;
          fixThings(start, message);

          message = "";

        } else {

          message = message + hi;
        }
    };

    var address = $("#address").val();
    var totalAddress = address + "+ harrisonburg + VA";
    getThatLatLng2(totalAddress);

    locations = locations.concat(person);

    sortItForOrder();

}



function changeForm (a, b) {
	//This takes the ID of the form (A) and then puts (B) into it!
	document.getElementById(a).value = b;
}

function lookUpAddress(){

var address = $("#address").val();
var party;

  for (count = 0; count < locations.length; count++) {
    if (locations[count][2] == address ) {
      if (locations[count][0] == "TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE") {
        $("#template").css("background-color", "red");
      } else if (locations[count][0] == "ACTBLUE"){
        $("#template").css("background-color", "blue");  
      }

        

        var template=$("#template").html();

        template = template.replace("@@checkTo@@", locations[count][0]);
        template = template.replace("@@printName@@", locations[count][1]);
        template = template.replace("@@printAddress@@", locations[count][4]);           
        template = template.replace("@@printWork@@", locations[count][5]);
        template = template.replace("@@printOccupation@@", locations[count][6]);
        template = template.replace("@@printAmount@@", locations[count][7]);
        template = template.replace("@@printLink@@", locations[count][8]);

        $("#templateGoesHere").append(template);
    }
  }
}




var organCount = [];

function donatorConfigures(){
var count;
var setThemUp;
for (count = 0; count < locations.length; count++){
  var compare = locations[count][0];
  var count2;
      for (count2 = 0; count2 < organCount.length; count2++) {
        if (compare == organCount[count2]) {
          setThemUp = "pickels";
        }
      }
      if (setThemUp != "pickels") {
        organCount.push(compare);
        methodForRhythm(organCount.length);
      } else {
        setThemUp = "";
      }
    }
}

function methodForRhythm(organs){
  var count;
  // we have to minus 1 because the program is stupid and starts with 0.
  var organs = organs-1;
  //we put all the people donating to a specific organization in this bracket...
  var donators = [];
  
  //potatoes is actually the money counter.
  var potatoes = 0;
  
  //this counts how many times they've gotten a donation.
  var donorCounters = 0;

  //this is a boolean to see if the person has donated.
  var setThemUp;
  for (count = 0; count < locations.length; count++) {
      //checking to see if the donation is going to the right org.
    if (locations[count][0] == organCount[organs] ) {
      //we add the amount of money to potatoes.
      potatoes = potatoes + locations[count][7];
      //increase the amount of donators.
      donorCounters ++; 

      var count2;
      for (count2 = 0; count2 < donators.length; count2++) {
        //this checks if the donation is coming from someone new or a regular.
        if (locations[count][1] == donators[count2]) {
          setThemUp = "pickels";
        }
      }
      if (setThemUp != "pickels") {
        //if it's a new donator- this adds them to the donor pool.
        donators.push(locations[count][1]);
      } else {
        setThemUp = "";
      }

    };
  }

  if (typeof organCount[organs] != "undefined") {
    var orgs=$("#orgs").html();

        orgs = orgs.replace("@@organization@@", organCount[organs]);
        orgs = orgs.replace("@@amount@@", potatoes.toFixed(2));
        orgs = orgs.replace("@@donorCount@@", donorCounters);
        orgs = orgs.replace("@@donationCounter@@", donators.length);

        var a = document.getElementById("markerNum"+ organs);

        orgs = orgs.replace("@@button@@", '<button id="fortyNine" class="btn btn-outline-dark" onclick="lookAtThisSpecificOrg(@@markerNum@@)">More Info?</');


        orgs = orgs.replace("@@markerNum@@", organs);


      $("#orgsGoHere").append(orgs);

  }
}


function lookAtThisSpecificOrg(a){

  var compare = organCount[a];

  var count;
    for (count = 0; count < locations.length; count++){
      if (compare == locations[count][0]) {
          specificInterest= specificInterest.concat([locations[count]]);
          initMap(specificInterest);
    }
}

    var myobj = document.getElementById("orgsGoHere");
    myobj.style.display = "none";

    setThemUp(specificInterest);

}


function setThemUp(a){
var count;

  for (count = 0; count < a.length; count++) {

        var template=$("#template").html();

        template = template.replace("@@checkTo@@", a[count][0]);
        template = template.replace("@@printName@@", a[count][1]);
        template = template.replace("@@printAddress@@", a[count][4]);           
        template = template.replace("@@printWork@@", a[count][5]);
        template = template.replace("@@printOccupation@@", a[count][6]);
        template = template.replace("@@printAmount@@", a[count][7]);
        template = template.replace("@@printLink@@", a[count][8]);

        $("#templateGoesHere").append(template);

    }
  }



var pastaSauce = [];
var chickenPotPie = [];

var getThatBigGuy = function () {

  var count;

  for (count = 0; count <= bigGuy.length; count++){
      if (typeof bigGuy[count] != 'undefined') {

        getThatLatLng2(bigGuy[count]);
      }
    }
  }

function getTheAddress(a) {

  var address = a[3];
        
  var totalAddress = address + "%2022801";

  chickenPotPie.push(address);
        
  var googleUrl = "https://maps.googleapis.com/maps/api/geocode/xml?address=" +totalAddress + "&key=AIzaSyAyStvYC97ySEJDh3ow1_LPsdBCDjfrbtI";

 $.ajax(googleUrl).done(function (data) {
  var latitude = data.results[0].geometry.location.lat;

  var longitude = data.results[0].geometry.location.lng;

  bigBabyCakes(a, longitude, longitude);
  alert(bigBabyCakes);

  });
}


function seeThings(){

  alert(person);
}


function bigBabyCakes(a, b) {

  alert(a);

  // The location we center on.
  var center = {lat: 38.440, lng: -78.836};

var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: center
  });

var infowindow =  new google.maps.InfoWindow({});

var marker, count;



for (count = 0; count < a.length; count++) {
    var count2;
    var markerColor="yellow";

    marker = new google.maps.Marker({
      position: new google.maps.LatLng(a, b),
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/' + markerColor +'-dot.png',
      title: a[count][0] + " $" +  a[count][5]
    });

    google.maps.event.addListener(marker, 'click', (function (marker, count) {
      return function () {
        var nameThings = a[count][0];
        var address= a[count][2];
      //This takes the ID of the form (A) and then puts (B) into it!
      document.getElementById("name").value = nameThings;
      document.getElementById("address").value = address;
      document.getElementById("amount").value = locations[count][5];      


        infowindow.setContent("</br><button id='tinyButton' class='btn btn-outline-dark btn-sm' onclick='lookUpAddress()''>Show Me More</button>");
        infowindow.open(map, marker);

      }
    })(marker, count));
  }
}

function personToFind() {
  //this takes the input from the user to find the person...
    var person = $("#personToFind").val().toUpperCase();
    var whoIsThis;
    var spent = 0;
    var donationTracker =0;

    var count;
    //we start with the first address... because it pushes the last person and so we have to start at -1.
  
    var countingPeopleAsTheyGo = 0;

    for (count=0; count <= locations.length; count++){
      if(typeof locations[count] != 'undefined'){

      if (locations[count][2] == person) {
          spent = spent + locations[count][7];
          donationTracker++;
          whoIsThis= count;
      } else {
        personCreateToCompileInfo = personCreateToCompileInfo.concat(locations[count-1]);
      }

    }
  }

  var donationUnderstanding =[];

  var pickels;

  var message = "People with the last name " + locations[whoIsThis][2] + " have donated $" + spent.toFixed(2) + "</br>";

  if (donationTracker == 1) {
    pickels = "&nbsp; on " + locations[whoIsThis][6] + ", " + locations[whoIsThis][1] +  " donated $" + locations[whoIsThis][7].toFixed(2) + " to " + locations[whoIsThis][0] + ".  <button id='tinyButton' class='btn btn-outline-dark btn-sm' href =" + locations[whoIsThis][8] + "target='_blank' >link</button>";
    donationUnderstanding.push(pickels);

  } else {

    for (var i=0; i < donationTracker; i++){

      pickels = donationUnderstanding & "&nbsp; on " + locations[whoIsThis - i][6] + ", " + locations[whoIsThis - i][1] + " to " + locations[whoIsThis - i][0] + ".  <button id='tinyButton' class='btn btn-outline-dark btn-sm' href =" + locations[whoIsThis - i][8] + "target='_blank' >link</button>";
    donationUnderstanding.push(pickels);

    }

  }

  

 
  document.getElementById("personName").innerHTML = message + donationUnderstanding;

}
































var locations = [
  ["6TH CONGRESSIONAL DISTRICT REPUBLICAN FEDERAL COMMITTEE","6TH CONGRESSIONAL DISTRICT REPUBLICAN COMMITTEE-STATE ACCOUNT","0","156 ABBOTT CIRCLE","0","0","2/3/2020",56.81,"http://docquery.fec.gov/cgi-bin/fecimg/?202004039216580502",38.451965,-78.9191664],
["ACTBLUE","ABOUTABL, NAHLA","ABOUTABL","2050 WILLOW HILL DRIVE","JAMES MADISON UNIVERSITY","PART TIME PROGRAM FACILITATOR","1/2/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200003031",38.426454,-78.8983669],
["ACTBLUE","ABOUTABL, NAHLA","ABOUTABL","2050 WILLOW HILL DRIVE","JAMES MADISON UNIVERSITY","PART TIME PROGRAM FACILITATOR","1/2/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200003030",38.426454,-78.8983669],
["ACTBLUE","ADAMS, GRIFFEN","ADAMS","425 ARROWWOOD DR","JAMES MADISON UNIVERSITY","TUTOR","12/31/2019",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202001299167477652",38.4160327,-78.8449515],
["ACTBLUE","ADERTON, STEPHEN","ADERTON","242 E WATER ST 400","SHENANDOAH UNIVERSITY","VIDEO PRODUCER","2/2/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210234406",38.4480423,-78.8658490999999],
["ACTBLUE","ADERTON, STEPHEN","ADERTON","242 E WATER ST 400","SHENANDOAH UNIVERSITY","VIDEO PRODUCER","2/2/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210234406",38.4480423,-78.8658490999999],
["ACTBLUE","ADKINS, REECE","ADKINS","319 ARROWWOOD DRIVE","JAMES MADISON UNIVERSITY","TEACHING ASSISTANT","2/28/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210234994",38.4151083,-78.8477175],
["ACTBLUE","ADKINS, REECE","ADKINS","319 ARROWWOOD DRIVE","JAMES MADISON UNIVERSITY","TEACHING ASSISTANT","2/28/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210234994",38.4151083,-78.8477175],
["ACTBLUE","AIJAZ, LUBNA","AIJAZ","1043 A LOIS LANE","AMERICAN NATIONAL UNIVERSITY","PROFESSOR","3/12/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228343227",38.4175839,-78.8744011],
["ACTBLUE","AIJAZ, LUBNA","AIJAZ","1043 A LOIS LANE","AMERICAN NATIONAL UNIVERSITY","PROFESSOR","3/12/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228343228",38.4175839,-78.8744011],
["ACTBLUE","AIJAZ, LUBNA","AIJAZ","1043 A LOIS LANE","AMERICAN NATIONAL UNIVERSITY","PROFESSOR","4/12/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209235979380",38.4175839,-78.8744011],
["ACTBLUE","AJIT, SINGH","AJIT","2233 PEARL LN","NOT EMPLOYED","NOT EMPLOYED","5/28/2020",2.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240220781",38.4195722,-78.8504514999999],
["ACTBLUE","AJIT, SINGH","AJIT","2233 PEARL LN","NOT EMPLOYED","NOT EMPLOYED","5/28/2020",2.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240220781",38.4195722,-78.8504514999999],
["ACTBLUE","AKERSON, JAMES","AKERSON","85 MIDDLEBROOK ST","BELDOR MENNONITE CHURCH","PASTOR","2/13/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210243217",38.4291786,-78.8935255999999],
["ACTBLUE","AKERSON, JAMES","AKERSON","85 MIDDLEBROOK ST","BELDOR MENNONITE CHURCH","PASTOR","2/8/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210243216",38.4291786,-78.8935255999999],
["ACTBLUE","AKERSON, JAMES","AKERSON","85 MIDDLEBROOK ST","BELDOR MENNONITE CHURCH","PASTOR","2/8/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210243216",38.4291786,-78.8935255999999],
["ACTBLUE","AKERSON, JAMES","AKERSON","85 MIDDLEBROOK ST","BELDOR MENNONITE CHURCH","PASTOR","3/7/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228344436",38.4291786,-78.8935255999999],
["ACTBLUE","AL BARZANJI, FERWERDIN","AL BARZANJI","849 CAMELOT LN","BRAHEC","INTERPRETER","6/12/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255260880",38.41867800000001,-78.856809],
["ACTBLUE","ALEMAN, MELISSA","ALEMAN","457 MYERS AVE","JAMES MADISON UNIVERSITY","PROFESSOR","1/15/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200020219",38.4422289,-78.86319],
["ACTBLUE","ALEMAN, MELISSA","ALEMAN","457 MYERS AVE","JAMES MADISON UNIVERSITY","PROFESSOR","1/15/2020",2.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200020219",38.4422289,-78.86319],
["ACTBLUE","ALEMAN, MELISSA","ALEMAN","457 MYERS AVE","JAMES MADISON UNIVERSITY","PROFESSOR","2/19/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210250229",38.4422289,-78.86319],
["ACTBLUE","ALEMAN, MELISSA","ALEMAN","457 MYERS AVE","JAMES MADISON UNIVERSITY","PROFESSOR","2/29/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210250230",38.4422289,-78.86319],
["ACTBLUE","ALGER, ELEANOR","ALGER","916 OAK HILL DRIVE","NOT EMPLOYED","NOT EMPLOYED","12/31/2019",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202001299167542729",38.426873,-78.8700915],
["ACTBLUE","ALGER, ELEANOR","ALGER","916 OAK HILL DRIVE","NOT EMPLOYED","NOT EMPLOYED","1/31/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200022555",38.426873,-78.8700915],
["ACTBLUE","ALGER, ELEANOR","ALGER","916 OAK HILL DRIVE","NOT EMPLOYED","NOT EMPLOYED","2/29/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210253881",38.426873,-78.8700915],
["ACTBLUE","ALT, DICK","ALT","1790 DEALTON AVE","FASTENAL","MANAGER","1/25/2020",20,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200029967",38.4255176,-78.8868711],
["ACTBLUE","ALTMAN, HANNAH","ALTMAN","3831 TRAVELER RD","MASSANETTA SPRINGS","PROGRAM DIRECTOR","2/16/2020",20.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210266240",38.3816249,-78.8452318],
["ACTBLUE","ALTMAN, HANNAH","ALTMAN","3831 TRAVELER RD","MASSANETTA SPRINGS","PROGRAM DIRECTOR","1/14/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200030485",38.3816249,-78.8452318],
["ACTBLUE","ALTMAN, HANNAH","ALTMAN","3831 TRAVELER RD","MASSANETTA SPRINGS","PROGRAM DIRECTOR","2/26/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210266241",38.3816249,-78.8452318],
["ACTBLUE","ALTMAN, HANNAH","ALTMAN","3831 TRAVELER RD","MASSANETTA SPRINGS","PROGRAM DIRECTOR","2/21/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210266240",38.3816249,-78.8452318],
["ACTBLUE","ALTMAN, HANNAH","ALTMAN","3831 TRAVELER RD","MASSANETTA SPRINGS","PROGRAM DIRECTOR","2/24/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210266241",38.3816249,-78.8452318],
["ACTBLUE","ALTMAN, HANNAH","ALTMAN","3831 TRAVELER RD","MASSANETTA SPRINGS","PROGRAM DIRECTOR","2/13/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210266239",38.3816249,-78.8452318],
["ACTBLUE","ALTMAN, HANNAH","ALTMAN","3831 TRAVELER RD","MASSANETTA SPRINGS","PROGRAM DIRECTOR","2/29/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210266242",38.3816249,-78.8452318],
["ACTBLUE","ALTMAN, HANNAH","ALTMAN","3831 TRAVELER RD","MASSANETTA SPRINGS","PROGRAM DIRECTOR","2/28/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210266242",38.3816249,-78.8452318],
["ACTBLUE","ALTMAN, HANNAH","ALTMAN","3831 TRAVELER RD","MASSANETTA SPRINGS","PROGRAM DIRECTOR","2/25/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210266241",38.3816249,-78.8452318],
["ACTBLUE","ALTMAN, HANNAH","ALTMAN","3831 TRAVELER RD","MASSANETTA SPRINGS","PROGRAM DIRECTOR","3/1/2020",6,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228360968",38.3816249,-78.8452318],
["ACTBLUE","ALTMAN, HANNAH","ALTMAN","3831 TRAVELER RD","MASSANETTA SPRINGS","PROGRAM DIRECTOR","3/1/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228360968",38.3816249,-78.8452318],
["ACTBLUE","AMADOR, OLGA","AMADOR","1141 DEVON LANE APT G","NOT EMPLOYED","NOT EMPLOYED","3/3/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228362998",38.4241818,-78.8672067],
["ACTBLUE","AMADOR, OLGA","AMADOR","1141 DEVON LANE APT G","NOT EMPLOYED","NOT EMPLOYED","3/3/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228362998",38.4241818,-78.8672067],
["ACTBLUE","AMBLER, ALAINA","AMBLER","2242 POWDERHORN PLACE","STARBUCKS","BARISTA","5/30/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240237782",38.4115757,-78.8666705999999],
["ACTBLUE","AMBLER, ALAINA","AMBLER","2242 POWDERHORN PLACE","STARBUCKS","BARISTA","6/13/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255282550",38.4115757,-78.8666705999999],
["INTERNATIONAL WAREHOUSE LOGISTICS ASSOCIATION PAC","ANDERS, DEVON","ANDERS","1346 PLEASANTS DRIVE, SUITE 6","INTERCHANGE GROUP, INC.","PRESIDENT","1/2/2020",2500,"http://docquery.fec.gov/cgi-bin/fecimg/?202004039216583692",38.3877268,-78.9046999999999],
["ACTBLUE","ANDERSON, JOAN","ANDERSON","408 OTT ST","ROCKTOWN FAMILY DENTAL CARE","DENTIST","12/31/2019",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202001299167612115",38.4443001,-78.8644726],
["ACTBLUE","ANDERSON, JOAN","ANDERSON","408 OTT ST","ROCKTOWN FAMILY DENTAL CARE","DENTIST","12/31/2019",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202001299167612116",38.4443001,-78.8644726],
["ACTBLUE","ANDERSON, JOAN","ANDERSON","408 OTT ST","ROCKTOWN FAMILY DENTAL CARE","DENTIST","1/18/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200038580",38.4443001,-78.8644726],
["ACTBLUE","ANDERSON, JOAN","ANDERSON","408 OTT ST","ROCKTOWN FAMILY DENTAL CARE","DENTIST","1/18/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200038580",38.4443001,-78.8644726],
["ACTBLUE","ANDERSON, JOAN","ANDERSON","408 OTT ST","ROCKTOWN FAMILY DENTAL CARE","DENTIST","1/14/2020",28,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200038579",38.4443001,-78.8644726],
["ACTBLUE","ANDERSON, JOAN","ANDERSON","408 OTT ST","ROCKTOWN FAMILY DENTAL CARE","DENTIST","2/19/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210279230",38.4443001,-78.8644726],
["ACTBLUE","ANDERSON, JOAN","ANDERSON","408 OTT ST","ROCKTOWN FAMILY DENTAL CARE","DENTIST","2/7/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210279224",38.4443001,-78.8644726],
["ACTBLUE","ANDERSON, JOAN","ANDERSON","408 OTT ST","ROCKTOWN FAMILY DENTAL CARE","DENTIST","2/19/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210279230",38.4443001,-78.8644726],
["ACTBLUE","ANDERSON, JOAN","ANDERSON","408 OTT ST","ROCKTOWN FAMILY DENTAL CARE","DENTIST","2/11/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210279226",38.4443001,-78.8644726],
["ACTBLUE","ANDERSON, JOAN","ANDERSON","408 OTT ST","ROCKTOWN FAMILY DENTAL CARE","DENTIST","2/7/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210279224",38.4443001,-78.8644726],
["ACTBLUE","ANDERSON, JOAN","ANDERSON","408 OTT ST","ROCKTOWN FAMILY DENTAL CARE","DENTIST","2/11/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210279226",38.4443001,-78.8644726],
["ACTBLUE","ANDERSON, JOAN","ANDERSON","408 OTT ST","ROCKTOWN FAMILY DENTAL CARE","DENTIST","2/25/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210279232",38.4443001,-78.8644726],
["ACTBLUE","ANDERSON, JOAN","ANDERSON","408 OTT ST","ROCKTOWN FAMILY DENTAL CARE","DENTIST","2/25/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210279232",38.4443001,-78.8644726],
["ACTBLUE","ANDERSON, JOAN","ANDERSON","408 OTT ST","ROCKTOWN FAMILY DENTAL CARE","DENTIST","2/27/2020",28,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210279234",38.4443001,-78.8644726],
["ACTBLUE","ANDERSON, JOAN","ANDERSON","408 OTT ST","ROCKTOWN FAMILY DENTAL CARE","DENTIST","3/4/2020",28,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228370403",38.4443001,-78.8644726],
["ACTBLUE","ANDES, REBECCA","ANDES","2890 CRYSTAL SPRING LANE","FRIENDLY CITY FOOD CO-OP","DEPARTMENT BUYER","2/4/2020",7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210284137",38.398746,-78.85033],
["ACTBLUE","ANDES, REBECCA","ANDES","2890 CRYSTAL SPRING LANE","FRIENDLY CITY FOOD CO-OP","DEPARTMENT BUYER","1/26/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200041761",38.398746,-78.85033],
["ACTBLUE","ANDES, REBECCA","ANDES","2890 CRYSTAL SPRING LANE","FRIENDLY CITY FOOD CO-OP","DEPARTMENT BUYER","2/26/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210284137",38.398746,-78.85033],
["DONALD J. TRUMP FOR PRESIDENT, INC.","ARBOGAST, TERRY MARK MR","ARBOGAST","52 EASTHAMPTON CT","INFORMATION REQUESTED PER BEST EFFORTS","INFORMATION REQUESTED PER BEST EFFORTS","4/23/2020",18.75,"http://docquery.fec.gov/cgi-bin/fecimg/?202008209266277140",38.4330656,-78.8867274],
["DONALD J. TRUMP FOR PRESIDENT, INC.","ARBOGAST, TERRY MARK","ARBOGAST","52 EASTHAMPTON CT","INFORMATION REQUESTED PER BEST EFFORTS","INFORMATION REQUESTED PER BEST EFFORTS","2/28/2020",37.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007279260859887",38.4330656,-78.8867274],
["ACTBLUE","ARMANTAGE, ARLEEN","ARMANTAGE","134-D COLONIAL DRIVE","SELF","ENTREPRENEUR","2/13/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210300150",38.4314511,-78.8967246],
["ACTBLUE","ARMANTAGE, ARLEEN","ARMANTAGE","134-D COLONIAL DRIVE","SELF","ENTREPRENEUR","2/13/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210300150",38.4314511,-78.8967246],
["ACTBLUE","ARMENTROUT, DEBORAH","ARMENTROUT","835 ELMWOOD DR","THE ARC OF HARRISONBURG AND ROCKINGHAM","TEACHER","5/26/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240257189",38.4449955,-78.8867827],
["BERNIE 2020","ARMSTRONG, DONNA","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","1/3/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202002209186621971",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","1/3/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200052697",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","1/31/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200052699",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","1/3/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200052698",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","1/31/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200052699",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","1/23/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200052698",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","1/23/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200052698",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","2/8/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210301820",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","2/28/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210301823",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","2/17/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210301822",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","2/28/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210301823",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","2/17/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210301821",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","2/21/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210301822",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","2/8/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210301820",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","2/21/2020",5.4,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210301822",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","2/10/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210301821",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","2/10/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210301821",38.4449955,-78.8867827],
["BERNIE 2020","ARMSTRONG, DONNA","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","3/12/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202004209219773659",38.4449955,-78.8867827],
["BERNIE 2020","ARMSTRONG, DONNA","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","3/2/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202004209219773656",38.4449955,-78.8867827],
["BERNIE 2020","ARMSTRONG, DONNA","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","3/6/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202004209219773658",38.4449955,-78.8867827],
["BERNIE 2020","ARMSTRONG, DONNA","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","3/10/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202004209219773658",38.4449955,-78.8867827],
["BERNIE 2020","ARMSTRONG, DONNA","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","3/4/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202004209219773657",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","3/2/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228386345",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","3/2/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228386345",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","3/10/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228386346",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","3/4/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228386346",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","3/12/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228386347",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","3/12/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228386347",38.4449955,-78.8867827],
["ACTBLUE","ARMSTRONG, DONNA L.","ARMSTRONG","1420 CRAWFORD AVE","NOT EMPLOYED","NOT EMPLOYED","3/6/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228386346",38.4449955,-78.8867827],
["DCCC","ARTHUR, RODNEY","ARTHUR","451 QUEEN ANNE CT","HMA","PHYSICIANSELF","12/31/2019",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202003039203691319",38.4355021,-78.9006438],
["ACTBLUE","ARTHUR, THOMAS","ARTHUR","298 CAMPBELL","NOT EMPLOYED","NOT EMPLOYED","2/29/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210307862",38.4449471,-78.8648706],
["ACTBLUE","ATKINS, BEN","ATKINS","1201 KING EDWARDS WAY","DANONE","HR","2/9/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210313835",38.4128625,-78.8711064],
["ACTBLUE","ATKINS, BEN","ATKINS","1201 KING EDWARDS WAY","DANONE","HR","3/2/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228395040",38.4128625,-78.8711064],
["ACTBLUE","AYERS, BONNIE","AYERS","250 FRANKLIN STREET","NOT EMPLOYED","NOT EMPLOYED","6/25/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255327495",38.4464949,-78.8661973999999],
["ACTBLUE","BABAEV, RAKHMATILLO","BABAEV","351 NORTH MASON 412","NOT EMPLOYED","NOT EMPLOYED","1/27/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200067759",38.4524108,-78.8663079999999],
["ACTBLUE","BAKA, MATTHEW","BAKA","1908 B SUNCHASE DRIVE","NOT EMPLOYED","NOT EMPLOYED","2/22/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210336722",38.4245186,-78.8587551999999],
["ACTBLUE","BAKER, JERON","BAKER","558 E MARKET ST","UNIVERSITY OF VIRGINIA","COLLEGE ACCESS","2/21/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210338480",38.4490143,-78.8590323999999],
["ACTBLUE","BAKER, JERON","BAKER","558 E MARKET ST","UNIVERSITY OF VIRGINIA","COLLEGE ACCESS","2/21/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210338480",38.4490143,-78.8590323999999],
["ACTBLUE","BAKER, JERON","BAKER","558 E MARKET ST","UNIVERSITY OF VIRGINIA","COLLEGE ACCESS","5/18/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240280741",38.4490143,-78.8590323999999],
["ACTBLUE","BAKER, JERON","BAKER","558 E MARKET ST","UNIVERSITY OF VIRGINIA","COLLEGE ACCESS","5/18/2020",5.4,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240280741",38.4490143,-78.8590323999999],
["ACTBLUE","BALLER, STEPHANIE","BALLER","360 SUNRISE AVE","JMU","PROFESSOR","6/5/2020",20.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255346918",38.4424979,-78.8852823],
["ACTBLUE","BALLER, STEPHANIE","BALLER","360 SUNRISE AVE","JMU","PROFESSOR","6/12/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255346918",38.4424979,-78.8852823],
["ACTBLUE","BALLER, STEPHANIE","BALLER","360 SUNRISE AVE","JMU","PROFESSOR","6/5/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255346918",38.4424979,-78.8852823],
["ACTBLUE","BANGE, LISA","BANGE","1157 SPRINGFIELD DR","CROSSROADS","TDT","6/5/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255350382",38.415005,-78.8610449],
["ACTBLUE","BANGLEY, BEN","BANGLEY","236 H ROCCO AVE","PHILIP CARTER WINERY","GENERAL MANAGER","2/19/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210349297",38.425507,-78.884042],
["ACTBLUE","BANGLEY, BEN","BANGLEY","236 H ROCCO AVE","PHILIP CARTER WINERY","GENERAL MANAGER","2/25/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210349298",38.425507,-78.884042],
["ACTBLUE","BANGLEY, BEN","BANGLEY","236 H ROCCO AVE","PHILIP CARTER WINERY","GENERAL MANAGER","2/19/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210349297",38.425507,-78.884042],
["ACTBLUE","BANGLEY, BEN","BANGLEY","236 H ROCCO AVE","PHILIP CARTER WINERY","GENERAL MANAGER","2/25/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210349298",38.425507,-78.884042],
["ACTBLUE","BANGLEY, BEN","BANGLEY","236 H ROCCO AVE","PHILIP CARTER WINERY","GENERAL MANAGER","2/25/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210349298",38.425507,-78.884042],
["ACTBLUE","BANGLEY, BEN","BANGLEY","236 H ROCCO AVE","PHILIP CARTER WINERY","GENERAL MANAGER","3/7/2020",2,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228420921",38.425507,-78.884042],
["ACTBLUE","BANGLEY, BEN","BANGLEY","236 H ROCCO AVE","PHILIP CARTER WINERY","GENERAL MANAGER","3/1/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228420920",38.425507,-78.884042],
["ACTBLUE","BANGLEY, BEN","BANGLEY","236 H ROCCO AVE","PHILIP CARTER WINERY","GENERAL MANAGER","3/15/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228420921",38.425507,-78.884042],
["ACTBLUE","BANGLEY, BEN","BANGLEY","236 H ROCCO AVE","PHILIP CARTER WINERY","GENERAL MANAGER","3/1/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228420920",38.425507,-78.884042],
["ACTBLUE","BANGLEY, BEN","BANGLEY","236 H ROCCO AVE","PHILIP CARTER WINERY","GENERAL MANAGER","3/7/2020",20,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228420920",38.425507,-78.884042],
["ACTBLUE","BANGLEY, BEN","BANGLEY","236 H ROCCO AVE","PHILIP CARTER WINERY","GENERAL MANAGER","3/15/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228420921",38.425507,-78.884042],
["ACTBLUE","BANGLEY, BEN","BANGLEY","236 H ROCCO AVE","PHILIP CARTER WINERY","GENERAL MANAGER","4/20/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236041731",38.425507,-78.884042],
["ACTBLUE","BANGLEY, BEN","BANGLEY","236 H ROCCO AVE","PHILIP CARTER WINERY","GENERAL MANAGER","4/20/2020",6.75,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236041732",38.425507,-78.884042],
["ACTBLUE","BANGLEY, BEN","BANGLEY","236 H ROCCO AVE","PHILIP CARTER WINERY","GENERAL MANAGER","4/20/2020",6.75,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236041733",38.425507,-78.884042],
["ACTBLUE","BANGLEY, BEN","BANGLEY","236 H ROCCO AVE","PHILIP CARTER WINERY","GENERAL MANAGER","4/20/2020",6.75,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236041732",38.425507,-78.884042],
["ACTBLUE","BANGLEY, BEN","BANGLEY","236 H ROCCO AVE","PHILIP CARTER WINERY","GENERAL MANAGER","4/20/2020",6.75,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236041732",38.425507,-78.884042],
["ACTBLUE","BANKS, HEATHER","BANKS","2059 ROSEDALE COURT","NOT EMPLOYED","NOT EMPLOYED","5/5/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240288849",38.4111805,-78.8614982],
["WIN THE ERA PAC","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","2/27/2020",20.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204563757",38.4348176,-78.8794667],
["WIN THE ERA PAC","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","2/26/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204589003",38.4348176,-78.8794667],
["WIN THE ERA PAC","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","2/12/2020",20.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204562035",38.4348176,-78.8794667],
["WIN THE ERA PAC","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","2/21/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204593980",38.4348176,-78.8794667],
["ACTBLUE","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","1/6/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200086657",38.4348176,-78.8794667],
["ACTBLUE","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","1/31/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200086657",38.4348176,-78.8794667],
["ACTBLUE","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","1/31/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200086657",38.4348176,-78.8794667],
["ACTBLUE","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","1/31/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200086658",38.4348176,-78.8794667],
["ACTBLUE","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","2/12/2020",20.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210354869",38.4348176,-78.8794667],
["ACTBLUE","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","2/8/2020",20.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210354868",38.4348176,-78.8794667],
["ACTBLUE","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","2/12/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210354869",38.4348176,-78.8794667],
["ACTBLUE","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","2/21/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210354869",38.4348176,-78.8794667],
["ACTBLUE","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","2/27/2020",20.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210354870",38.4348176,-78.8794667],
["ACTBLUE","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","2/6/2020",20.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210354868",38.4348176,-78.8794667],
["ACTBLUE","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","2/26/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210354870",38.4348176,-78.8794667],
["BIDEN FOR PRESIDENT","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","7/10/2020",60,"http://docquery.fec.gov/cgi-bin/fecimg/?202008209266454718",38.4348176,-78.8794667],
["ACTBLUE","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","3/15/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228424905",38.4348176,-78.8794667],
["ACTBLUE","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","3/11/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228424904",38.4348176,-78.8794667],
["ACTBLUE","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","4/23/2020",13,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236044859",38.4348176,-78.8794667],
["BIDEN FOR PRESIDENT","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","6/25/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260505144",38.4348176,-78.8794667],
["BIDEN FOR PRESIDENT","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","6/12/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260505144",38.4348176,-78.8794667],
["ACTBLUE","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","6/25/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255355398",38.4348176,-78.8794667],
["ACTBLUE","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","6/12/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255355398",38.4348176,-78.8794667],
["ACTBLUE","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","6/1/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255355398",38.4348176,-78.8794667],
["ACTBLUE","BARDARIK, MICHAEL","BARDARIK","25 PORT REPUBLIC RD","MC DEAN","ENGINEER","6/1/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255355398",38.4348176,-78.8794667],
["ACTBLUE","BARLOW, MARTHA","BARLOW","1860 GLANZER COURT","NOT EMPLOYED","NOT EMPLOYED","1/24/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200088838",38.4520076,-78.9051532],
["ACTBLUE","BARLOW, MARTHA","BARLOW","1860 GLANZER COURT","NOT EMPLOYED","NOT EMPLOYED","4/8/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236046713",38.4520076,-78.9051532],
["ACTBLUE","BARLOW, MARTHA","BARLOW","1860 GLANZER COURT","NOT EMPLOYED","NOT EMPLOYED","4/8/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236046713",38.4520076,-78.9051532],
["ACTBLUE","BARRAGHI, PARVIZ","BARRAGHI","1150 HILLCREST DR","ASRC FEDERAL","PRODUCT MANAGER","6/19/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255363404",38.4348942,-78.8764573999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","1/2/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200097363",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","1/14/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200097363",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","2/16/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210371528",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","2/1/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210371526",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","2/19/2020",2.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210371529",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","2/16/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210371528",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","2/1/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210371527",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","2/19/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210371529",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","3/15/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228437035",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228437034",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","3/15/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228437034",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","3/15/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228437034",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","4/30/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236054988",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","5/24/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240302316",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","5/31/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240302317",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","5/29/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240302317",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","5/24/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240302317",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","5/21/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240302316",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","6/13/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255369707",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","6/1/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255369703",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","6/13/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255369707",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","6/24/2020",38,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255369708",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","6/11/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255369706",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","6/11/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255369707",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","6/1/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255369704",38.3972805,-78.8521765999999],
["ACTBLUE","BARTON, JANICE","BARTON","2900 BARRINGTON DR","NONE","NONE","6/11/2020",1.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255369706",38.3972805,-78.8521765999999],
["ACTBLUE","BARTRAM, LOU G","BARTRAM","3390 MANNHEIM CT","NOT EMPLOYED","NOT EMPLOYED","4/19/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236055339",38.380956,-78.842469],
["ACTBLUE","BARTRAM, LOU G","BARTRAM","3390 MANNHEIM CT","NOT EMPLOYED","NOT EMPLOYED","3/27/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228437479",38.380956,-78.842469],
["ACTBLUE","BARTRAM, LOU G","BARTRAM","3390 MANNHEIM CT","NOT EMPLOYED","NOT EMPLOYED","4/14/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236055338",38.380956,-78.842469],
["ACTBLUE","BARTRAM, LOU G","BARTRAM","3390 MANNHEIM CT","NOT EMPLOYED","NOT EMPLOYED","4/19/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236055339",38.380956,-78.842469],
["ACTBLUE","BARTRAM, LOU G","BARTRAM","3390 MANNHEIM CT","NOT EMPLOYED","NOT EMPLOYED","5/11/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240302691",38.380956,-78.842469],
["ACTBLUE","BARTRAM, LOU G","BARTRAM","3390 MANNHEIM CT","NOT EMPLOYED","NOT EMPLOYED","5/13/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240302691",38.380956,-78.842469],
["ACTBLUE","BARTRAM, LOU G","BARTRAM","3390 MANNHEIM CT","NOT EMPLOYED","NOT EMPLOYED","6/18/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255370243",38.380956,-78.842469],
["ACTBLUE","BARTRAM, LOU G","BARTRAM","3390 MANNHEIM CT","NOT EMPLOYED","NOT EMPLOYED","6/19/2020",2,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255370243",38.380956,-78.842469],
["ACTBLUE","BARTRAM, LOU G","BARTRAM","3390 MANNHEIM CT","NOT EMPLOYED","NOT EMPLOYED","6/25/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255370243",38.380956,-78.842469],
["ACTBLUE","BARTRAM, LOU G","BARTRAM","3390 MANNHEIM CT","NOT EMPLOYED","NOT EMPLOYED","6/5/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255370241",38.380956,-78.842469],
["ACTBLUE","BARTRAM, LOU G","BARTRAM","3390 MANNHEIM CT","NOT EMPLOYED","NOT EMPLOYED","6/12/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255370242",38.380956,-78.842469],
["ACTBLUE","BARTRAM, LOU G","BARTRAM","3390 MANNHEIM CT","NOT EMPLOYED","NOT EMPLOYED","6/16/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255370242",38.380956,-78.842469],
["ACTBLUE","BARTRAM, LOU G","BARTRAM","3390 MANNHEIM CT","NOT EMPLOYED","NOT EMPLOYED","6/14/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255370242",38.380956,-78.842469],
["ACTBLUE","BARTRAM, LOU G","BARTRAM","3390 MANNHEIM CT","NOT EMPLOYED","NOT EMPLOYED","6/1/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255370240",38.380956,-78.842469],
["ACTBLUE","BARTRAM, LOU G","BARTRAM","3390 MANNHEIM CT","NOT EMPLOYED","NOT EMPLOYED","6/3/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255370241",38.380956,-78.842469],
["ACTBLUE","BARTRAM, LOU G","BARTRAM","3390 MANNHEIM CT","NOT EMPLOYED","NOT EMPLOYED","6/7/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255370241",38.380956,-78.842469],
["WINRED","BATES, DORIS","BATES","148 CHESTNUT RIDGE DR","RETIRED","RETIRED","1/17/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217091743",38.4183676,-78.8425516],
["ACTBLUE","BAUER, SARAH","BAUER","95 SHARON STREET","LANCOME COSMETICS","COUNTER MANAGER/BEAUTY ADVISOR","1/31/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200102192",38.4303967,-78.8935255999999],
["ACTBLUE","BAUER, SARAH","BAUER","95 SHARON STREET","LANCOME COSMETICS","COUNTER MANAGER/BEAUTY ADVISOR","2/18/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210379333",38.4303967,-78.8935255999999],
["ACTBLUE","BAUER, SARAH","BAUER","95 SHARON STREET","LANCOME COSMETICS","COUNTER MANAGER/BEAUTY ADVISOR","3/15/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228442621",38.4303967,-78.8935255999999],
["ACTBLUE","BAUER, SARAH","BAUER","95 SHARON STREET","LANCOME COSMETICS","COUNTER MANAGER/BEAUTY ADVISOR","3/9/2020",22,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228442619",38.4303967,-78.8935255999999],
["ACTBLUE","BAUGH, CATHY","BAUGH","79 HOPE STREET","NOT EMPLOYED","NOT EMPLOYED","3/3/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228442766",38.4321138,-78.8902537],
["ACTBLUE","BEBEL, MAGGIE","BEBEL","148 W WOLFE STREET UPSTAIRS","THE GAINES GROUP ARCHITECTS","INTERIOR DESIGNER","1/17/2020",28,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200108495",38.4519475,-78.8709911],
["ACTBLUE","BEBEL, MAGGIE","BEBEL","148 W WOLFE STREET UPSTAIRS","THE GAINES GROUP ARCHITECTS","INTERIOR DESIGNER","1/17/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200108495",38.4519475,-78.8709911],
["ACTBLUE","BEBEL, MAGGIE","BEBEL","148 W WOLFE STREET UPSTAIRS","THE GAINES GROUP ARCHITECTS","INTERIOR DESIGNER","2/7/2020",28,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210389249",38.4519475,-78.8709911],
["ACTBLUE","BEBEL, MAGGIE","BEBEL","148 W WOLFE STREET UPSTAIRS","THE GAINES GROUP ARCHITECTS","INTERIOR DESIGNER","2/21/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210389250",38.4519475,-78.8709911],
["ACTBLUE","BEITZEL, BENJAMIN","BEITZEL","3410 HUNTINGTON SPRINGS DRIVE","UVA HEALTH","DIRECTOR OF TRANSPLANT","2/15/2020",20.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210398527",38.3799329,-78.8705978],
["ACTBLUE","BELL, JOANNE","BELL","1181 VISTA GLEN DRIVE UNIT 3","NOT EMPLOYED","NOT EMPLOYED","3/26/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228458127",38.3935,-78.8331082],
["ACTBLUE","BELL, RACHEL","BELL","79 SHARON STREET","SUPPLEMENTAL HEALTHCARE","REGISTERED NURSE","3/6/2020",0.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228458730",38.4296735,-78.8923318],
["ACTBLUE","BELL, JOANNE","BELL","1181 VISTA GLEN DRIVE UNIT 3","NOT EMPLOYED","NOT EMPLOYED","3/26/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228458127",38.3935,-78.8331082],
["ACTBLUE","BELL, RACHEL","BELL","79 SHARON STREET","SUPPLEMENTAL HEALTHCARE","REGISTERED NURSE","3/6/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228458729",38.4296735,-78.8923318],
["ACTBLUE","BELL, JOANNE","BELL","1181 VISTA GLEN DRIVE UNIT 3","NOT EMPLOYED","NOT EMPLOYED","3/26/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228458127",38.3935,-78.8331082],
["ACTBLUE","BELL, RACHEL","BELL","79 SHARON STREET","SUPPLEMENTAL HEALTHCARE","REGISTERED NURSE","4/29/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236072660",38.4296735,-78.8923318],
["ACTBLUE","BELL, RACHEL","BELL","79 SHARON STREET","SUPPLEMENTAL HEALTHCARE","REGISTERED NURSE","4/29/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236072660",38.4296735,-78.8923318],
["ACTBLUE","BELL, RACHEL","BELL","79 SHARON STREET","SUPPLEMENTAL HEALTHCARE","REGISTERED NURSE","4/29/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236072661",38.4296735,-78.8923318],
["ACTBLUE","BELL, RACHEL","BELL","79 SHARON STREET","SUPPLEMENTAL HEALTHCARE","REGISTERED NURSE","4/29/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236072661",38.4296735,-78.8923318],
["ACTBLUE","BENJAMIN, LUCIANO","BENJAMIN","1924 SUNCHASE DR A1 UNIT A1","NOT EMPLOYED","NOT EMPLOYED","1/11/2020",4,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200120555",38.4240705,-78.858487],
["ACTBLUE","BENJAMIN, LUCIANO","BENJAMIN","1924 SUNCHASE DR A1 UNIT A1","NOT EMPLOYED","NOT EMPLOYED","1/19/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200120555",38.4240705,-78.858487],
["ACTBLUE","BENJAMIN, LUCIANO","BENJAMIN","1924 SUNCHASE DR A1 UNIT A1","NOT EMPLOYED","NOT EMPLOYED","1/11/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200120555",38.4240705,-78.858487],
["ACTBLUE","BENJAMIN, LUCIANO","BENJAMIN","1924 SUNCHASE DR A1 UNIT A1","NOT EMPLOYED","NOT EMPLOYED","2/11/2020",4,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210408595",38.4240705,-78.858487],
["ACTBLUE","BENNETT, SCOTT","BENNETT","4901 CROWE DRIVE","VALLEY ENGINEERING","ELECTRICAL ENGINEER","5/1/2020",0.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240327392",38.3813706,-78.9138246999999],
["ACTBLUE","BENNETT, SCOTT","BENNETT","4901 CROWE DRIVE","VALLEY ENGINEERING","ELECTRICAL ENGINEER","5/1/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240327393",38.3813706,-78.9138246999999],
["ACTBLUE","BERG, ERIC","BERG","1671 ALLISON WAY UNIT 2","ALLCOM GLOBAL SERVICES, INC.","GOV'T. CONTRACTING","2/7/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210415998",38.3981575,-78.8515393],
["AMY MCGRATH FOR SENATE, INC.","BERNSTEIN, DAVID","BERNSTEIN","521 OTT STREET","JAMES MADISON UNIVERSITY","PROFESSOR","2/12/2020",250,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159219579969",38.4421942,-78.8666397],
["AMY FOR AMERICA","BERNSTEIN, DAVID","BERNSTEIN","521 OTT ST","JAMES MADISON UNIVERSITY","PROFESSOR","2/12/2020",250,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159249935707",38.4421942,-78.8666397],
["ACTBLUE","BERSHTEIN, STUART","BERSHTEIN","2939 TAYLOR SPRING LN","NOT EMPLOYED","NOT EMPLOYED","12/31/2019",3.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202001299168026136",38.397968,-78.8499559999999],
["ACTBLUE","BERSHTEIN, STUART","BERSHTEIN","2939 TAYLOR SPRING LN","NOT EMPLOYED","NOT EMPLOYED","12/31/2019",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202001299168026136",38.397968,-78.8499559999999],
["ACTBLUE","BERSHTEIN, STUART","BERSHTEIN","2939 TAYLOR SPRING LN","NOT EMPLOYED","NOT EMPLOYED","1/31/2020",28,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200132030",38.397968,-78.8499559999999],
["ACTBLUE","BERSHTEIN, STUART","BERSHTEIN","2939 TAYLOR SPRING LN","NOT EMPLOYED","NOT EMPLOYED","1/26/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200132030",38.397968,-78.8499559999999],
["ACTBLUE","BERSHTEIN, STUART","BERSHTEIN","2939 TAYLOR SPRING LN","NOT EMPLOYED","NOT EMPLOYED","1/26/2020",3.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200132029",38.397968,-78.8499559999999],
["ACTBLUE","BERSHTEIN, STUART","BERSHTEIN","2939 TAYLOR SPRING LN","NOT EMPLOYED","NOT EMPLOYED","2/19/2020",28,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210426719",38.397968,-78.8499559999999],
["ACTBLUE","BERSHTEIN, STUART","BERSHTEIN","2939 TAYLOR SPRING LN","NOT EMPLOYED","NOT EMPLOYED","2/19/2020",2.8,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210426719",38.397968,-78.8499559999999],
["ACTBLUE","BERSHTEIN, STUART","BERSHTEIN","2939 TAYLOR SPRING LN","NOT EMPLOYED","NOT EMPLOYED","2/9/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210426718",38.397968,-78.8499559999999],
["ACTBLUE","BERSHTEIN, STUART","BERSHTEIN","2939 TAYLOR SPRING LN","NOT EMPLOYED","NOT EMPLOYED","4/2/2020",20,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236087533",38.397968,-78.8499559999999],
["ACTBLUE","BERST, EMILY","BERST","889 PORT REPUBLIC RD APT D","ARAMARK","SERVER","1/27/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200132073",38.4217026,-78.8722762],
["WIN THE ERA PAC","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF-EMPLOYED","ARTIST","2/5/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204592085",38.4410251,-78.861642],
["WIN THE ERA PAC","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF-EMPLOYED","ARTIST","2/25/2020",20.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204612938",38.4410251,-78.861642],
["WIN THE ERA PAC","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF-EMPLOYED","ARTIST","2/10/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204543092",38.4410251,-78.861642],
["WIN THE ERA PAC","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF-EMPLOYED","ARTIST","2/22/2020",20.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204515841",38.4410251,-78.861642],
["WIN THE ERA PAC","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF-EMPLOYED","ARTIST","2/3/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204600546",38.4410251,-78.861642],
["WIN THE ERA PAC","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF-EMPLOYED","ARTIST","2/15/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204532669",38.4410251,-78.861642],
["WIN THE ERA PAC","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF-EMPLOYED","ARTIST","2/1/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204569761",38.4410251,-78.861642],
["WIN THE ERA PAC","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF-EMPLOYED","ARTIST","2/24/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204582183",38.4410251,-78.861642],
["WIN THE ERA PAC","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF-EMPLOYED","ARTIST","2/9/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204590313",38.4410251,-78.861642],
["WIN THE ERA PAC","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF-EMPLOYED","ARTIST","2/19/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204617732",38.4410251,-78.861642],
["WIN THE ERA PAC","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF-EMPLOYED","ARTIST","2/26/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204520611",38.4410251,-78.861642],
["WIN THE ERA PAC","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF-EMPLOYED","ARTIST","2/10/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204606877",38.4410251,-78.861642],
["WIN THE ERA PAC","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF-EMPLOYED","ARTIST","2/28/2020",116,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204580512",38.4410251,-78.861642],
["WIN THE ERA PAC","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF-EMPLOYED","ARTIST","1/27/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202002209186996869",38.4410251,-78.861642],
["WIN THE ERA PAC","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF-EMPLOYED","ARTIST","1/30/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002209187000188",38.4410251,-78.861642],
["WIN THE ERA PAC","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF-EMPLOYED","ARTIST","1/15/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202002209187007206",38.4410251,-78.861642],
["WIN THE ERA PAC","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF-EMPLOYED","ARTIST","1/12/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202002209187014915",38.4410251,-78.861642],
["WIN THE ERA PAC","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF-EMPLOYED","ARTIST","1/8/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002209187011489",38.4410251,-78.861642],
["ACTBLUE","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF","ARTIST","1/30/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200133719",38.4410251,-78.861642],
["ACTBLUE","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF","ARTIST","1/27/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200133719",38.4410251,-78.861642],
["ACTBLUE","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF","ARTIST","1/8/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200133718",38.4410251,-78.861642],
["ACTBLUE","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF","ARTIST","1/15/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200133718",38.4410251,-78.861642],
["ACTBLUE","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF","ARTIST","1/12/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200133718",38.4410251,-78.861642],
["ACTBLUE","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF","ARTIST","2/19/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210429342",38.4410251,-78.861642],
["ACTBLUE","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF","ARTIST","2/22/2020",20.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210429342",38.4410251,-78.861642],
["ACTBLUE","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF","ARTIST","2/1/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210429340",38.4410251,-78.861642],
["ACTBLUE","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF","ARTIST","2/3/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210429340",38.4410251,-78.861642],
["ACTBLUE","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF","ARTIST","2/10/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210429341",38.4410251,-78.861642],
["ACTBLUE","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF","ARTIST","2/5/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210429340",38.4410251,-78.861642],
["ACTBLUE","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF","ARTIST","2/15/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210429342",38.4410251,-78.861642],
["ACTBLUE","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF","ARTIST","2/10/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210429341",38.4410251,-78.861642],
["ACTBLUE","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF","ARTIST","2/26/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210429343",38.4410251,-78.861642],
["ACTBLUE","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF","ARTIST","2/9/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210429341",38.4410251,-78.861642],
["ACTBLUE","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF","ARTIST","2/24/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210429343",38.4410251,-78.861642],
["ACTBLUE","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF","ARTIST","2/25/2020",20.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210429343",38.4410251,-78.861642],
["ACTBLUE","BETANCOURT, KELLYE","BETANCOURT","450 PRESTON DR","SELF","ARTIST","2/28/2020",116,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210429344",38.4410251,-78.861642],
["ACTBLUE","BIBLE, DONNA","BIBLE","135 W MARKET STREET","ROSETTA STONE","SYS ADMIN","2/21/2020",20,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210433495",38.449538,-78.8714823],
["ACTBLUE","BLANKENSHIP, BENJAMIN","BLANKENSHIP","200 ROCCO AVE A","JAMES MADISON UNIVERSITY","HIGHER ED","6/17/2020",0.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255439906",38.426353,-78.8852213999999],
["ACTBLUE","BLANKENSHIP, BENJAMIN","BLANKENSHIP","200 ROCCO AVE A","JAMES MADISON UNIVERSITY","HIGHER ED","6/30/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255439907",38.426353,-78.8852213999999],
["ACTBLUE","BLANKENSHIP, BENJAMIN","BLANKENSHIP","200 ROCCO AVE A","JAMES MADISON UNIVERSITY","HIGHER ED","6/18/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255439906",38.426353,-78.8852213999999],
["ACTBLUE","BLANKENSHIP, BENJAMIN","BLANKENSHIP","200 ROCCO AVE A","JAMES MADISON UNIVERSITY","HIGHER ED","6/18/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255439907",38.426353,-78.8852213999999],
["ACTBLUE","BLANKENSHIP, BENJAMIN","BLANKENSHIP","200 ROCCO AVE A","JAMES MADISON UNIVERSITY","HIGHER ED","6/17/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255439906",38.426353,-78.8852213999999],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","BLOOMFIELD, GRANT","BLOOMFIELD","758 ANGLE D","MSD","SHIFT ENGINEER","6/14/2020",250,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159250192990",38.4211989,-78.8570910999999],
["WINRED","BLOOMFIELD, GRANT","BLOOMFIELD","758","MSD","SHIFT ENGINEER","6/14/2020",250,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246687517",38.4211989,-78.8570910999999],
["GADE FOR VIRGINIA, INC.","BLOSSER, DANIEL","BLOSSER","3651 TRAVELER ROAD","RIDDLEBERGER BROTHERS","MANAGEMENT","6/16/2020",500,"http://docquery.fec.gov/cgi-bin/fecimg/?202008179261336021",38.3784937,-78.8479523],
["BIDEN FOR PRESIDENT","BODLE, AMANDA","BODLE","900 CIRCLE DR","JAMES MADISON UNIVERSITY","SUSTAINABILITY PROGRAM MANAGER","7/4/2020",250,"http://docquery.fec.gov/cgi-bin/fecimg/?202008209266461739",38.4458951,-78.8896008999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","1/29/2020",30,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200159856",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","1/30/2020",0.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200159856",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","1/30/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200159857",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","1/29/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200159856",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","2/29/2020",0.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210471133",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","2/29/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210471133",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","2/29/2020",30,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210471134",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","2/29/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210471134",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","4/29/2020",30,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236114601",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","3/29/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228508502",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","3/30/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228508503",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","3/29/2020",30,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228508502",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","3/30/2020",0.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228508502",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","4/30/2020",0.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236114602",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","4/30/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236114602",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","4/29/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236114601",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","5/19/2020",2.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240366793",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","5/29/2020",30,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240366793",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","5/29/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240366794",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","5/30/2020",0.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240366794",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","5/30/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240366794",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","5/19/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240366793",38.4447356,-78.8662636999999],
["DCCC","BOLT, LESLIE","BOLT","255 CAMPBELL ST","APPALACHIAN STATE UNIVERSITY","PROFESSOR","7/29/2020",30,"http://docquery.fec.gov/cgi-bin/fecimg/?202008209266135890",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","6/29/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255455541",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","6/19/2020",2.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255455540",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","6/19/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255455540",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","6/30/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255455541",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","6/30/2020",0.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255455541",38.4447356,-78.8662636999999],
["ACTBLUE","BOLT, LESLIE","BOLT","255 CAMPBELL STREET","APPALACHIAN STATE UNIV.","PROFESSOR","6/29/2020",30,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255455540",38.4447356,-78.8662636999999],
["ACTBLUE","BONTRAGER, SETH","BONTRAGER","300 DIXIE AVE","NOT EMPLOYED","NOT EMPLOYED","12/31/2019",4.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202001299168163469",38.4444154,-78.8800835999999],
["ACTBLUE","BONTRAGER, SETH","BONTRAGER","300 DIXIE AVE","NOT EMPLOYED","NOT EMPLOYED","1/31/2020",4.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200162527",38.4444154,-78.8800835999999],
["ACTBLUE","BONTRAGER, SETH","BONTRAGER","300 DIXIE AVE","NOT EMPLOYED","NOT EMPLOYED","2/29/2020",4.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210475377",38.4444154,-78.8800835999999],
["ACTBLUE","BONTRAGER, SETH","BONTRAGER","300 DIXIE AVE","NOT EMPLOYED","NOT EMPLOYED","3/31/2020",4.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228511546",38.4444154,-78.8800835999999],
["ACTBLUE","BONTRAGER, SETH","BONTRAGER","300 DIXIE AVE","NOT EMPLOYED","NOT EMPLOYED","6/21/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255459237",38.4444154,-78.8800835999999],
["ACTBLUE","BOWERS, JANE","BOWERS","519 PAUL ST","NOT EMPLOYED","NOT EMPLOYED","1/7/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200170959",38.4394663,-78.863588],
["ACTBLUE","BOWERS, JANE","BOWERS","519 PAUL ST","NOT EMPLOYED","NOT EMPLOYED","6/24/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255471356",38.4394663,-78.863588],
["ACTBLUE","BRADSHAW, JEREMY","BRADSHAW","1226 MOUNTAIN VIEW DRIVE APT F","NOT EMPLOYED","NOT EMPLOYED","2/7/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210499657",38.436912,-78.8579046],
["ACTBLUE","BRADSHAW, JEREMY","BRADSHAW","1226 MOUNTAIN VIEW DRIVE APT F","NOT EMPLOYED","NOT EMPLOYED","2/7/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210499657",38.436912,-78.8579046],
["ACTBLUE","BRADSHAW, JEREMY","BRADSHAW","1226 MOUNTAIN VIEW DRIVE APT F","NOT EMPLOYED","NOT EMPLOYED","2/18/2020",22,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210499658",38.436912,-78.8579046],
["ACTBLUE","BRADSHAW, JEREMY","BRADSHAW","1226 MOUNTAIN VIEW DRIVE APT F","NOT EMPLOYED","NOT EMPLOYED","2/11/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210499657",38.436912,-78.8579046],
["ACTBLUE","BRADSHAW, JEREMY","BRADSHAW","1226 MOUNTAIN VIEW DRIVE APT F","NOT EMPLOYED","NOT EMPLOYED","2/11/2020",5.4,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210499658",38.436912,-78.8579046],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","1/9/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200182590",38.418432,-78.857556],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","1/24/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200182590",38.418432,-78.857556],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","2/12/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210508354",38.418432,-78.857556],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","2/26/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210508354",38.418432,-78.857556],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","2/12/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210508353",38.418432,-78.857556],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","2/27/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210508355",38.418432,-78.857556],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","2/9/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210508353",38.418432,-78.857556],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","2/1/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210508353",38.418432,-78.857556],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","2/26/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210508354",38.418432,-78.857556],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","2/27/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210508355",38.418432,-78.857556],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","3/9/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228535560",38.418432,-78.857556],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","4/29/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236136552",38.418432,-78.857556],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","4/9/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236136551",38.418432,-78.857556],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","5/9/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240390928",38.418432,-78.857556],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","5/22/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240390928",38.418432,-78.857556],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","5/22/2020",1.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240390928",38.418432,-78.857556],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","6/17/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255487970",38.418432,-78.857556],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","6/17/2020",1.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255487970",38.418432,-78.857556],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","6/21/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255487971",38.418432,-78.857556],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","6/21/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255487971",38.418432,-78.857556],
["ACTBLUE","BRAY, KATE","BRAY","872 CAMELOT LANE","WHARTON, ALDHIZER, & WEAVER PLC","PARALEGAL","6/13/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255487970",38.418432,-78.857556],
["ACTBLUE","BRENNEMAN, SOLOMON","BRENNEMAN","290 W WATER ST","INTERCHANGE","SHIPPING CLERK","2/3/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210512791",38.4491983,-78.8740481999999],
["ACTBLUE","BRENNEMAN, SOLOMON","BRENNEMAN","290 W WATER ST","INTERCHANGE","SHIPPING CLERK","2/5/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210512791",38.4491983,-78.8740481999999],
["ACTBLUE","BRENNEMAN, SOLOMON","BRENNEMAN","290 W WATER ST","INTERCHANGE","SHIPPING CLERK","3/3/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228538623",38.4491983,-78.8740481999999],
["ACTBLUE","BRIGGS, WILLIAM","BRIGGS","655 WYNDHAM WOODS CIRCLE","NOT EMPLOYED","NOT EMPLOYED","1/20/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200188914",38.449966,-78.8937687999999],
["ACTBLUE","BRIGGS, WILLIAM","BRIGGS","655 WYNDHAM WOODS CIRCLE","NOT EMPLOYED","NOT EMPLOYED","4/8/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236142310",38.449966,-78.8937687999999],
["ACTBLUE","BRIGGS, WILLIAM","BRIGGS","655 WYNDHAM WOODS CIRCLE","NOT EMPLOYED","NOT EMPLOYED","4/8/2020",2,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236142311",38.449966,-78.8937687999999],
["ACTBLUE","BRIGGS, WILLIAM","BRIGGS","655 WYNDHAM WOODS CIRCLE","NOT EMPLOYED","NOT EMPLOYED","4/15/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236142313",38.449966,-78.8937687999999],
["ACTBLUE","BRIGGS, WILLIAM","BRIGGS","655 WYNDHAM WOODS CIRCLE","NOT EMPLOYED","NOT EMPLOYED","4/8/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236142310",38.449966,-78.8937687999999],
["ACTBLUE","BRIGGS, WILLIAM","BRIGGS","655 WYNDHAM WOODS CIRCLE","NOT EMPLOYED","NOT EMPLOYED","4/14/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236142312",38.449966,-78.8937687999999],
["ACTBLUE","BRIGGS, SANDRA","BRIGGS","655 WYNDHAM WOODS CIRCLE","NOT EMPLOYED","NOT EMPLOYED","4/3/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236142259",38.449966,-78.8937687999999],
["AMY FOR AMERICA","BRIGGS, WILLIAM","BRIGGS","655 WYNDHAM WOODS CIR","NOT EMPLOYED","NOT EMPLOYED","1/20/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159249897247",38.449966,-78.8937687999999],
["ACTBLUE","BROOKE IMBER, BROOKE IMBER","BROOKE IMBER","524 COLLICELLO ST","AUGUSTA COUNTY PUBLIC SCHOOLS","ART TEACHER","1/29/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200194119",38.4555458,-78.8698017999999],
["ACTBLUE","BROOKE IMBER, BROOKE IMBER","BROOKE IMBER","524 COLLICELLO ST","AUGUSTA COUNTY PUBLIC SCHOOLS","ART TEACHER","1/29/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200194119",38.4555458,-78.8698017999999],
["WINRED","BROOKS, KATHIE","BROOKS","165 WAKEFIELD PL","RETIRED","RETIRED","2/28/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217616147",38.4346332,-78.8905963999999],
["WINRED","BROOKS, KATHIE","BROOKS","165 WAKEFIELD PL","RETIRED","RETIRED","2/28/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217607446",38.4346332,-78.8905963999999],
["WINRED","BROOKS, KATHIE","BROOKS","165 WAKEFIELD PL","RETIRED","RETIRED","2/28/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217616451",38.4346332,-78.8905963999999],
["WINRED","BROOKS, KATHIE","BROOKS","165 WAKEFIELD PL","RETIRED","RETIRED","2/28/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217619804",38.4346332,-78.8905963999999],
["ACTBLUE","BROSI, EAGLE","BROSI","929 S DOGWOOD DRIVE","ZOOK AVIATION","PROGRAMMER","6/9/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255506945",38.4434662,-78.8875565],
["ACTBLUE","BROWN, SARAH","BROWN","1211 WOODCREST CIR","NOT EMPLOYED","NOT EMPLOYED","1/2/2020",1.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200202808",38.4179861,-78.8647148],
["ACTBLUE","BROWN, SARAH","BROWN","1211 WOODCREST CIR","NOT EMPLOYED","NOT EMPLOYED","1/2/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200202808",38.4179861,-78.8647148],
["ACTBLUE","BROWN, WILLIAM","BROWN","238 E WATER ST APT 209","JAMES MADISON UNIVERSITY","IT CONSULTANT","2/28/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210542339",38.448382,-78.8659911],
["ACTBLUE","BROWN, WILLIAM","BROWN","238 E WATER ST APT 209","JAMES MADISON UNIVERSITY","IT CONSULTANT","2/28/2020",2.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210542338",38.448382,-78.8659911],
["ACTBLUE","BROWN, SARAH","BROWN","1211 WOODCREST CIR","NOT EMPLOYED","NOT EMPLOYED","2/14/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210540653",38.4179861,-78.8647148],
["ACTBLUE","BROWN, BAILEY","BROWN","34 MARYLAND AVE","URGIES CHEESESTEAK LLC","COOK","2/26/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210531714",38.436511,-78.88047],
["ACTBLUE","BROWN, BAILEY","BROWN","34 MARYLAND AVE","URGIES CHEESESTEAK LLC","COOK","2/26/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210531714",38.436511,-78.88047],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","2/11/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217432992",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","1/15/2020",42,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217064834",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","3/31/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159218031160",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","3/31/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159218033114",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","1/23/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217155094",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","2/23/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217559228",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","3/11/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217771575",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","2/26/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217586494",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","3/31/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159218023393",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","3/26/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217921651",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","3/31/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159218017042",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","3/31/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159218022850",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","3/23/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217886310",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","1/15/2020",10.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239189244",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","3/26/2020",11.25,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239189248",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","4/3/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239161697",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","1/23/2020",12.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239189245",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","3/23/2020",12.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239189248",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","4/1/2020",70,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239157635",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","4/3/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239161698",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","2/23/2020",12.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239189246",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","2/26/2020",11.25,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239189247",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","3/11/2020",12.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239189248",38.4214395,38.4214395],
["DONALD J. TRUMP FOR PRESIDENT, INC.","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P W TITLE EXAM SVCS LLC","TITLE EXAMINER","1/15/2020",31.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006179239851118",38.4214395,38.4214395],
["DONALD J. TRUMP FOR PRESIDENT, INC.","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P W TITLE EXAM SVCS LLC","TITLE EXAMINER","1/23/2020",37.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006179239851119",38.4214395,38.4214395],
["DONALD J. TRUMP FOR PRESIDENT, INC.","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAMSVCSLLC","TITLE EXAMINER","3/31/2020",37.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202008249266931944",38.4214395,38.4214395],
["DONALD J. TRUMP FOR PRESIDENT, INC.","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAMSVCSLLC","TITLE EXAMINER","3/31/2020",33.75,"http://docquery.fec.gov/cgi-bin/fecimg/?202008249266931945",38.4214395,38.4214395],
["DONALD J. TRUMP FOR PRESIDENT, INC.","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAMSVCSLLC","TITLE EXAMINER","4/11/2020",37.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202008249266931945",38.4214395,38.4214395],
["DONALD J. TRUMP FOR PRESIDENT, INC.","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAMSVCSLLC","TITLE EXAMINER","3/31/2020",33.75,"http://docquery.fec.gov/cgi-bin/fecimg/?202008249266931945",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","5/4/2020",70,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243840631",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","3/31/2020",11.25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243886240",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","3/31/2020",12.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243886241",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","3/31/2020",11.25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243886241",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","4/11/2020",12.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243886242",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","4/23/2020",12.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243886242",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","4/26/2020",11.25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243886243",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","4/30/2020",11.25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243886244",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","5/11/2020",12.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243886246",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","5/20/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246017910",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","4/23/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245428008",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","4/26/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245466337",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","5/30/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246221741",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","6/20/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246868482",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","6/23/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246959127",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","5/11/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245829010",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","5/20/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246029018",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","6/30/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159247305422",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","4/30/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245610504",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","6/11/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246560523",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","6/4/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246392446",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","4/11/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245240196",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","6/4/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246403871",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","5/23/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246090056",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","5/26/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246131290",38.4214395,38.4214395],
["WINRED","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAM.SVCS.,LLC","TITLE EXAMINER","6/26/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159247058083",38.4214395,38.4214395],
["DONALD J. TRUMP FOR PRESIDENT, INC.","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P W TITLE EXAM SVCS LLC","TITLE EXAMINER","4/22/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007279260824569",38.4214395,38.4214395],
["DONALD J. TRUMP FOR PRESIDENT, INC.","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P W TITLE EXAM SVCS LLC","TITLE EXAMINER","2/23/2020",37.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007279260865678",38.4214395,38.4214395],
["DONALD J. TRUMP FOR PRESIDENT, INC.","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P W TITLE EXAM SVCS LLC","TITLE EXAMINER","2/26/2020",33.75,"http://docquery.fec.gov/cgi-bin/fecimg/?202007279260865678",38.4214395,38.4214395],
["DONALD J. TRUMP FOR PRESIDENT, INC.","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P W TITLE EXAM SVCS LLC","TITLE EXAMINER","3/26/2020",33.75,"http://docquery.fec.gov/cgi-bin/fecimg/?202007279260865679",38.4214395,38.4214395],
["DONALD J. TRUMP FOR PRESIDENT, INC.","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P W TITLE EXAM SVCS LLC","TITLE EXAMINER","3/11/2020",37.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007279260865678",38.4214395,38.4214395],
["DONALD J. TRUMP FOR PRESIDENT, INC.","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P W TITLE EXAM SVCS LLC","TITLE EXAMINER","3/23/2020",37.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007279260865679",38.4214395,38.4214395],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAMSVCSLLC","TITLE EXAMINER","2/11/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007289261111337",38.4214395,38.4214395],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAMSVCSLLC","TITLE EXAMINER","3/31/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202007289261111339",38.4214395,38.4214395],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAMSVCSLLC","TITLE EXAMINER","3/31/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202007289261111339",38.4214395,38.4214395],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAMSVCSLLC","TITLE EXAMINER","3/23/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007289261111338",38.4214395,38.4214395],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAMSVCSLLC","TITLE EXAMINER","2/26/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202007289261111337",38.4214395,38.4214395],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAMSVCSLLC","TITLE EXAMINER","3/26/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202007289261111338",38.4214395,38.4214395],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAMSVCSLLC","TITLE EXAMINER","3/31/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007289261111339",38.4214395,38.4214395],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAMSVCSLLC","TITLE EXAMINER","1/23/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007289261111336",38.4214395,38.4214395],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAMSVCSLLC","TITLE EXAMINER","2/23/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007289261111337",38.4214395,38.4214395],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAMSVCSLLC","TITLE EXAMINER","1/15/2020",42,"http://docquery.fec.gov/cgi-bin/fecimg/?202007289261111336",38.4214395,38.4214395],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DR","P&W TITLE EXAMSVCSLLC","TITLE EXAMINER","3/11/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007289261111338",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","5/23/2020",12.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260470309",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","5/26/2020",11.25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260470310",38.4214395,38.4214395],
["REPUBLICAN NATIONAL COMMITTEE","BROWN, FRANCES","BROWN","226 BLUE STONE HILLS DRIVE","P&W TITLE EXAM.SVCS.LLC","TITLE EXAMINER","6/11/2020",12.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260470311",38.4214395,38.4214395],
["ACTBLUE","BROWN, BLY","BROWN","3695 IZAAK WALTON DRIVE","NOT EMPLOYED","NOT EMPLOYED","6/29/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255509123",38.3788472,-78.8357647999999],
["ACTBLUE","BRUBACH, RAVEN","BRUBACH","1169 H","JAMES MADISON UNIVERSITY","STUDENT","3/2/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228561663",38.4049904,-78.8722341],
["ACTBLUE","BRUBACH, RAVEN","BRUBACH","1169 H","JAMES MADISON UNIVERSITY","STUDENT","3/2/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228561662",38.4049904,-78.8722341],
["ACTBLUE","BRUBACH, RAVEN","BRUBACH","1169 H","JAMES MADISON UNIVERSITY","STUDENT","6/21/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255520897",38.4049904,-78.8722341],
["ACTBLUE","BRUBACH, RAVEN","BRUBACH","1169 H","JAMES MADISON UNIVERSITY","STUDENT","6/21/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255520897",38.4049904,-78.8722341],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","1/17/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200205454",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","1/22/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200205454",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","1/18/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200205454",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, WILLIAM","BRUCE","2250 BULLPEN DR APT 206","NOT EMPLOYED","NOT EMPLOYED","2/26/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210544903",38.412127,-78.857681],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","2/9/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210544809",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","2/5/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210544809",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","2/28/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210544809",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","4/24/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236158919",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","4/30/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236158920",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","4/30/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236158920",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, RAYMOND","BRUCE","134 COLONIAL DRIVE APT A","NOT EMPLOYED","NOT EMPLOYED","5/12/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240415889",38.4314511,-78.8967246],
["ACTBLUE","BRUCE, RAYMOND","BRUCE","134 COLONIAL DRIVE APT A","NOT EMPLOYED","NOT EMPLOYED","5/12/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240415889",38.4503727,-78.8967246],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","5/2/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240415925",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","5/22/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240415928",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","5/8/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240415927",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","5/7/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240415926",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","5/7/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240415927",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","5/27/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240415929",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","5/3/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240415925",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","5/5/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240415926",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","5/6/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240415926",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","5/26/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240415929",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","5/1/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240415925",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","5/7/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240415927",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","5/10/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240415928",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","5/22/2020",1.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240415928",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","5/26/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240415929",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","6/21/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255521440",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","6/2/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255521440",38.4503727,-78.8468218],
["ACTBLUE","BRUCE, STEFAN","BRUCE","1101 WELLINGTON DR","NOT EMPLOYED","NOT EMPLOYED","6/30/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255521441",38.4503727,-78.8468218],
["ACTBLUE","BRUECKNER, SVEN","BRUECKNER","333 WEST AVE","CONVERGENTAI","CTO","6/4/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255521844",38.4351666,-78.8988311],
["ACTBLUE","BRUECKNER, SVEN","BRUECKNER","333 WEST AVE","CONVERGENTAI","CTO","6/4/2020",3.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255521844",38.4351666,-78.8988311],
["ACTBLUE","BRUECKNER, SVEN","BRUECKNER","333 WEST AVE","CONVERGENTAI","CTO","6/28/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255521845",38.4351666,-78.8988311],
["ACTBLUE","BRUECKNER, SVEN","BRUECKNER","333 WEST AVE","CONVERGENTAI","CTO","6/21/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255521844",38.4351666,-78.8988311],
["ACTBLUE","BRUNK, CHRISTINA","BRUNK","855 NEYLAND DR","MASSANUTTEN REGIONAL LIBRARY","LIBRARIAN ASST","5/3/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240417411",38.4473203,-78.8891785],
["THE LINCOLN PROJECT","BUCHANAN, ELIZABETH","BUCHANAN","231 PAUL ST","JEFFERSON PARISH","SOCIAL WORKER","4/25/2020",300,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159244841653",38.4428812,-78.8678779999999],
["THE LINCOLN PROJECT","BUCHANAN, ELIZABETH","BUCHANAN","231 PAUL ST","JEFFERSON PARISH","SOCIAL WORKER","6/27/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159244841653",38.4428812,-78.8678779999999],
["ACTBLUE","BURDEN, JARED","BURDEN","343 MONTICELLO AVE","GREENEHURLOCKER PLC","ATTORNEY","3/5/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228575180",38.4448072,-78.8634111],
["ACTBLUE","BURDEN, JARED","BURDEN","343 MONTICELLO AVE","GREENEHURLOCKER PLC","ATTORNEY","6/5/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255536488",38.4448072,-78.8634111],
["ACTBLUE","BURKE, CASEY","BURKE","2484 RESERVOIR ST","VDOT","ADMINISTRATION","6/4/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255539315",38.416884,-78.8553649999999],
["ACTBLUE","BURKE, CASEY","BURKE","2484 RESERVOIR ST","VDOT","ADMINISTRATION","6/4/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255539315",38.416884,-78.8553649999999],
["ACTBLUE","BURSEY, N","BURSEY","461 HICKORY GROVE CIRCLE","NOT EMPLOYED","NOT EMPLOYED","4/7/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236175805",38.414827,-78.903398],
["ACTBLUE","BURSEY, N","BURSEY","461 HICKORY GROVE CIRCLE","NOT EMPLOYED","NOT EMPLOYED","5/31/2020",20,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240434353",38.414827,-78.903398],
["ACTBLUE","BUSCHING, BRUCE","BUSCHING","561 SUNRISE AVENUE","NOT EMPLOYED","NOT EMPLOYED","12/31/2019",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202001299168442118",38.4441841,-78.8874238],
["ACTBLUE","BUSCHING, BRUCE","BUSCHING","561 SUNRISE AVE","NOT EMPLOYED","NOT EMPLOYED","1/17/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200225028",38.4441841,-78.8874238],
["ACTBLUE","BUSCHING, BRUCE","BUSCHING","561 SUNRISE AVE","NOT EMPLOYED","NOT EMPLOYED","1/17/2020",20,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200225029",38.4441841,-78.8874238],
["ACTBLUE","BUSCHING, BRUCE","BUSCHING","561 SUNRISE AVE","NOT EMPLOYED","NOT EMPLOYED","1/30/2020",20,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200225029",38.4441841,-78.8874238],
["ACTBLUE","BUSCHING, BRUCE","BUSCHING","561 SUNRISE AVE","NOT EMPLOYED","NOT EMPLOYED","2/29/2020",20,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210576193",38.4441841,-78.8874238],
["ACTBLUE","BYRNE, REGAN","BYRNE","3197 BAYBROOK DRIVE","JMU FORBES CENTER","EXECUTIVE DIRECTOR","6/24/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255555597",38.3918801,-78.8511371],
["DONALD J. TRUMP FOR PRESIDENT, INC.","CAHILL, COLLEEN","CAHILL","1580 GLENSIDE DRIVE","RETIRED","RETIRED","7/29/2020",400,"http://docquery.fec.gov/cgi-bin/fecimg/?202008209266647914",38.3954946,-78.830938],
["GADE FOR VIRGINIA, INC.","CALE, WILLIAM","CALE","710 NEW YORK AVENUE","RETIRED","RETIRED","2/20/2020",250,"http://docquery.fec.gov/cgi-bin/fecimg/?202008179261335608",38.4478262,-78.8856109],
["WINRED","CALE, WILLIAM","CALE","710 NEW YORK AVE","RETIRED","NOT EMPLOYED","3/8/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217740653",38.4478262,-78.8856109],
["WINRED","CALE, WILLIAM","CALE","710 NEW YORK AVE","RETIRED","RETIRED","2/22/2020",42,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217551935",38.4478262,-78.8856109],
["WINRED","CALE, WILLIAM","CALE","710 NEW YORK AVE","RETIRED","NOT EMPLOYED","1/31/2020",250,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217253226",38.4478262,-78.8856109],
["WINRED","CALE, WILLIAM","CALE","710 NEW YORK AVE","RETIRED","NOT EMPLOYED","3/21/2020",37,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217874740",38.4478262,-78.8856109],
["WINRED","CALE, WILLIAM","CALE","710 NEW YORK AVE","RETIRED","NOT EMPLOYED","1/18/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217099454",38.4478262,-78.8856109],
["REPUBLICAN NATIONAL COMMITTEE","CALE, WILLIAM F. DR.","CALE","710 NEW YORK AVENUE","RETIRED","RETIRED","1/31/2020",62.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239189987",38.4478262,-78.8856109],
["REPUBLICAN NATIONAL COMMITTEE","CALE, WILLIAM F. DR.","CALE","710 NEW YORK AVENUE","RETIRED","RETIRED","4/16/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239172590",38.4478262,-78.8856109],
["REPUBLICAN NATIONAL COMMITTEE","CALE, WILLIAM F. DR.","CALE","710 NEW YORK AVENUE","RETIRED","RETIRED","1/18/2020",11.25,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239189987",38.4478262,-78.8856109],
["REPUBLICAN NATIONAL COMMITTEE","CALE, WILLIAM F. DR.","CALE","710 NEW YORK AVENUE","RETIRED","RETIRED","2/22/2020",10.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239189987",38.4478262,-78.8856109],
["REPUBLICAN NATIONAL COMMITTEE","CALE, WILLIAM F. DR.","CALE","710 NEW YORK AVENUE","RETIRED","RETIRED","3/8/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239189988",38.4478262,-78.8856109],
["DONALD J. TRUMP FOR PRESIDENT, INC.","CALE, WILLIAM F","CALE","710 NEW YORK AVE","RETIRED","RETIRED","4/12/2020",75,"http://docquery.fec.gov/cgi-bin/fecimg/?202008249266933199",38.4478262,-78.8856109],
["DONALD J. TRUMP FOR PRESIDENT, INC.","CALE, WILLIAM","CALE","710 NEW YORK AVE","RETIRED","RETIRED","3/21/2020",37,"http://docquery.fec.gov/cgi-bin/fecimg/?202006179239821364",38.4478262,-78.8856109],
["DONALD J. TRUMP FOR PRESIDENT, INC.","CALE, WILLIAM F DR","CALE","710 NEW YORK AVE","RETIRED","RETIRED","1/18/2020",33.75,"http://docquery.fec.gov/cgi-bin/fecimg/?202006179239852947",38.4478262,-78.8856109],
["DONALD J. TRUMP FOR PRESIDENT, INC.","CALE, WILLIAM","CALE","710 NEW YORK AVE","RETIRED","RETIRED","1/31/2020",187.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006179239852947",38.4478262,-78.8856109],
["REPUBLICAN NATIONAL COMMITTEE","CALE, WILLIAM F. DR.","CALE","710 NEW YORK AVENUE","RETIRED","RETIRED","4/12/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243887117",38.4478262,-78.8856109],
["REPUBLICAN NATIONAL COMMITTEE","CALE, WILLIAM F. DR.","CALE","710 NEW YORK AVENUE","RETIRED","RETIRED","5/12/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243887118",38.4478262,-78.8856109],
["WINRED","CALE, WILLIAM","CALE","710 NEW YORK AVE","RETIRED","RETIRED","5/12/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245843442",38.4478262,-78.8856109],
["WINRED","CALE, WILLIAM","CALE","710 NEW YORK AVE","RETIRED","RETIRED","6/12/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246607739",38.4478262,-78.8856109],
["WINRED","CALE, WILLIAM","CALE","710 NEW YORK AVE","RETIRED","RETIRED","4/22/2020",42,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245394237",38.4478262,-78.8856109],
["WINRED","CALE, WILLIAM","CALE","710 NEW YORK AVE","RETIRED","RETIRED","4/26/2020",42,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245477083",38.4478262,-78.8856109],
["WINRED","CALE, WILLIAM","CALE","710 NEW YORK AVE","RETIRED","RETIRED","4/12/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245242639",38.4478262,-78.8856109],
["DONALD J. TRUMP FOR PRESIDENT, INC.","CALE, WILLIAM F","CALE","710 NEW YORK AVE","RETIRED","RETIRED","4/26/2020",42,"http://docquery.fec.gov/cgi-bin/fecimg/?202007279260825378",38.4478262,-78.8856109],
["DONALD J. TRUMP FOR PRESIDENT, INC.","CALE, WILLIAM F","CALE","710 NEW YORK AVE","RETIRED","RETIRED","3/8/2020",75,"http://docquery.fec.gov/cgi-bin/fecimg/?202007279260867258",38.4478262,-78.8856109],
["DONALD J. TRUMP FOR PRESIDENT, INC.","CALE, WILLIAM F","CALE","710 NEW YORK AVE","RETIRED","RETIRED","4/22/2020",42,"http://docquery.fec.gov/cgi-bin/fecimg/?202007279260825378",38.4478262,-78.8856109],
["DONALD J. TRUMP FOR PRESIDENT, INC.","CALE, WILLIAM F","CALE","710 NEW YORK AVE","RETIRED","RETIRED","2/22/2020",31.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007279260867258",38.4478262,-78.8856109],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","CALE, WILLIAM","CALE","710 NEW YORK AVE","RETIRED","RETIRED","1/18/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202007289261112971",38.4478262,-78.8856109],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","CALE, WILLIAM","CALE","710 NEW YORK AVE","RETIRED","RETIRED","1/31/2020",250,"http://docquery.fec.gov/cgi-bin/fecimg/?202007289261112971",38.4478262,-78.8856109],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","CALE, WILLIAM","CALE","710 NEW YORK AVE","RETIRED","RETIRED","3/8/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202007289261112972",38.4478262,-78.8856109],
["REPUBLICAN NATIONAL COMMITTEE","CALE, WILLIAM F. DR.","CALE","710 NEW YORK AVENUE","RETIRED","RETIRED","6/12/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260470995",38.4478262,-78.8856109],
["ACTBLUE","CALOMINO, AUDREY","CALOMINO","1715 GLENSIDE DR","NONE","RETIRED","2/7/2020",2.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210595202",38.3954946,-78.830938],
["ACTBLUE","CALOMINO, AUDREY","CALOMINO","1715 GLENSIDE DR","NONE","RETIRED","1/30/2020",2.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200237147",38.3954946,-78.830938],
["ACTBLUE","CALOMINO, AUDREY","CALOMINO","1715 GLENSIDE DR","NONE","RETIRED","1/30/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200237146",38.3954946,-78.830938],
["ACTBLUE","CALOMINO, AUDREY","CALOMINO","1715 GLENSIDE DR","NONE","RETIRED","2/17/2020",2.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210595203",38.3954946,-78.830938],
["ACTBLUE","CALOMINO, AUDREY","CALOMINO","1715 GLENSIDE DR","NONE","RETIRED","2/7/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210595202",38.3954946,-78.830938],
["ACTBLUE","CALOMINO, AUDREY","CALOMINO","1715 GLENSIDE DR","NONE","RETIRED","2/17/2020",12.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210595203",38.3954946,-78.830938],
["ACTBLUE","CALOMINO, AUDREY","CALOMINO","1715 GLENSIDE DR","NONE","RETIRED","3/6/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228598415",38.3954946,-78.830938],
["ACTBLUE","CALOMINO, AUDREY","CALOMINO","1715 GLENSIDE DR","NONE","RETIRED","3/13/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228598417",38.3954946,-78.830938],
["ACTBLUE","CALOMINO, AUDREY","CALOMINO","1715 GLENSIDE DR","NONE","RETIRED","3/6/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228598415",38.3954946,-78.830938],
["ACTBLUE","CALOMINO, AUDREY","CALOMINO","1715 GLENSIDE DR","NONE","RETIRED","3/13/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228598416",38.3954946,-78.830938],
["ACTBLUE","CALOMINO, AUDREY","CALOMINO","1715 GLENSIDE DR","NONE","RETIRED","3/4/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228598415",38.3954946,-78.830938],
["ACTBLUE","CALOMINO, AUDREY","CALOMINO","1715 GLENSIDE DR","NONE","RETIRED","3/13/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228598416",38.3954946,-78.830938],
["ACTBLUE","CALOMINO, AUDREY","CALOMINO","1715 GLENSIDE DR","NONE","RETIRED","3/13/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228598416",38.3954946,-78.830938],
["ACTBLUE","CALOMINO, AUDREY","CALOMINO","1715 GLENSIDE DR","NONE","RETIRED","5/7/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240448288",38.3954946,-78.830938],
["ACTBLUE","CALOMINO, AUDREY","CALOMINO","1715 GLENSIDE DR","NONE","RETIRED","5/7/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240448288",38.3954946,-78.830938],
["ACTBLUE","CALOMINO, AUDREY","CALOMINO","1715 GLENSIDE DR","NONE","RETIRED","6/2/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255564702",38.3954946,-78.830938],
["ACTBLUE","CALOMINO, AUDREY","CALOMINO","1715 GLENSIDE DR","NONE","RETIRED","6/4/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255564702",38.3954946,-78.830938],
["ACTBLUE","CAMPBELL, CRAIG","CAMPBELL","3273 CLAUDES LANE","FEDEX GROUND","COURIER","12/31/2019",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202001299168507128",38.4070472,-78.9206959],
["ACTBLUE","CAMPBELL, CRAIG","CAMPBELL","3273 CLAUDES LANE","FEDEX GROUND","COURIER","1/31/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200239878",38.4070472,-78.9206959],
["ACTBLUE","CAMPBELL, CRAIG","CAMPBELL","3273 CLAUDES LANE","FEDEX GROUND","COURIER","2/29/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210599520",38.4070472,-78.9206959],
["ACTBLUE","CAMPBELL, CRAIG","CAMPBELL","3273 CLAUDES LANE","FEDEX GROUND","COURIER","3/31/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228601443",38.4070472,-78.9206959],
["ACTBLUE","CAMPISE, PAUL","CAMPISE","331 SUNRISE AVENUE","SELF","PIANO TUNING","3/19/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228604160",38.4418957,-78.8855667],
["ACTBLUE","CAROTHERS, DAVID","CAROTHERS","435 DEXTER DRIVE","JAMES MADISON UNIVERSITY","UNIVERSITY PROFESSOR","12/31/2019",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202001299168564439",38.4482458,-78.9223047999999],
["ACTBLUE","CAROTHERS, DAVID","CAROTHERS","435 DEXTER DRIVE","JAMES MADISON UNIVERSITY","UNIVERSITY PROFESSOR","2/5/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210620322",38.4482458,-78.9223047999999],
["ACTBLUE","CAROTHERS, DAVID","CAROTHERS","435 DEXTER DRIVE","JAMES MADISON UNIVERSITY","UNIVERSITY PROFESSOR","6/1/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255585829",38.4482458,-78.9223047999999],
["WIN THE ERA PAC","CARPENTER, M","CARPENTER","1611 CENTRAL AVE","NOT EMPLOYED","NOT EMPLOYED","2/5/2020",300,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204598595",38.4329724,-78.8886177],
["ACTBLUE","CARPENTER, TYLER","CARPENTER","154 CHESTNUT RIDGE DR APT E","MERCK & CO.","ENGINEER","2/26/2020",20,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210621778",38.4183516,-78.8425994],
["ACTBLUE","CARPENTER, TYLER","CARPENTER","154 CHESTNUT RIDGE DR APT E","MERCK & CO.","ENGINEER","2/26/2020",2,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210621778",38.4183516,-78.8425994],
["ACTBLUE","CARPENTER, TYLER","CARPENTER","154 CHESTNUT RIDGE DR APT E","MERCK & CO.","ENGINEER","3/5/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228617401",38.4183516,-78.8425994],
["ACTBLUE","CARPENTER, TYLER","CARPENTER","154 CHESTNUT RIDGE DR APT E","MERCK & CO.","ENGINEER","3/14/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228617401",38.4183516,-78.8425994],
["ACTBLUE","CARPENTER, TYLER","CARPENTER","154 CHESTNUT RIDGE DR APT E","MERCK & CO.","ENGINEER","3/5/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228617400",38.4183516,-78.8425994],
["ACTBLUE","CARPENTER, TYLER","CARPENTER","154 CHESTNUT RIDGE DR APT E","MERCK & CO.","ENGINEER","3/5/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228617401",38.4183516,-78.8425994],
["ACTBLUE","CARPENTER, TYLER","CARPENTER","154 CHESTNUT RIDGE DR APT E","MERCK & CO.","ENGINEER","3/14/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228617402",38.4183516,-78.8425994],
["BIDEN FOR PRESIDENT","CARPENTER, CHRISTINE","CARPENTER","1611 CENTRAL AVE","NOT EMPLOYED","NOT EMPLOYED","6/21/2020",1250,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260520028",38.4329724,-78.8886177],
["ACTBLUE","CARTER, JACOB","CARTER","1140 DEVON LANE APT F","NOT EMPLOYED","NOT EMPLOYED","12/31/2019",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202001299168588234",38.4239156,-78.8675904999999],
["ACTBLUE","CARTER, JACOB","CARTER","1140 DEVON LANE APT F","NOT EMPLOYED","NOT EMPLOYED","1/15/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200258416",38.4239156,-78.8675904999999],
["ACTBLUE","CARTER, SUZANNE","CARTER","473 W BRUCE ST","NOT EMPLOYED","NOT EMPLOYED","3/17/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228623502",38.4484952,-78.8781820999999],
["ACTBLUE","CARTER, TINA","CARTER","672 JOHN TYLER CIR APT 101","NOT EMPLOYED","NOT EMPLOYED","6/5/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255594658",38.418569,-78.8827139999999],
["ACTBLUE","CARTER, TINA","CARTER","672 JOHN TYLER CIR APT 101","NOT EMPLOYED","NOT EMPLOYED","6/5/2020",12.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255594658",38.418569,-78.8827139999999],
["ACTBLUE","CARTER, TINA","CARTER","672 JOHN TYLER CIR APT 101","NOT EMPLOYED","NOT EMPLOYED","6/5/2020",12.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255594658",38.418569,-78.8827139999999],
["ACTBLUE","CASE, MACK","CASE","2471 SILVERBELL DR","CLEMENTINE CAFE LLC","BARTENDER","2/16/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210633564",38.4155558,-78.8467555],
["ACTBLUE","CASE, MACK","CASE","2471 SILVERBELL DR","CLEMENTINE CAFE LLC","BARTENDER","3/16/2020",6,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228625664",38.4155558,-78.8467555],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","CASEY, KEVIN","CASEY","246 MACALLISTER WAY","SELF-EMPLOYED","PHYSICIAN","2/21/2020",250,"http://docquery.fec.gov/cgi-bin/fecimg/?202007289261114050",38.3882048,-78.8172326999999],
["ACTBLUE","CASTANEDA, MATTHEW","CASTANEDA","27-F SOUTH AVE","NOT EMPLOYED","NOT EMPLOYED","2/24/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210637642",38.4333923,-78.8843065],
["ACTBLUE","CASTANEDA, MATTHEW","CASTANEDA","27-F SOUTH AVE","NOT EMPLOYED","NOT EMPLOYED","2/24/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210637643",38.4333923,-78.8843065],
["ACTBLUE","CASTANEDA, MATTHEW","CASTANEDA","27-F SOUTH AVE","NOT EMPLOYED","NOT EMPLOYED","3/12/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228628568",38.4333923,-78.8843065],
["ACTBLUE","CASTRO, EZRA","CASTRO","477 PHEASANT RUN CIRCLE","NOT EMPLOYED","NOT EMPLOYED","6/11/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255602801",38.42321,-78.8840199999999],
["ACTBLUE","CATALONE, DEENA","CATALONE","307 BLUE STONE HILLS DRIVE","NOT EMPLOYED","NOT EMPLOYED","1/16/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200266146",38.4224154,-78.8487706],
["ACTBLUE","CATALONE, DEENA","CATALONE","307 BLUE STONE HILLS DRIVE","NOT EMPLOYED","NOT EMPLOYED","2/16/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210641480",38.4224154,-78.8487706],
["ACTBLUE","CATALONE, DEENA","CATALONE","307 BLUE STONE HILLS DRIVE","NOT EMPLOYED","NOT EMPLOYED","3/16/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228631308",38.4224154,-78.8487706],
["ACTBLUE","CAVOTO, FRANCIS","CAVOTO","1644 CENTRAL AVENUE","NOT EMPLOYED","NOT EMPLOYED","3/8/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228633931",38.4304924,-78.8898557],
["DNC SERVICES CORP / DEMOCRATIC NATIONAL COMMITTEE","CESSNA, GRETCHEN","CESSNA","484 W BRUCE ST","HARRISONBURG CITY SCHOOLS","TEACHER","6/14/2020",400,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260675025",38.4488241,-78.8782263],
["ACTBLUE","CHANDLER, CRAIG","CHANDLER","3746 PORT REPUBLIC ROAD","NOT EMPLOYED","NOT EMPLOYED","1/15/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200274612",38.3819008,-78.8510708],
["ACTBLUE","CHANDLER, CRAIG","CHANDLER","3746 PORT REPUBLIC ROAD","NOT EMPLOYED","NOT EMPLOYED","1/6/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200274611",38.3819008,-78.8510708],
["ACTBLUE","CHANDLER, CRAIG","CHANDLER","3746 PORT REPUBLIC ROAD","NOT EMPLOYED","NOT EMPLOYED","1/28/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200274612",38.3819008,-78.8510708],
["ACTBLUE","CHANDLER, CRAIG","CHANDLER","3746 PORT REPUBLIC ROAD","NOT EMPLOYED","NOT EMPLOYED","2/8/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210654802",38.3819008,-78.8510708],
["WINRED","CHRISTOPHEL, REBECCA","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","1/8/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159216991581",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, REBECCA","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","1/8/2020",2,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159216992888",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, BA","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","1/31/2020",42,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217270422",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, REBECCA","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","3/31/2020",2,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159218003095",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, REBECCA","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","3/31/2020",2,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159218019157",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, REBECCA","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","1/31/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217252247",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, REBECCA","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","3/31/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159218028391",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, R.A.","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","4/16/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245299474",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, B. A.","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","5/31/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246261499",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, P. R.","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","6/1/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246326519",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, B. A.","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","4/16/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245301580",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, B. A.","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","4/16/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245298871",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, B. A.","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","4/16/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245309087",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, B. A.","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","5/31/2020",20,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246279057",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, B. A.","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","5/31/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246260321",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, R.A.","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","4/16/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245309768",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, B. A.","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","6/22/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246937391",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, B. A.","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","5/31/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246302390",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, P. R.","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","6/1/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246318243",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, R.A.","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","4/16/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245307095",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, BECKY","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","5/31/2020",4,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246270342",38.4267507,-78.8694259],
["WINRED","CHRISTOPHEL, BECKY","CHRISTOPHEL","920 OAK HILL DR","RETIRED","RETIRED","5/31/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246302955",38.4267507,-78.8694259],
["WINRED","CHURNEY, PETER","CHURNEY","84 SHARON ST","MEDIA ATLANTIC","PRODUCER","2/13/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217456641",38.4302995,-78.8925087],
["WINRED","CHURNEY, PETE","CHURNEY","84 SHARON ST","MEDIA ATLANTIC","HOST/PRODUCER","1/25/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217171405",38.4302995,-78.8925087],
["WINRED","CHURNEY, PETER","CHURNEY","84 SHARON ST","MEDIA ATLANTIC","PRODUCER","3/13/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217788845",38.4302995,-78.8925087],
["WINRED","CHURNEY, PETER","CHURNEY","84 SHARON ST","MEDIA ATLANTIC","PRODUCER","6/19/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246850161",38.4302995,-78.8925087],
["WINRED","CHURNEY, PETER","CHURNEY","84 SHARON ST","MEDIA ATLANTIC","PRODUCER","5/19/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246013764",38.4302995,-78.8925087],
["WINRED","CHURNEY, PETER","CHURNEY","84 SHARON ST","MEDIA ATLANTIC","PRODUCER","6/22/2020",125,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246929464",38.4302995,-78.8925087],
["WINRED","CHURNEY, PETER","CHURNEY","84 SHARON ST","MEDIA ATLANTIC","PRODUCER","4/13/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245247828",38.4302995,-78.8925087],
["WINRED","CHURNEY, PETER","CHURNEY","84 SHARON ST","MEDIA ATLANTIC","PRODUCER","5/10/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245805534",38.4302995,-78.8925087],
["ACTBLUE","CICA, JOVAN","CICA","95 DUTCH MILL CT APT C","X GAMBLER LLC","TRUCK DRIVER","3/12/2020",2,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228661176",38.4400581,-78.8547069],
["ACTBLUE","CICA, JOVAN","CICA","95 DUTCH MILL CT APT C","X GAMBLER LLC","TRUCK DRIVER","3/12/2020",20,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228661176",38.4400581,-78.8547069],
["ACTBLUE","CICA, JOVAN","CICA","95 DUTCH MILL CT APT C","X GAMBLER LLC","TRUCK DRIVER","3/21/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228661177",38.4400581,-78.8547069],
["ACTBLUE","CICA, JOVAN","CICA","95 DUTCH MILL CT APT C","X GAMBLER LLC","TRUCK DRIVER","3/21/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228661176",38.4400581,-78.8547069],
["ACTBLUE","CICA, JOVAN","CICA","95 DUTCH MILL CT APT C","X GAMBLER LLC","TRUCK DRIVER","5/24/2020",1.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240502704",38.4400581,-78.8547069],
["ACTBLUE","CICA, JOVAN","CICA","95 DUTCH MILL CT APT C","X GAMBLER LLC","TRUCK DRIVER","5/24/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240502704",38.4400581,-78.8547069],
["ACTBLUE","CICA, JOVAN","CICA","95 DUTCH MILL CT APT C","X GAMBLER LLC","TRUCK DRIVER","6/7/2020",1.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255639419",38.4400581,-78.8547069],
["ACTBLUE","CICA, JOVAN","CICA","95 DUTCH MILL CT APT C","X GAMBLER LLC","TRUCK DRIVER","6/13/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255639420",38.4400581,-78.8547069],
["ACTBLUE","CICA, JOVAN","CICA","95 DUTCH MILL CT APT C","X GAMBLER LLC","TRUCK DRIVER","6/20/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255639420",38.4400581,-78.8547069],
["ACTBLUE","CICA, JOVAN","CICA","95 DUTCH MILL CT APT C","X GAMBLER LLC","TRUCK DRIVER","6/20/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255639421",38.4400581,-78.8547069],
["ACTBLUE","CICA, JOVAN","CICA","95 DUTCH MILL CT APT C","X GAMBLER LLC","TRUCK DRIVER","6/27/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255639421",38.4400581,-78.8547069],
["ACTBLUE","CICA, JOVAN","CICA","95 DUTCH MILL CT APT C","X GAMBLER LLC","TRUCK DRIVER","6/7/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255639419",38.4400581,-78.8547069],
["ACTBLUE","CICA, JOVAN","CICA","95 DUTCH MILL CT APT C","X GAMBLER LLC","TRUCK DRIVER","6/13/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255639420",38.4400581,-78.8547069],
["ACTBLUE","CICA, JOVAN","CICA","95 DUTCH MILL CT APT C","X GAMBLER LLC","TRUCK DRIVER","6/27/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255639421",38.4400581,-78.8547069],
["ACTBLUE","CICCONE, JACKIE","CICCONE","237 EMERALD DRIVE","JAMES MADISON UNIVERSITY","COLLEGE ADMINISTRATOR","1/19/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200293186",38.4400581,-78.8547068999999],
["EMILY'S LIST","CLAGUE, NAOMA R. MS.","CLAGUE","977 W MOSBY RD.","0","0","4/7/2020",1000,"http://docquery.fec.gov/cgi-bin/fecimg/?202007219260715379",38.4190224,-78.914474],
["ACTBLUE","CLAGUE, ALLEN","CLAGUE","977 WEST MOSBY ROAD","NOT EMPLOYED","NOT EMPLOYED","1/28/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200295070",38.4190224,-78.914474],
["ACTBLUE","CLAGUE, ALLEN","CLAGUE","977 WEST MOSBY ROAD","NOT EMPLOYED","NOT EMPLOYED","1/1/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200295070",38.4190224,-78.914474],
["ACTBLUE","CLAGUE, ALLEN","CLAGUE","977 WEST MOSBY ROAD","NOT EMPLOYED","NOT EMPLOYED","2/28/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210686372",38.4190224,-78.914474],
["ACTBLUE","CLAGUE, ALLEN","CLAGUE","977 WEST MOSBY ROAD","NOT EMPLOYED","NOT EMPLOYED","3/28/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228663592",38.4190224,-78.914474],
["ACTBLUE","CLAGUE, ALLEN","CLAGUE","977 WEST MOSBY ROAD","NOT EMPLOYED","NOT EMPLOYED","4/28/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236239684",38.4190224,-78.914474],
["ACTBLUE","CLAGUE, ALLEN","CLAGUE","977 WEST MOSBY ROAD","NOT EMPLOYED","NOT EMPLOYED","5/28/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240504828",38.4190224,-78.914474],
["ACTBLUE","CLAGUE, ALLEN","CLAGUE","977 WEST MOSBY ROAD","NOT EMPLOYED","NOT EMPLOYED","6/28/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255642168",38.4190224,-78.914474],
["BERNIE 2020","CLANCEY, MATTHEW","CLANCEY","1032 CHESTNUT DR","CLEMENTINE","CHEF","2/13/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204134225",38.4404471,-78.8899442],
["BERNIE 2020","CLANCEY, MATTHEW","CLANCEY","1032 CHESTNUT DR","CLEMENTINE","CHEF","2/25/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204134226",38.4404471,-78.8899442],
["BERNIE 2020","CLANCEY, MATTHEW","CLANCEY","1032 CHESTNUT DR","CLEMENTINE","CHEF","2/20/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204134226",38.4404471,-78.8899442],
["BERNIE 2020","CLANCEY, MATTHEW","CLANCEY","1032 CHESTNUT DR","CLEMENTINE","CHEF","2/4/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204134224",38.4404471,-78.8899442],
["BERNIE 2020","CLANCEY, MATTHEW","CLANCEY","1035 CHESTNUT DR","CLEMENTINE","CHEF","1/11/2020",12,"http://docquery.fec.gov/cgi-bin/fecimg/?202002209186655120",38.4404471,-78.8899442],
["ACTBLUE","CLANCEY, MATT","CLANCEY","1032 CHESTNUT DR","CLEMENTINE","CHEF","1/11/2020",12,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200295235",38.4404471,-78.8899442],
["ACTBLUE","CLANCEY, MATTHEW","CLANCEY","1035 CHESTNUT DRIVE","CLEMENTINE","CHEF","2/20/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210686682",38.4404471,-78.8899442],
["ACTBLUE","CLANCEY, MATTHEW","CLANCEY","1035 CHESTNUT DRIVE","CLEMENTINE","CHEF","2/4/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210686681",38.4404471,-78.8899442],
["ACTBLUE","CLANCEY, MATTHEW","CLANCEY","1035 CHESTNUT DRIVE","CLEMENTINE","CHEF","2/13/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210686681",38.4404471,-78.8899442],
["ACTBLUE","CLANCEY, MATTHEW","CLANCEY","1035 CHESTNUT DRIVE","CLEMENTINE","CHEF","2/25/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210686682",38.4404471,-78.8899442],
["BERNIE 2020","CLANCEY, MATTHEW","CLANCEY","1032 CHESTNUT DR","CLEMENTINE","CHEF","3/3/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202004209219814861",38.4404471,-78.8899442],
["ACTBLUE","CLANCEY, MATTHEW","CLANCEY","1035 CHESTNUT DRIVE","CLEMENTINE","CHEF","3/3/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228663800",38.4404471,-78.8899442],
["WINRED","CLANCEY, PAUL","CLANCEY","261 EMERALD DR","RETIRED","RETIRED","3/26/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217923893",38.4233036,-78.8466031],
["WINRED","CLANCEY, PAUL","CLANCEY","261 EMERALD DR","RETIRED","RETIRED","5/13/2020",20,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245859144",38.4233036,-78.8466031],
["WINRED","CLANCEY, PAUL","CLANCEY","261 EMERALD DR","RETIRED","RETIRED","5/13/2020",20,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245862629",38.4233036,-78.8466031],
["WINRED","CLANCEY, PAUL","CLANCEY","261 EMERALD DR","RETIRED","RETIRED","4/30/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245601282",38.4233036,-78.8466031],
["ACTBLUE","CLAY, JULIE","CLAY","57 S MAIN ST STE 501","SELF","LICENSED PROFESSIONAL COUNSELOR","6/24/2020",37,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255650054",38.4486065,-78.8689615],
["ACTBLUE","CLOYD, TY","CLOYD","437 C SOUTH MASON STREET","ELKS LODGE","PURVEYOR","3/1/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228674741",38.4446925,-78.8681434],
["ACTBLUE","CLOYD, TY","CLOYD","437 C SOUTH MASON STREET","ELKS LODGE","PURVEYOR","3/1/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228674741",38.4446925,-78.8681434],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","2/10/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210705186",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","2/18/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210705187",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","2/18/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210705187",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","1/10/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200306877",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","1/25/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200306877",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","2/27/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210705188",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","2/27/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210705187",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","2/15/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210705186",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","2/5/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210705185",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","2/9/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210705186",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","3/1/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228677155",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","3/11/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228677157",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","3/2/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228677156",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","3/19/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228677157",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","3/2/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228677156",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","3/1/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228677155",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","3/17/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228677157",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","3/31/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228677158",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","3/5/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228677156",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","4/14/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236251278",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","4/30/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236251278",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","5/26/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240517542",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","5/5/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240517541",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","5/3/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240517541",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","5/19/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240517542",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","6/11/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255658729",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","6/28/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255658729",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","6/28/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255658730",38.4168527,-78.863588],
["ACTBLUE","COCKING, DEAN","COCKING","1189 NELSON DR","NOT EMPLOYED","NOT EMPLOYED","6/8/2020",8,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255658729",38.4168527,-78.863588],
["ACTBLUE","COE, BETSY","COE","3366 REDBUD LANE","NOT EMPLOYED","NOT EMPLOYED","1/15/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200307305",38.4447121,-78.9229371],
["ACTBLUE","COE, BETSY","COE","3366 REDBUD LANE","NOT EMPLOYED","NOT EMPLOYED","1/15/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200307306",38.4447121,-78.9229371],
["ACTBLUE","COE, BETSY","COE","3366 REDBUD LANE","NOT EMPLOYED","NOT EMPLOYED","4/2/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236251673",38.4447121,-78.9229371],
["WINRED","COFFEY, DONALD","COFFEY","1750","RETIRED","RETIRED","1/14/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217054391",38.4480295,-78.9042957],
["WINRED","COFFEY, DONALD","COFFEY","1750","RETIRED","RETIRED","2/18/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217504666",38.4480295,-78.9042957],
["WINRED","COFFEY, DONALD","COFFEY","1750","RETIRED","RETIRED","1/31/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217270787",38.4480295,-78.9042957],
["WINRED","COFFEY, DONALD","COFFEY","1750","RETIRED","RETIRED","2/18/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217500281",38.4480295,-78.9042957],
["WINRED","COFFEY, DONALD","COFFEY","1750 SHERRY LN","RETIRED","RETIRED","4/29/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245568429",38.4480295,-78.9042957],
["WINRED","COFFEY, DONALD","COFFEY","1750 SHERRY LN","RETIRED","RETIRED","5/5/2020",20,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245731199",38.4480295,-78.9042957],
["ACTBLUE","COLLIER, JOHN","COLLIER","103 BLUE STONE HILLS DRIVE","NOT EMPLOYED","NOT EMPLOYED","1/15/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200315781",38.4215777,,-78.8417371],
["ACTBLUE","COLLIER, JOHN","COLLIER","103 BLUE STONE HILLS DRIVE","NOT EMPLOYED","NOT EMPLOYED","1/30/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200315783",38.4215777,,-78.8417372],
["ACTBLUE","COLLIER, JOHN","COLLIER","103 BLUE STONE HILLS DRIVE","NOT EMPLOYED","NOT EMPLOYED","2/21/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210719045",38.4215777,,-78.8417373],
["ACTBLUE","COLLIER, JOHN","COLLIER","103 BLUE STONE HILLS DRIVE","NOT EMPLOYED","NOT EMPLOYED","2/25/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210719045",38.4215777,,-78.8417374],
["ACTBLUE","COLLIER, WILLIAM","COLLIER","103 BLUE STONE HILLS DRIVE","JMU","LECTURER","5/12/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240527441",38.4215777,,-78.8417375],
["ACTBLUE","CONCHAS, SIERRA","CONCHAS","242 EAST WATER STREET","NOT EMPLOYED","NOT EMPLOYED","1/15/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200321064",38.4480423,-78.8658490999999],
["ACTBLUE","CONCHAS, SIERRA","CONCHAS","242 EAST WATER STREET","NOT EMPLOYED","NOT EMPLOYED","1/29/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200321065",38.4480423,-78.8658490999999],
["ACTBLUE","CONCHAS, SIERRA","CONCHAS","242 EAST WATER STREET","NOT EMPLOYED","NOT EMPLOYED","1/22/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200321064",38.4480423,-78.8658490999999],
["ACTBLUE","CONCHAS, SIERRA","CONCHAS","242 EAST WATER STREET","NOT EMPLOYED","NOT EMPLOYED","2/12/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210727577",38.4480423,-78.8658490999999],
["ACTBLUE","CONCHAS, SIERRA","CONCHAS","242 EAST WATER STREET","NOT EMPLOYED","NOT EMPLOYED","2/19/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210727578",38.4480423,-78.8658490999999],
["ACTBLUE","CONCHAS, SIERRA","CONCHAS","242 EAST WATER STREET","NOT EMPLOYED","NOT EMPLOYED","2/26/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210727578",38.4480423,-78.8658490999999],
["ACTBLUE","CONCHAS, SIERRA","CONCHAS","242 EAST WATER STREET","NOT EMPLOYED","NOT EMPLOYED","2/5/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210727577",38.4480423,-78.8658490999999],
["ACTBLUE","CONELL, RENEE","CONELL","1470 CUMBERLAND DRIVE","NOT EMPLOYED","NOT EMPLOYED","3/29/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228694299",38.3904751,-78.8457981],
["ACTBLUE","CONELL, RENEE","CONELL","1470 CUMBERLAND DRIVE","NOT EMPLOYED","NOT EMPLOYED","5/29/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240533190",38.3904751,-78.8457981],
["ACTBLUE","CONELL, RENEE","CONELL","1470 CUMBERLAND DRIVE","NOT EMPLOYED","NOT EMPLOYED","6/26/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255679372",38.3904751,-78.8457981],
["ACTBLUE","CONELL, RENEE","CONELL","1470 CUMBERLAND DRIVE","NOT EMPLOYED","NOT EMPLOYED","6/19/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255679372",38.3904751,-78.8457981],
["ACTBLUE","CONELL, RENEE","CONELL","1470 CUMBERLAND DRIVE","NOT EMPLOYED","NOT EMPLOYED","6/5/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255679371",38.3904751,-78.8457981],
["ACTBLUE","CONELL, RENEE","CONELL","1470 CUMBERLAND DRIVE","NOT EMPLOYED","NOT EMPLOYED","6/12/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255679372",38.3904751,-78.8457981],
["ACTBLUE","CONERY, KATHLEEN","CONERY","75 PERRY STREET","JAMES MADISON UNIVERSITY","STAFF","12/31/2019",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202001299168865421",38.430352,-78.8913591],
["ACTBLUE","CONERY, KATHLEEN","CONERY","75 PERRY STREET","JAMES MADISON UNIVERSITY","STAFF","12/31/2019",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202001299168865421",38.430352,-78.8913591],
["ACTBLUE","CONERY, KATHLEEN","CONERY","75 PERRY ST","JAMES MADISON UNIVERSITY","INSTRUCTOR/MANAGER","1/31/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200321639",38.430352,-78.8913591],
["ACTBLUE","CONSTANTIN, ANCA","CONSTANTIN","1445 BUTLER ST","JMU","PROFESSOR","1/29/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200325573",38.4286491,-78.8782263],
["ACTBLUE","CONSTANTIN, ANCA","CONSTANTIN","1445 BUTLER ST","JMU","PROFESSOR","2/26/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210734960",38.4286491,-78.8782263],
["ACTBLUE","CONSTANTIN, ANCA","CONSTANTIN","1445 BUTLER ST","JMU","PROFESSOR","2/29/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210734960",38.4286491,-78.8782263],
["ACTBLUE","COPELAND, CATHY","COPELAND","1153 NELSON DR","JAMES MADISON UNIVERSITY","ADJUNCT INSTRUCTOR","1/15/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200332339",38.4187371,-78.8601602999999],
["ACTBLUE","COPELAND, CATHY","COPELAND","1153 NELSON DR","JAMES MADISON UNIVERSITY","ADJUNCT INSTRUCTOR","1/28/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200332339",38.4187371,-78.8601602999999],
["ACTBLUE","COPELAND, CATHY","COPELAND","1153 NELSON DR","JAMES MADISON UNIVERSITY","ADJUNCT INSTRUCTOR","2/13/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210745413",38.4187371,-78.8601602999999],
["ACTBLUE","COPELAND, CATHY","COPELAND","1153 NELSON DR","JAMES MADISON UNIVERSITY","ADJUNCT INSTRUCTOR","2/17/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210745413",38.4187371,-78.8601602999999],
["ACTBLUE","COPELAND, ADAM","COPELAND","1153 NELSON DRIVE","STUDY GROUP","AVP, OPERATIONS","6/14/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255694040",38.4187371,-78.8601602999999],
["ACTBLUE","COPITHORN, FRED","COPITHORN","680 NEW YORK AVE","NOT EMPLOYED","NOT EMPLOYED","1/8/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200332716",38.446668,-78.8847487],
["ACTBLUE","COPITHORN, FRED","COPITHORN","680 NEW YORK AVE","NOT EMPLOYED","NOT EMPLOYED","2/16/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210745953",38.446668,-78.8847487],
["ACTBLUE","COPITHORN, FRED","COPITHORN","680 NEW YORK AVE","NOT EMPLOYED","NOT EMPLOYED","4/5/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236275922",38.446668,-78.8847487],
["ACTBLUE","COPITHORN, FRED","COPITHORN","680 NEW YORK AVE","NOT EMPLOYED","NOT EMPLOYED","4/10/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236275922",38.446668,-78.8847487],
["ACTBLUE","COPITHORN, FRED","COPITHORN","680 NEW YORK AVE","NOT EMPLOYED","NOT EMPLOYED","5/23/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240544672",38.446668,-78.8847487],
["ACTBLUE","COPITHORN, FRED","COPITHORN","680 NEW YORK AVE","NOT EMPLOYED","NOT EMPLOYED","5/6/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240544672",38.446668,-78.8847487],
["REPUBLICAN NATIONAL COMMITTEE","COSBY, STEPHEN","COSBY","141 ELGIN CT","THE COSBY CO","CONSTRUCTION","6/9/2020",62.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260472683",38.390271,-78.8155221],
["REPUBLICAN NATIONAL COMMITTEE","COSBY, STEPHEN","COSBY","141 ELGIN CT","THE COSBY CO","CONSTRUCTION","6/14/2020",62.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260472683",38.390271,-78.8155221],
["ACTBLUE","COSTELLO, ANDREW","COSTELLO","1707 DEVON LN 1707","NOT EMPLOYED","NOT EMPLOYED","2/2/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210756084",38.4189433,-78.875982],
["ACTBLUE","COSTELLO, ANDREW","COSTELLO","1707 DEVON LN 1707","NOT EMPLOYED","NOT EMPLOYED","2/17/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210756088",38.4189433,-78.875982],
["BIDEN FOR PRESIDENT","COTTRELL, DAVID","COTTRELL","486 MYERS AVE","JAMES MADISON UNIVERSITY","PROFESSOR","2/25/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209215542009",38.4411475,-78.8637648999999],
["ACTBLUE","COTTRELL, DAVID","COTTRELL","486 MYERS AVE","JAMES MADISON UNIVERSITY","UNIVERSITY PROFESSOR","1/25/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200340398",38.4411475,-78.8637648999999],
["ACTBLUE","COTTRELL, DAVID","COTTRELL","486 MYERS AVE","JAMES MADISON UNIVERSITY","UNIVERSITY PROFESSOR","1/4/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200340397",38.4411475,-78.8637648999999],
["ACTBLUE","COTTRELL, DAVID","COTTRELL","486 MYERS AVE","JAMES MADISON UNIVERSITY","UNIVERSITY PROFESSOR","2/4/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210758406",38.4411475,-78.8637648999999],
["ACTBLUE","COTTRELL, DAVID","COTTRELL","486 MYERS AVE","JAMES MADISON UNIVERSITY","UNIVERSITY PROFESSOR","2/25/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210758407",38.4411475,-78.8637648999999],
["BIDEN FOR PRESIDENT","COTTRELL, DAVID","COTTRELL","486 MYERS AVE","JAMES MADISON UNIVERSITY","PROFESSOR","3/25/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004209224185957",38.4411475,-78.8637648999999],
["BIDEN FOR PRESIDENT","COTTRELL, DAVID","COTTRELL","486 MYERS AVE","JAMES MADISON UNIVERSITY","PROFESSOR","7/18/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202008209266480649",38.4411475,-78.8637648999999],
["BIDEN FOR PRESIDENT","COTTRELL, DAVID","COTTRELL","486 MYERS AVE","JAMES MADISON UNIVERSITY","PROFESSOR","7/25/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202008209266480650",38.4411475,-78.8637648999999],
["BIDEN FOR PRESIDENT","COTTRELL, DAVID","COTTRELL","486 MYERS AVE","JAMES MADISON UNIVERSITY","PROFESSOR","1/25/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159219498463",38.4411475,-78.8637648999999],
["ACTBLUE","COTTRELL, DAVID","COTTRELL","486 MYERS AVE","JAMES MADISON UNIVERSITY","UNIVERSITY PROFESSOR","3/25/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228715720",38.4411475,-78.8637648999999],
["ACTBLUE","COTTRELL, DAVID","COTTRELL","486 MYERS AVE","JAMES MADISON UNIVERSITY","UNIVERSITY PROFESSOR","4/25/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236282774",38.4411475,-78.8637648999999],
["BIDEN FOR PRESIDENT","COTTRELL, DAVID","COTTRELL","486 MYERS AVE","JAMES MADISON UNIVERSITY","PROFESSOR","4/25/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239370329",38.4411475,-78.8637648999999],
["BIDEN FOR PRESIDENT","COTTRELL, DAVID","COTTRELL","486 MYERS AVE","JAMES MADISON UNIVERSITY","PROFESSOR","5/25/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243727729",38.4411475,-78.8637648999999],
["ACTBLUE","COTTRELL, DAVID","COTTRELL","486 MYERS AVE","JAMES MADISON UNIVERSITY","UNIVERSITY PROFESSOR","5/25/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240552149",38.4411475,-78.8637648999999],
["BIDEN FOR PRESIDENT","COTTRELL, DAVID","COTTRELL","486 MYERS AVE","JAMES MADISON UNIVERSITY","PROFESSOR","6/25/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260527617",38.4411475,-78.8637648999999],
["ACTBLUE","COTTRELL, DAVID","COTTRELL","486 MYERS AVE","JAMES MADISON UNIVERSITY","UNIVERSITY PROFESSOR","6/25/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255705620",38.4411475,-78.8637648999999],
["ACTBLUE","COULTER, PHYLLIS","COULTER","475 OTT ST","NOT EMPLOYED","NOT EMPLOYED","1/20/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200341176",38.4428934,-78.8658878],
["ACTBLUE","COULTER, PHYLLIS","COULTER","475 OTT ST","NOT EMPLOYED","NOT EMPLOYED","4/12/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236283461",38.4428934,-78.8658878],
["ACTBLUE","COX, PAM","COX","561 MARYLAND AVE","NOT EMPLOYED","NOT EMPLOYED","3/15/2020",19,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228720775",38.444869,-78.8860973],
["REPUBLICAN NATIONAL COMMITTEE","CRAWFORD, WAYNE E. MR.","CRAWFORD","624 HAWKINS STREET","WAYNES HAIR DESIGNS","HAIR STYLIST","4/1/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239157679",38.4462124,-78.8547863],
["REPUBLICAN NATIONAL COMMITTEE","CRAWFORD, WAYNE E. MR.","CRAWFORD","624 HAWKINS STREET","WAYNES HAIR DESIGNS","HAIR STYLIST","1/6/2020",28.75,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239192024",38.4462124,-78.8547863],
["REPUBLICAN NATIONAL COMMITTEE","CRAWFORD, WAYNE E. MR.","CRAWFORD","624 HAWKINS STREET","WAYNES HAIR DESIGNS","HAIR STYLIST","2/26/2020",28.75,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239192025",38.4462124,-78.8547863],
["REPUBLICAN NATIONAL COMMITTEE","CRAWFORD, WAYNE E. MR.","CRAWFORD","624 HAWKINS STREET","WAYNES HAIR DESIGNS","HAIR STYLIST","4/24/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239178333",38.4462124,-78.8547863],
["REPUBLICAN NATIONAL COMMITTEE","CRAWFORD, WAYNE E. MR.","CRAWFORD","624 HAWKINS STREET","WAYNES HAIR DESIGNS","HAIR STYLIST","1/29/2020",28.75,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239192025",38.4462124,-78.8547863],
["REPUBLICAN NATIONAL COMMITTEE","CRAWFORD, WAYNE E. MR.","CRAWFORD","624 HAWKINS STREET","WAYNES HAIR DESIGNS","HAIR STYLIST","3/13/2020",28.75,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209239192025",38.4462124,-78.8547863],
["DONALD J. TRUMP FOR PRESIDENT, INC.","CRAWFORD, WAYNE E MR","CRAWFORD","624 HAWKINS ST","WAYNES HAIR DESIGNS","HAIR STYLIST","5/1/2020",90,"http://docquery.fec.gov/cgi-bin/fecimg/?202008209266300179",38.4462124,-78.8547863],
["DONALD J. TRUMP FOR PRESIDENT, INC.","CRAWFORD, WAYNE E MR","CRAWFORD","624 HAWKINS ST","WAYNES HAIR DESIGNS","HAIR STYLIST","1/6/2020",86.25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006179239857933",38.4462124,-78.8547863],
["DONALD J. TRUMP FOR PRESIDENT, INC.","CRAWFORD, WAYNE E MR","CRAWFORD","624 HAWKINS ST","WAYNES HAIR DESIGNS","HAIR STYLIST","1/29/2020",86.25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006179239857934",38.4462124,-78.8547863],
["REPUBLICAN NATIONAL COMMITTEE","CRAWFORD, WAYNE E. MR.","CRAWFORD","624 HAWKINS STREET","WAYNES HAIR DESIGNS","HAIR STYLIST","5/1/2020",120,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243838735",38.4462124,-78.8547863],
["REPUBLICAN NATIONAL COMMITTEE","CRAWFORD, WAYNE E. MR.","CRAWFORD","624 HAWKINS STREET","WAYNES HAIR DESIGNS","HAIR STYLIST","5/13/2020",116,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243855096",38.4462124,-78.8547863],
["REPUBLICAN NATIONAL COMMITTEE","CRAWFORD, WAYNE E. MR.","CRAWFORD","624 HAWKINS STREET","WAYNES HAIR DESIGNS","HAIR STYLIST","5/21/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243866576",38.4462124,-78.8547863],
["REPUBLICAN NATIONAL COMMITTEE","CRAWFORD, WAYNE E. MR.","CRAWFORD","624 HAWKINS STREET","WAYNES HAIR DESIGNS","HAIR STYLIST","5/29/2020",90,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243877107",38.4462124,-78.8547863],
["REPUBLICAN NATIONAL COMMITTEE","CRAWFORD, WAYNE E. MR.","CRAWFORD","624 HAWKINS STREET","WAYNES HAIR DESIGNS","HAIR STYLIST","5/1/2020",30,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243889496",38.4462124,-78.8547863],
["DONALD J. TRUMP FOR PRESIDENT, INC.","CRAWFORD, WAYNE E","CRAWFORD","624 HAWKINS ST","WAYNES HAIR DESIGNS","HAIR STYLIST","2/26/2020",86.25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007279260871620",38.4462124,-78.8547863],
["DONALD J. TRUMP FOR PRESIDENT, INC.","CRAWFORD, WAYNE E","CRAWFORD","624 HAWKINS ST","WAYNES HAIR DESIGNS","HAIR STYLIST","3/13/2020",86.25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007279260871620",38.4462124,-78.8547863],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","CRAWFORD, WAYNE E","CRAWFORD","624 HAWKINS ST","WAYNES HAIR DESIGNS","HAIR STYLIST","1/6/2020",115,"http://docquery.fec.gov/cgi-bin/fecimg/?202007289261117240",38.4462124,-78.8547863],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","CRAWFORD, WAYNE","CRAWFORD","624 HAWKINS ST","WAYNES HAIR DESIGNS","HAIR STYLIST","1/29/2020",115,"http://docquery.fec.gov/cgi-bin/fecimg/?202007289261117241",38.4462124,-78.8547863],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","CRAWFORD, WAYNE","CRAWFORD","624 HAWKINS ST","WAYNES HAIR DESIGNS","HAIR STYLIST","2/26/2020",115,"http://docquery.fec.gov/cgi-bin/fecimg/?202007289261117241",38.4462124,-78.8547863],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","CRAWFORD, WAYNE","CRAWFORD","624 HAWKINS ST","WAYNES HAIR DESIGNS","HAIR STYLIST","3/13/2020",115,"http://docquery.fec.gov/cgi-bin/fecimg/?202007289261117241",38.4462124,-78.8547863],
["REPUBLICAN NATIONAL COMMITTEE","CRAWFORD, WAYNE E. MR.","CRAWFORD","624 HAWKINS STREET","SELF-EMPLOYED","SELF-EMPLOYED","6/15/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260425753",38.4462124,-78.8547863],
["REPUBLICAN NATIONAL COMMITTEE","CRAWFORD, WAYNE E. MR.","CRAWFORD","624 HAWKINS STREET","SELF-EMPLOYED","SELF-EMPLOYED","6/12/2020",11.25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260472877",38.4462124,-78.8547863],
["ACTBLUE","CREASY, JUSTIN","CREASY","431 OHIO AVE","NO THANKS","SOFTWARE DEVELOPER","3/1/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228726715",38.4449171,-78.882781],
["ACTBLUE","CRIPE, CLAIR","CRIPE","2846 FLINT AVENUE","NOT EMPLOYED","NOT EMPLOYED","1/18/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200351662",38.4488122,-78.9171772999999],
["ACTBLUE","CRIPE, CLAIR","CRIPE","2846 FLINT AVENUE","NOT EMPLOYED","NOT EMPLOYED","1/16/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200351661",38.4488122,-78.9171772999999],
["ACTBLUE","CRIPE, CLAIR","CRIPE","2846 FLINT AVENUE","NOT EMPLOYED","NOT EMPLOYED","2/14/2020",20.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210776217",38.4488122,-78.9171772999999],
["ACTBLUE","CRIPE, CLAIR","CRIPE","2846 FLINT AVENUE","NOT EMPLOYED","NOT EMPLOYED","2/16/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210776217",38.4488122,-78.9171772999999],
["ACTBLUE","CRITTENDEN, SARAH","CRITTENDEN","221 WEST GRACE ST","MR. J'S BAGELS & DELI","ASSISTANT MANAGER","3/4/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228729105",38.4441447,-78.879376],
["ACTBLUE","CRITTENDEN, SARAH","CRITTENDEN","221 WEST GRACE ST","MR. J'S BAGELS & DELI","ASSISTANT MANAGER","3/6/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228729106",38.4441447,-78.879376],
["ACTBLUE","CRITTENDEN, SARAH","CRITTENDEN","221 WEST GRACE ST","MR. J'S BAGELS & DELI","ASSISTANT MANAGER","3/4/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228729106",38.4441447,-78.879376],
["ACTBLUE","CRYDER, SANDRA","CRYDER","338 OTT STREET","NOT EMPLOYED","NOT EMPLOYED","6/2/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255729188",38.4451313,-78.8642514],
["ACTBLUE","CUMMINGS, TIMOTHY","CUMMINGS","441 MARYLAND AVE","SELF","SALES","1/23/2020",0.6,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200360146",38.4437291,-78.885213],
["ACTBLUE","CUMMINGS, TIMOTHY","CUMMINGS","441 MARYLAND AVE","SELF","SALES","1/23/2020",6,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200360146",38.4437291,-78.885213],
["ACTBLUE","CUMMINGS, TIMOTHY","CUMMINGS","441 MARYLAND AVE","SELF","SALES","2/23/2020",0.6,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210789738",38.4437291,-78.885213],
["ACTBLUE","CUMMINGS, TIMOTHY","CUMMINGS","441 MARYLAND AVE","SELF","SALES","2/23/2020",6,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210789737",38.4437291,-78.885213],
["ACTBLUE","CUMMINGS, TIMOTHY","CUMMINGS","441 MARYLAND AVE","SELF","SALES","3/23/2020",0.6,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228737915",38.4437291,-78.885213],
["ACTBLUE","CUMMINGS, TIMOTHY","CUMMINGS","441 MARYLAND AVE","SELF","SALES","3/10/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228737915",38.4437291,-78.885213],
["ACTBLUE","CUMMINGS, TIMOTHY","CUMMINGS","441 MARYLAND AVE","SELF","SALES","3/23/2020",6,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228737916",38.4437291,-78.885213],
["TRUMP MAKE AMERICA GREAT AGAIN COMMITTEE","CUPP, GARY","CUPP","210 WAKEFIELD PL","SELF-EMPLOYED","IT SERVICE","6/3/2020",250,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159250208489",38.435224,-78.8906185],
["REPUBLICAN NATIONAL COMMITTEE","CUPP, GAYLE","CUPP","3939 PIRKEY LANE","GAYLE'S MARKET","STORE","6/5/2020",42,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260409781",38.3795904,-78.8491124],
["REPUBLICAN NATIONAL COMMITTEE","CUPP, GAYLE","CUPP","3939 PIRKEY LANE","GAYLE'S MARKET","STORE","6/18/2020",42,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260436423",38.3795904,-78.8491124],
["REPUBLICAN NATIONAL COMMITTEE","CUPP, GAYLE","CUPP","3939 PIRKEY LANE","GAYLE'S MARKET","STORE","6/18/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260436971",38.3795904,-78.8491124],
["REPUBLICAN NATIONAL COMMITTEE","CUPP, GAYLE","CUPP","3939 PIRKEY LANE","GAYLE'S MARKET","STORE","6/18/2020",45,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260436971",38.3795904,-78.8491124],
["ACTBLUE","CURRY, ANITA","CURRY","1351 SPARROW COURT","SENTARA","ADMINISTRATION","6/16/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255736930",38.44845,-78.841611],
["ACTBLUE","CUSTER, ANNE","CUSTER","242 E WATER ST APT 410","AMERICORPS","VISTA","1/19/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200364965",38.4480423,-78.8658490999999],
["ACTBLUE","CUSTER, ANNE","CUSTER","242 E WATER ST APT 410","AMERICORPS","VISTA","2/19/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210796992",38.4480423,-78.8658490999999],
["ACTBLUE","CUSTER, ANNE","CUSTER","242 E WATER ST APT 410","AMERICORPS","VISTA","3/19/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228743107",38.4480423,-78.8658490999999],
["WINRED","DALY, VICKY","DALY","498 UNIVERSITY BLVD","SELF-EMPLOYED","VETERINARIAN","3/10/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217757707",38.4285771,-78.8548084],
["WINRED","DALY, JOHN","DALY","498 UNIVERSITY BLVD","RETIRED","INVESTOR","2/20/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202004159217521836",38.4285771,-78.8548084],
["DONALD J. TRUMP FOR PRESIDENT, INC.","DALY, JOHN","DALY","498 UNIVERSITY BLVD","RETIRED","RETIRED","2/20/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202005119232647143",38.4285771,-78.8548084],
["DONALD J. TRUMP FOR PRESIDENT, INC.","DALY, VICKY","DALY","493 UNIVERSITY BLVD","SELF-EMPLOYED","VETERINARIAN","6/28/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202008209266202995",38.4289549,-78.8553301],
["DONALD J. TRUMP FOR PRESIDENT, INC.","DALY, VICKY","DALY","493 UNIVERSITY BLVD","SELF-EMPLOYED","VETERINARIAN","6/24/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202008209266202995",38.4289549,-78.8553301],
["WINRED","DALY, JOHN","DALY","498 UNIVERSITY BLVD","SELF-EMPLOYED","VET","5/13/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245872064",38.4285771,-78.8548084],
["WINRED","DALY, VICKY","DALY","498 UNIVERSITY BLVD","SELF-EMPLOYED","VETERINARIAN","6/28/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159247152708",38.4285771,-78.8548084],
["WINRED","DALY, VICKY","DALY","498 UNIVERSITY BLVD","SELF-EMPLOYED","VETERINARIAN","6/24/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246979791",38.4285771,-78.8548084],
["WINRED","DALY, JOHN","DALY","498 UNIVERSITY BLVD","SELF-EMPLOYED","VET","6/15/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159246762746",38.4285771,-78.8548084],
["DONALD J. TRUMP FOR PRESIDENT, INC.","DALY, VICKY","DALY","493 UNIVERSITY BLVD","VALLEY VETERINARY HOSPITAL","VETERINARIAN","3/10/2020",26.25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007279260872473",38.4289549,-78.8553301],
["ACTBLUE","DANIELS, DANNY","DANIELS","760 ANGLE DRIVE","MERCK","PHARMACEUTICAL","6/8/2020",12.26,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255750160",38.4211769,-78.8571063],
["ACTBLUE","DASILVA, KAYLA","DASILVA","654 JOHN TYLER CIR 304","NEXTPOINT GROUP LLC","EVENT PLANNER","2/19/2020",20,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210815579",38.419653,-78.8818929999999],
["ACTBLUE","DASILVA, KAYLA","DASILVA","654 JOHN TYLER CIR 304","NEXTPOINT GROUP LLC","EVENT PLANNER","2/11/2020",18,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210815579",38.419653,-78.8818929999999],
["ACTBLUE","DAUGHERTY, CODY","DAUGHERTY","130 COLONIAL DR APT E","SENTARA RMH","ADMITTING REP","2/19/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210816415",38.4314511,-78.8967246],
["ACTBLUE","DAVIS, SUMMER","DAVIS","85 CAMPBELL STREET APT C1","NOT EMPLOYED","NOT EMPLOYED","2/19/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210829705",38.4446682,-78.8691604999999],
["ACTBLUE","DAVIS, SUMMER","DAVIS","85 CAMPBELL STREET APT C1","NOT EMPLOYED","NOT EMPLOYED","2/19/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210829704",38.4446682,-78.8691604999999],
["ACTBLUE","DAVIS, SYBIL","DAVIS","2525 DAWSON DRIVE 101","NCCI","INSPECTOR","4/22/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236325060",38.4041845,-78.8703716999999],
["ACTBLUE","DAVIS, SYBIL","DAVIS","2525 DAWSON DRIVE 101","NCCI","INSPECTOR","6/13/2020",7,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255767560",38.4041845,-78.8703716999999],
["ACTBLUE","DE HERTOGH, LORI BETH","DE HERTOGH","1190 WESTMORELAND DR","JAMES MADISON UNIVERSITY","PROFESSOR","6/5/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255772225",38.4191005,-78.8641629999999],
["ACTBLUE","DE LA CRUZ, MICHELLE","DE LA CRUZ","245 JERICHO ROAD","NOT EMPLOYED","NOT EMPLOYED","4/19/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236328455",38.4083129,-78.9144366],
["ACTBLUE","DE LA CRUZ, MICHELLE","DE LA CRUZ","245 JERICHO ROAD","NOT EMPLOYED","NOT EMPLOYED","4/19/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236328455",38.4083129,-78.9144366],
["ACTBLUE","DE WAAL, MARIJN","DE WAAL","529 S MASON STREET","JAMES MADISON UNIVERSITY","PROFESSOR","2/19/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210837437",38.4428829999999,-78.8693772],
["ACTBLUE","DEAN, ZACKERY","DEAN","1177 DEVON LANE APT G","UVA","DONOR RELATIONS ASSOCIATE","1/24/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200391468",38.4246303,-78.8686266],
["ACTBLUE","DEAN, ZACKERY","DEAN","1177 DEVON LANE APT G","UVA","DONOR RELATIONS ASSOCIATE","1/31/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200391468",38.4246303,-78.8686266],
["ACTBLUE","DEAN, ZACKERY","DEAN","1177 DEVON LANE APT G","UVA","DONOR RELATIONS ASSOCIATE","2/16/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210839110",38.4246303,-78.8686266],
["ACTBLUE","DEAN, ZACKERY","DEAN","1177 DEVON LANE APT G","UVA","DONOR RELATIONS ASSOCIATE","2/16/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210839111",38.4246303,-78.8686266],
["ACTBLUE","DEAN, ZACKERY","DEAN","1177 DEVON LANE APT G","UVA","DONOR RELATIONS ASSOCIATE","2/24/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210839111",38.4246303,-78.8686266],
["ACTBLUE","DEAN, ZACKERY","DEAN","1177 DEVON LANE APT G","UVA","DONOR RELATIONS ASSOCIATE","3/4/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228773077",38.4246303,-78.8686266],
["ACTBLUE","DEATON, JUSTIN","DEATON","1170 NELSON DRIVE","SSA","ATTORNEY","1/31/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200392166",,],
["ACTBLUE","DELBIONDO, MIKE","DELBIONDO","2363 BRECKENRIDGE CT","MERCY HOUSE INC.","MANAGER","6/3/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255784602",,],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","SELF EMPLOYED","TECHNICAL WRITER","2/10/2020",2.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210090431",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","SELF EMPLOYED","TECHNICAL WRITER","2/20/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210090434",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","SELF EMPLOYED","TECHNICAL WRITER","2/25/2020",46,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210090436",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","SELF EMPLOYED","TECHNICAL WRITER","2/10/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210090430",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","SELF EMPLOYED","TECHNICAL WRITER","2/11/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210090431",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","SELF EMPLOYED","TECHNICAL WRITER","2/14/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210090433",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","SELF EMPLOYED","TECHNICAL WRITER","2/20/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210090435",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","SELF EMPLOYED","TECHNICAL WRITER","2/27/2020",20.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210090436",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","SELF EMPLOYED","TECHNICAL WRITER","2/29/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210090438",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","SELF EMPLOYED","TECHNICAL WRITER","2/6/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210090429",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","SELF EMPLOYED","TECHNICAL WRITER","2/6/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210090429",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","SELF EMPLOYED","TECHNICAL WRITER","2/27/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210090437",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","SELF EMPLOYED","TECHNICAL WRITER","2/12/2020",70,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210090432",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","SELF EMPLOYED","TECHNICAL WRITER","2/13/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210090432",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","SELF EMPLOYED","TECHNICAL WRITER","2/18/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210090434",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","ROSETTA STONE","TECHNICAL WRITER","1/28/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002209187109753",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","ROSETTA STONE","TECHNICAL WRITER","1/23/2020",115.58,"http://docquery.fec.gov/cgi-bin/fecimg/?202002209187109752",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","ROSETTA STONE","TECHNICAL WRITER","1/22/2020",81.09,"http://docquery.fec.gov/cgi-bin/fecimg/?202002209187109751",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","ROSETTA STONE","TECHNICAL WRITER","1/27/2020",20.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202002209187109752",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","ROSETTA STONE","TECHNICAL WRITER","1/9/2020",56.38,"http://docquery.fec.gov/cgi-bin/fecimg/?202002209187109750",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","ROSETTA STONE","TECHNICAL WRITER","1/14/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202002209187109751",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","1/27/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200404122",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","1/27/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200404121",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","1/21/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200404120",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","1/23/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200404121",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","1/27/2020",20.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200404121",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","1/28/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200404122",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","1/7/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200404118",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","1/7/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200404118",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","1/14/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200404120",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","1/11/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200404119",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","1/29/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200404122",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","1/13/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200404120",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","1/29/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200404123",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","1/3/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200404117",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","1/3/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200404117",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","1/8/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200404118",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","1/12/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200404119",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","1/6/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200404117",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","1/9/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200404119",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","1/30/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200404123",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/10/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859493",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/26/2020",2.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859504",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/18/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859500",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/27/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859505",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/10/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859493",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/6/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859490",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/11/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859494",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/7/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859491",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/14/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859499",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/14/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859499",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/27/2020",20.2,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859506",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/10/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859493",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/13/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859495",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/21/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859502",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/23/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859503",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/5/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859490",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/6/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859491",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/29/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859506",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/14/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859497",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/22/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859502",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/22/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859502",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/29/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859507",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/29/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859507",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/6/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859491",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/10/2020",2.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859494",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/14/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859497",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/14/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859498",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/29/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859507",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/6/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859490",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/12/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859495",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/14/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859498",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/26/2020",2.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859504",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/27/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859504",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/9/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859492",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/11/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859494",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/14/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859499",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/18/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859500",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/10/2020",2.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859492",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/4/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859489",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/13/2020",1.5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859496",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/18/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859500",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/20/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859501",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/27/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859506",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/14/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859496",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/13/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859495",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/14/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859497",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/29/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859508",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/20/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859501",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/24/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859503",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/25/2020",46,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859503",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/27/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859505",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/10/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859492",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/13/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859496",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/14/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859498",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/18/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859501",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","2/27/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210859505",38.4408198,-78.8823829999999],
["WARREN FOR PRESIDENT, INC.","DENT, LAURA","DENT","156 MARYLAND AVE","JAMES MADISON UNIVERSITY","ADJUNCT FACULTY","3/18/2020",23.75,"http://docquery.fec.gov/cgi-bin/fecimg/?202004209224144505",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA A","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","7/10/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202008209266486997",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA A","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","7/31/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202008209266486999",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA A","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","7/2/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202008209266486996",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA A","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","7/3/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202008209266486997",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA A","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","7/17/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202008209266486998",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA A","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","7/24/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202008209266486999",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA A","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","7/31/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202008209266487000",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/4/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787450",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/7/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787452",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787454",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787455",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787456",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787458",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787456",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787457",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787461",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/11/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787462",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/4/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787451",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787455",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787461",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/7/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787453",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787456",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787460",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787460",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787460",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/6/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787451",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/7/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787452",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787454",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787457",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787458",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787459",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/7/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787453",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787455",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787459",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787461",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/7/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787452",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/9/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787454",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787457",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787459",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/11/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787462",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/4/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787451",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/9/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787453",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","3/10/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228787458",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","4/9/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236341829",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","4/22/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236341829",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","5/29/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243732292",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","5/19/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243732290",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","5/22/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243732291",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","5/22/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209243732291",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","5/4/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240616682",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","5/14/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240616684",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","5/22/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240616685",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","5/4/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240616683",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","5/7/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240616683",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","5/29/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240616686",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","5/14/2020",100,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240616683",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","5/22/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240616684",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","5/23/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240616685",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","5/29/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240616685",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","5/19/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240616684",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA A","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","6/4/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260533080",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA A","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","6/26/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260533087",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA A","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","6/4/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260533081",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA A","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","6/5/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260533081",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA A","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","6/12/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260533083",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA A","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","6/18/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260533084",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA A","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","6/18/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260533085",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA A","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","6/11/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260533082",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA A","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","6/19/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260533085",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA A","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","6/16/2020",20,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260533083",38.4408198,-78.8823829999999],
["BIDEN FOR PRESIDENT","DENT, LAURA A","DENT","156 MARYLAND AVE","SELF-EMPLOYED","TECHNICAL WRITER","6/25/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209260533086",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","6/18/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255793019",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","6/4/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255793017",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","6/4/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255793018",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","6/16/2020",20,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255793019",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","6/18/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255793020",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","6/5/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255793018",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","6/12/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255793019",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","6/25/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255793021",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","6/19/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255793020",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","6/23/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255793021",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","6/26/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255793021",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","6/11/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255793018",38.4408198,-78.8823829999999],
["ACTBLUE","DENT, LAURA","DENT","156 MARYLAND AVE","SELF","TECHNICAL WRITER","6/21/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255793020",38.4408198,-78.8823829999999],
["ACTBLUE","DEREE, TRUMAN","DEREE","11-A SOUTH AVENUE 21-F","NOT EMPLOYED","NOT EMPLOYED","1/13/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200405147",38.43307,-78.8839084999999],
["ACTBLUE","DERRICK, KATHLEEN","DERRICK","451 OHIO AVE","JAMES MADISON UNIVERSITY","PROGRAM COORDINATOR","2/28/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210862245",38.445186,-78.8830462999999],
["ACTBLUE","DERRICK, KATHLEEN","DERRICK","451 OHIO AVE","JAMES MADISON UNIVERSITY","PROGRAM COORDINATOR","2/28/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210862245",38.445186,-78.8830462999999],
["WINRED","DEVERS, TIM","DEVERS","402 HICKORY GROVE CIR","RETIRED","RETIRED","4/7/2020",20,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245181866",38.4155247,-78.9027658999999],
["NRSC","DIEHL, JO ANN MRS.","DIEHL","235 FRANKLIN ST","RETIRED","RETIRED","2/25/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204036701",38.4460599,-78.8665291],
["NRSC","DIEHL, JO ANN MRS.","DIEHL","235 FRANKLIN ST","RETIRED","RETIRED","2/6/2020",35,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204036700",38.4460599,-78.8665291],
["NRSC","DIEHL, JO","DIEHL","235 FRANKLIN ST","RETIRED","RETIRED","3/23/2020",55,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240123270",38.4460599,-78.8665291],
["NRSC","DIEHL, JO ANN","DIEHL","235 FRANKLIN ST","RETIRED","RETIRED","5/11/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240173254",38.4460599,-78.8665291],
["NRSC","DIEHL, JO ANN","DIEHL","235 FRANKLIN ST","RETIRED","RETIRED","6/16/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209259994495",38.4460599,-78.8665291],
["ACTBLUE","DILLON, LUKE","DILLON","1366 HUNTERS ROAD APPARTMENT H","LATINS FLAVOR","SERVER","1/15/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200417488",38.4246764,-78.8772312999999],
["ACTBLUE","DINAPOLI, EMMA","DINAPOLI","908 OAK HILL DR","NOT EMPLOYED","NOT EMPLOYED","2/19/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210882623",38.4274589,-78.8708853],
["ACTBLUE","DINAPOLI, EMMA","DINAPOLI","908 OAK HILL DR","NOT EMPLOYED","NOT EMPLOYED","2/8/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210882623",38.4274589,-78.8708853],
["ACTBLUE","DINAPOLI, SARAH","DINAPOLI","908 OAK HILL DRIVE","JOHNS HOPKINS UNIVERSITY","GRADUATE STUDENT","3/1/2020",2,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228803775",38.4274589,-78.8708853],
["ACTBLUE","DINAPOLI, SARAH","DINAPOLI","908 OAK HILL DRIVE","JOHNS HOPKINS UNIVERSITY","GRADUATE STUDENT","3/1/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228803776",38.4274589,-78.8708853],
["ACTBLUE","DINC, NEFIN","DINC","32 EMERY STREET","JAMES MADISON UNIVERSITY","PROFESSOR","2/17/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210882711",38.4280259,-78.8903863],
["ACTBLUE","DINSMORE, JANE","DINSMORE","1070 CHESTNUT DRIVE","NOT EMPLOYED","NOT EMPLOYED","4/27/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236355477",38.4389856,-78.8920665],
["ACTBLUE","DINSMORE, JANE","DINSMORE","1070 CHESTNUT DRIVE","NOT EMPLOYED","NOT EMPLOYED","5/18/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240631565",38.4389856,-78.8920665],
["ACTBLUE","DINTAMAN, ANNA","DINTAMAN","1057 S DOGWOOD DR","NOT EMPLOYED","NOT EMPLOYED","2/19/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210883739",38.4402068,-78.8929508],
["ACTBLUE","DINTAMAN, ANNA","DINTAMAN","1057 S DOGWOOD DR","NOT EMPLOYED","NOT EMPLOYED","2/19/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210883739",38.4402068,-78.8929508],
["ACTBLUE","DIOP, CORINNE","DIOP","34 LAUREL ST","JAMES MADISON UNIVERSITY","ART PROFESSOR","2/15/2020",2.9,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210884124",38.4317670999999,-78.8866279],
["ACTBLUE","DIOP, CORINNE","DIOP","34 LAUREL ST","JAMES MADISON UNIVERSITY","ART PROFESSOR","2/15/2020",29,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210884123",38.4317670999999,-78.8866279],
["ACTBLUE","DIOP, CORINNE","DIOP","34 LAUREL ST","JAMES MADISON UNIVERSITY","ART PROFESSOR","3/8/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202004219228804899",38.4317670999999,-78.8866279],
["ACTBLUE","DIOP, CORINNE","DIOP","34 LAUREL ST","JAMES MADISON UNIVERSITY","ART PROFESSOR","5/28/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240631836",38.4317670999999,-78.8866279],
["ACTBLUE","DIOP, CORINNE","DIOP","34 LAUREL ST","JAMES MADISON UNIVERSITY","ART PROFESSOR","5/28/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202006209240631835",38.4317670999999,-78.8866279],
["ACTBLUE","DIOP, CORINNE","DIOP","34 LAUREL ST","JAMES MADISON UNIVERSITY","ART PROFESSOR","6/7/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255813616",38.4317670999999,-78.8866279],

];

var bigGuy = [["ACTBLUE","DANIELS, DANNY","DANIELS","760 ANGLE DRIVE","MERCK","PHARMACEUTICAL","6/8/2020",12.26,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255750160"],["ACTBLUE","DANIELS, DANNY","DANIELS","760 ANGLE DRIVE","MERCK","PHARMACEUTICAL","6/8/2020",12.26,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255750160"],
["ACTBLUE","DAVIS, SYBIL","DAVIS","2525 DAWSON DRIVE 101","NCCI","INSPECTOR","6/13/2020",7,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255767560"],
["ACTBLUE","DE HERTOGH, LORI BETH","DE HERTOGH","1190 WESTMORELAND DR","JAMES MADISON UNIVERSITY","PROFESSOR","6/5/2020",25,"http://docquery.fec.gov/cgi-bin/fecimg/?202007209255772225"],
["ACTBLUE","DE LA CRUZ, MICHELLE","DE LA CRUZ","245 JERICHO ROAD","NOT EMPLOYED","NOT EMPLOYED","4/19/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236328455"],
["ACTBLUE","DE WAAL, MARIJN","DE WAAL","529 S MASON STREET","JAMES MADISON UNIVERSITY","PROFESSOR","2/19/2020",2.7,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210837437"],
["ACTBLUE","DEAN, ZACKERY","DEAN","1177 DEVON LANE APT G","UVA","DONOR RELATIONS ASSOCIATE","1/24/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200391468"],
["ACTBLUE","DEREE, TRUMAN","DEREE","11-A SOUTH AVENUE 21-F","NOT EMPLOYED","NOT EMPLOYED","1/13/2020",10,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200405147"],
["ACTBLUE","DERRICK, KATHLEEN","DERRICK","451 OHIO AVE","JAMES MADISON UNIVERSITY","PROGRAM COORDINATOR","2/28/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210862245"],
["WINRED","DEVERS, TIM","DEVERS","402 HICKORY GROVE CIR","RETIRED","RETIRED","4/7/2020",20,"http://docquery.fec.gov/cgi-bin/fecimg/?202007159245181866"],
["NRSC","DIEHL, JO ANN MRS.","DIEHL","235 FRANKLIN ST","RETIRED","RETIRED","2/25/2020",50,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209204036701"],
["ACTBLUE","DILLON, LUKE","DILLON","1366 HUNTERS ROAD APPARTMENT H","LATINS FLAVOR","SERVER","1/15/2020",27,"http://docquery.fec.gov/cgi-bin/fecimg/?202002219200417488"],
["ACTBLUE","DINAPOLI, EMMA","DINAPOLI","908 OAK HILL DR","NOT EMPLOYED","NOT EMPLOYED","2/19/2020",5,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210882623"],
["ACTBLUE","DINC, NEFIN","DINC","32 EMERY STREET","JAMES MADISON UNIVERSITY","PROFESSOR","2/17/2020",3,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210882711"],
["ACTBLUE","DINSMORE, JANE","DINSMORE","1070 CHESTNUT DRIVE","NOT EMPLOYED","NOT EMPLOYED","4/27/2020",15,"http://docquery.fec.gov/cgi-bin/fecimg/?202005209236355477"],
["ACTBLUE","DINTAMAN, ANNA","DINTAMAN","1057 S DOGWOOD DR","NOT EMPLOYED","NOT EMPLOYED","2/19/2020",1,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210883739"],
["ACTBLUE","DIOP, CORINNE","DIOP","34 LAUREL ST","JAMES MADISON UNIVERSITY","ART PROFESSOR","2/15/2020",2.9,"http://docquery.fec.gov/cgi-bin/fecimg/?202003209210884124"],]