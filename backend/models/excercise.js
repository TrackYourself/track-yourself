var mongoose = require ("mongoose");

var ExcerciseSchema = mongoose.Schema({
    user:String,
    duration: {
        type: Number,
        required: true
    },
    intensity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Excercise', ExcerciseSchema);
