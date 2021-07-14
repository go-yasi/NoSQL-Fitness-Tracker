const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    exercises: [{
        name: {
            type: String,
            trim: true,
            required:"Workout name is required."
        },
        type: {
            type: String,
            trim: true,
            required:"Workout type is required."
        },
        weight: {
            type: Number,
            trim: true,
            required: false
        },
        sets: {
            type: Number,
            trim: true,
            required: true
        },
        reps: {
            type: Number,
            trim: true,
            required: true
        },
        duration: {
            type: Number,
            trim: true,
            required: true
        },
        distance: {
            type: Number,
            trim: true,
            required: false
        }
    }],
    day: {
        type: Date,
        default: Date.now
    }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;