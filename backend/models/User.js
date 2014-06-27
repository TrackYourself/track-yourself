var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

var UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
    role: String,
    local: {
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      }
    }
});

UserSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);

