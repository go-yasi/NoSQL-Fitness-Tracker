// require dependencies
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
// const mongojs = require("mongojs");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// connect to mongoose DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workout", { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// need this to deploy to heroku
app.get("/", function(req, res) {
    res.json(path.join(__dirname, "./public/index.html"));
  });

// get exercise page
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"))
});

// get dashboard page
app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"))
});

// A POST route to create a workout
app.post("/api/workouts", ({body}, res) => {
    db.Workout.create(body) 
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

//  A PUT route to update a workout — HINT:you will have to find the workout by id and then push exercises to the exercises array)
app.put("/api/workouts/:id", (req, res) => {
   db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } }, { new:true } )
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => {
        res.json(err)
    })
});

//  A GET route to get the workouts — HINT: this will need an aggregate to add all the durations from each exercise together.
app.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ])
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

//   A GET route to get workouts in a specific range — HINT:very similar to the one above, but needs a limit (total duration of each workout from the past seven workouts on the stats page). 
app.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ])
    .limit(7)
    .then(dbWorkout => {
        res.json(dbWorkout);
    }) 
    .catch (err => {
        res.json(err);
    });
});

//   A DELETE route to delete a workout by a specific id
app.delete("/api/workouts/:id", (req, res) =>{
    db.Workout.findOneAndRemove({ _id: req.params.id}, (err, data) => {
      if(err){
        res.send(err);
      } else {
        res.send(data);
      }
    });
  });

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });