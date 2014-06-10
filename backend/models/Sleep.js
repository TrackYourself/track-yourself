var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/track-yourself', function (err, res) {
  if (err) {
    console.log('ERROR connecting to mongo db: ' + err);
  }
});

var SleepSchema = mongoose.Schema({
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
SleepSchema.method('duration', function() {
  var min = (this.wake - this.sleep)/60000;
  return Math.round(min/6)/10;
});

module.exports = mongoose.model('Sleep', SleepSchema);


