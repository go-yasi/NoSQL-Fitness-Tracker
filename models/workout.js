const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    exercise: [{
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
            required: false
        },
        sets: {
            type: Number,
            required: true
        },
        reps: {
            type: Number,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        distance: {
            type: Number,
            required: false
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;