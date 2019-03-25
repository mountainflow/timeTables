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

$(document).ready(function () {
    //set focus to trainName
    $("#trainName").focus();
});

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

    if (!moment(firstTime, 'HH:mm', true).isValid()) {
        // $("#firstTime").css("border-color", "red");
        $("#firstTime").focus();
        $("button").off("click");
        alert("Please enter First Train Time in 24hr format!");
    } else {
        $("#trainName").focus();
        // $("#firstTime").css("border-color", "light-grey");
    };

    //send info to firebase
    dataRef.push(newTrain);

    //clear text-boxes
    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#firstTime").val("");
    $("#frequency").val("");

    //set focus to trainName
    // $("#trainName").focus();
});


//retrieve info from firebase
dataRef.on("child_added", function (childSnapshot) {

    //variables for new information
    let trainName = childSnapshot.val().name;
    let trainDestination = childSnapshot.val().destination;
    let firstTime = childSnapshot.val().firstTime;
    let frequency = childSnapshot.val().frequency;
    let startTime = moment(firstTime, "HH:mm", true).subtract(1, "years").format();

    // Difference between the times
    let diffTime = moment().diff(moment(startTime), "minutes");

    // Time apart (remainder)
    let tRemainder = diffTime % frequency;

    // Minute Until Train
    let minAway = frequency - tRemainder;

    // Next Train
    let nextArrival = moment().add(minAway, "minutes");

    //create new rows with retrieved information
    let newRow = $("<div>").addClass("row").append(
        $("<p>").addClass("col").text(trainName),
        $("<p>").addClass("col").text(trainDestination),
        $("<p>").addClass("col").text(frequency),
        $("<p>").addClass("col").text(nextArrival.format("HH:mm")),
        $("<p>").addClass("col").text(minAway),
    );
    $("#new-train").append(newRow);
});