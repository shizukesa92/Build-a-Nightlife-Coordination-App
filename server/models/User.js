const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
	Schema
} = mongoose;

const userSchema = new Schema({
	username: String,
	password: String
});

userSchema.methods.generateHash = password => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

mongoose.model("users", userSchema);
