var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var moment = require('moment');

var UserSchema = mongoose.Schema({
	name: String,
	role: String,
	local: {
		email: String,
		password: String
	}
});

UserSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
};

UserSchema.methods.getToken = function (jwtToken) {
	var expires = moment().add('days', 7).valueOf();
	var issId = this._id;
	var token = jwt.encode({
		iss    : issId,
		expires: expires
	}, jwtToken);
	return token;
};

module.exports = mongoose.model('User', UserSchema);


