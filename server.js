// require dependencies
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// connect to mongoose DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// ### You will have 5 api routes to complete.

// A POST route to create a workout
app.post("api/workout", ({body}, res) => {
    db.Workout.create(body) 
    .then(({_id}) => db.Workout.findOneandUpdate({}, {$push:{ workout: _id }}, { new: true }))
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

//  A PUT route to update a workout(
// HINT:you will have to find the workout by id and then push exercises to the exercises array)

//  A GET route to get the workouts
// (HINT: this will need an aggregate to add all the durations from each exercise together. Here is an example https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/)

//   A GET route to get workouts in a specific range
// (HINT:very similar to the one above, but needs a limit. Here is an exampe https://kb.objectrocket.com/mongo-db/how-to-use-the-mongoose-limit-function-927)

//   A DELETE route to delete a workout by a specific id

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });