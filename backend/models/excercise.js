var mongoose = require ("mongoose");

var ExcerciseSchema = mongoose.Schema({
    user:String,
    intake: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Excercise', ExcerciseSchema);
