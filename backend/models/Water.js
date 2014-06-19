var mongoose = require('mongoose');

var WaterSchema = mongoose.Schema({
  user: String,
  intake: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Water', WaterSchema);


