
  

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAcMWSX8uy5K3QkxcjdQD5LbHt12fygnzE",
    authDomain: "new-firebasse.firebaseapp.com",
    databaseURL: "https://new-firebasse.firebaseio.com",
    projectId: "new-firebasse",
    storageBucket: "new-firebasse.appspot.com",
    messagingSenderId: "598135340940"
  };
  
  firebase.initializeApp(config);
  var current = moment();
  var database = firebase.database();
  var trainName = "";
  var destination = "";
  var tFrequency = 0;
  var nextArrival = 0;
  var minAway = 0;
  var firstTrainTime = 00;
  var difference = 0;
  var remainder = 0;
  var fNextArrival = 0;

  $("#submitData").on("click", function(){
    event.preventDefault();
      
      destination = $("#destination").val().trim();
      trainName = $("#trainName").val().trim();
      firstTrainTime = $("#firstTrainT").val().trim();
      frequency = $("#frequency").val().trim();

      // console.log(destination);
      // console.log(trainName);
      // console.log(firstTrainTime);
      // console.log(frequency);

    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP

    });
    var ref = database.ref("trainName");
    console.log(ref);
  });


  database.ref().on("child_added", function(childSnapshot){
    firstTrainTime = moment(childSnapshot.val().firstTrainTime, "HH:mm").format("HH:mm");
    convertedFirst = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    difference = moment().diff(moment(convertedFirst), "minutes");
    
    tFrequency = childSnapshot.val().frequency;
    console.log(tFrequency);
    
    remainder = difference % tFrequency;
    console.log(remainder);

    minAway = tFrequency - remainder;
    console.log("MINUTES TILL TRAIN: " + minAway);

    nextArrival = moment().add(minAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));
  
    console.log();

    $("#displayTable").append("<tr><td>"+ childSnapshot.val().trainName+

        "</td><td>" + childSnapshot.val().destination +
        "</td><td>" + childSnapshot.val().frequency +
        "</td><td>" + moment(nextArrival).format("HH:mm") +
        "</td><td>" + minAway + "</td></tr>"
          
          )
  });




  


