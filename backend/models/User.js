var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
	name: String,
	role: String,
	local: {
		email: String,
		password: String
	}
});

UserSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(16), null);
};

UserSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);


