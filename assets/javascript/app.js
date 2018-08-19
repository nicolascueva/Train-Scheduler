$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDfajFnwCuWNToIxhrkKLZLr5PMv3O9rIo",
        authDomain: "train-scheduler-91c88.firebaseapp.com",
        databaseURL: "https://train-scheduler-91c88.firebaseio.com",
        projectId: "train-scheduler-91c88",
        storageBucket: "train-scheduler-91c88.appspot.com",
        messagingSenderId: "697140720652"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    // Initial Values
    var trainName = "";
    var destination = "";
    var firstTrain = "";
    var frequency = "";
    var nextArrival = "";
    var minutesAway = 0;


    // Capture Button Click
    $("#addNewTrain").on("click", function (event) {
        // Don't refresh the page!
        event.preventDefault();

        // YOUR TASK!!!
        // Code in the logic for storing and retrieving the most recent user.
        // Don't forget to provide initial data to your Firebase database.
        trainName = $("#train-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrain = $("#firstTrain-input").val().trim();
        frequency = $("#frequency-input").val().trim();

        var newTrainInfo = {
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        };

        database.ref().push(newTrainInfo);

        // Clears all of the text-boxes
        $("#train-input").val("");
        $("#destination-input").val("");
        $("#firstTrain-input").val("");
        $("#frequency-input").val("");

    });

























});