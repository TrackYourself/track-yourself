var mongoose = require ("mongoose");

var ExerciseSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    intensity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
