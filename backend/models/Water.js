var mongoose = require('mongoose');

var WaterSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

module.exports = mongoose.model('Water', WaterSchema);
