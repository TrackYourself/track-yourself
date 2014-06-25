var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

var UserSchema = mongoose.Schema({
	name: String,
	role: String,
	local: {
		email: String,
		password: String
	},
	goals: {
		waterPD: Number,
		exercisePD: Number,
		sleepPD: Number
	}
});

UserSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
