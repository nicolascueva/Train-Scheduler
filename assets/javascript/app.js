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

    database.ref().on("child_added", function (childSnapshot) {
        //console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().trainName;
        var destination = childSnapshot.val().destination;
        var frequency = childSnapshot.val().frequency;
        var firstTrain = childSnapshot.val().firstTrain;
        // Employee Info
        // console.log(trainName);
        //console.log(destination);
        //console.log(frequency);

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        // console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);

        // Minute Until Train
        var minAway = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + minAway);

        // Next Train
        var nextArrival = moment().add(minAway, "minutes").format("hh:mm a");
        console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextArrival),
            $("<td>").text(minAway),
        );

        // Append the new row to the table
        $("#displayNewRow").append(newRow);



    });

























});