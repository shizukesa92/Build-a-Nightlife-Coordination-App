const mongoose = require("mongoose");
const {
	Schema
} = mongoose;

const votersSchema = new Schema({
	_poll: {
		type: Schema.Types.ObjectId,
		ref: "Poll"
	},
	_answer: {
		type: Schema.Types.ObjectId,
		ref: "Answer"
	},
	voters: [{
		_user: {
			type: Schema.Types.ObjectId,
			ref: "User"
		},
		ipAddress: String
	}]
});

mongoose.model("voters", votersSchema);
