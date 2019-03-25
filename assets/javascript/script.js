// Initialize Firebase
var config = {
    apiKey: "AIzaSyA8KE0WGK8nllZ8v7WMuV97YsmJsps_Vo8",
    authDomain: "train-time-7c4b5.firebaseapp.com",
    databaseURL: "https://train-time-7c4b5.firebaseio.com",
    projectId: "train-time-7c4b5",
    storageBucket: "",
    messagingSenderId: "956651020847"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
let database = firebase.database();
let dataRef = database.ref();

//get information from inputs
$("button").on("click", function (event) {
    event.preventDefault();
    let trainName = $("#trainName").val().trim();
    let trainDestination = $("#trainDestination").val().trim();
    let firstTime = $("#firstTime").val().trim();
    let frequency = $("#frequency").val().trim();

    let newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTime: firstTime,
        frequency: frequency
    };

    //send info to firebase
    dataRef.push(newTrain);

    //clear text-boxes
    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#firstTime").val("");
    $("#frequency").val("");
});


//retrieve info from firebase
dataRef.on("child_added", function (childSnapshot) {

    //variables for new information
    let trainName = childSnapshot.val().name;
    let trainDestination = childSnapshot.val().destination;
    let firstTime = childSnapshot.val().firstTime;
    let frequency = childSnapshot.val().frequency;

    console.log("train name: " + trainName);
    console.log("destination: " + trainDestination);
    console.log("start time: " + firstTime);
    console.log("frequency: " + frequency);

    /*calculate with moment
    current time
    first train time
    frequency
    minutes to next*/
    let now = moment();
    let nextArrival = moment.unix(firstTime).format("HH:mm");
    let minAway = moment

    console.log("current time: " + now);

    //create new rows with retrieved information
    let newRow = $("<div>").addClass("row").append(
        $("<p>").addClass("col").text(trainName),
        $("<p>").addClass("col").text(trainDestination),
        $("<p>").addClass("col").text(frequency),
        $("<p>").addClass("col").text(nextArrival),
        $("<p>").addClass("col").text(""),
    );
    $("#new-train").append(newRow);
});