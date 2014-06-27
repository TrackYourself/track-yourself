var mongoose = require('mongoose');

var WaterSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    intake: {
        type: Number,
        required: true
    },
    drank: {
        type:Date,
        required: true
    },
    notes: String
});

module.exports = mongoose.model('Water', WaterSchema);
