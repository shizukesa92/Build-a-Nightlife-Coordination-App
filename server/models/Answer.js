const mongoose = require("mongoose");
const {
	Schema
} = mongoose;

const answerSchema = new Schema({
	answer: String,
	voteCount: {
		type: Number,
		default: 0
	}
});

mongoose.model("answer", answerSchema);
module.exports = answerSchema;
