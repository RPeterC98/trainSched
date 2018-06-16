$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyBQxub9KFtaOnMqDTg9SHbljTeBhIbWH2M",
        authDomain: "train-schedule-d732b.firebaseapp.com",
        databaseURL: "https://train-schedule-d732b.firebaseio.com",
        projectId: "train-schedule-d732b",
        storageBucket: "",
        messagingSenderId: "730667332791"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#addTrain").click(function (event) {
        event.preventDefault()

        var name = $("#nameInput").val().trim()
        var destination = $("#destInput").val().trim()
        var startTime = $("#startInput").val().trim()
        var frequency = $("#freqInput").val().trim()

        var newTrain = {
            name: name,
            destination: destination,
            startTime: startTime,
            frequency: frequency
        }

        database.ref().push(newTrain)

    })

    database.ref().on("child_added", function (childSnapshot, prevChildKey) {
        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var startTime = childSnapshot.val().startTime;
        var frequency = childSnapshot.val().frequency;

        var timeOne = moment(startTime, "HH:mm").subtract(1, "years");

        var diffTime = moment().diff(moment(timeOne), "minutes");

        var tRemainder = diffTime % frequency;

        var minTill = frequency - tRemainder;

        var nextTrain = moment().add(minTill, "HH:mm");

        $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + minTill)

    })

})
