var mongoose = require('mongoose');

var SleepSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sleep: {
    type: Date,
    required: true
  },
  wake: {
    type: Date,
    required: true
  }
});

/* Returns sleep duration in hours (one decimal place */
SleepSchema.virtual('duration').get(function() {
  var min = (this.wake - this.sleep)/60000;
  return Math.round(min/6)/10;
});

module.exports = mongoose.model('Sleep', SleepSchema);


