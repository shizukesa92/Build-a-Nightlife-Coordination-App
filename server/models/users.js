let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String
	},
	rsvps: {
		type: Array,
		default: []
	}
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);

