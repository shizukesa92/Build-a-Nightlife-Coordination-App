const mongoose = require("mongoose");
const {
	Schema
} = mongoose;
const AnswerSchema = require("./Answer");

const pollSchema = new Schema({
	_user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	username: String,
	question: String,
	answers: [AnswerSchema],
	dateCreated: Date
});

mongoose.model("polls", pollSchema);
