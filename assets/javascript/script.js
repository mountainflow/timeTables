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

    console.log(newTrain.trainName);
    console.log(newTrain.trainDestination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);
});



//retrieve info from firebase

//create new rows with retrieved information