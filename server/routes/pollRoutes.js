const mongoose = require("mongoose");
const Poll = mongoose.model("polls");
const Voters = mongoose.model("voters");
const Answer = mongoose.model("answer");
const requireLogin = require("./requireLoginMiddleware");

module.exports = app => {
	app.get("/api/all_polls", async (req, res) => {
		const polls = await Poll.find({});

		res.send(polls);
	});

	app.get("/api/my_polls", requireLogin, async (req, res) => {
		const polls = await Poll.find({
			_user: req.user.id
		});
		res.send(polls);
	});

	app.get("/api/poll/:pollId", async (req, res) => {
		const poll = await Poll.findOne({
			_id: req.params.pollId
		});
		res.send(poll);
	});

	app.post("/api/poll/new", requireLogin, async (req, res) => {
		const {
			question,
			answers
		} = req.body;

		const poll = new Poll({
			question,
			answers,
			_user: req.user.id,
			username: req.user.username,
			dateCreated: Date.now()
		});

		const pollDocument = await poll.save();

		res.send("Poll document has been saved");
	});

	app.post("/api/add_answer/:pollId", requireLogin, async (req, res) => {
		await Poll.updateOne({
			_id: req.params.pollId
		}, {
			$push: {
				answers: {
					answer: req.body.answer,
					voteCount: 1
				}
			}
		});

		//Find the answer id so that the voter list can hold its id
		const newAnswerEntry = await Poll.findOne({
			_id: req.params.pollId,
			"answers.answer": req.body.answer
		}, {
			"answers.$": 1,
			_id: 0
		});

		const voters = new Voters({
			_poll: req.params.pollId,
			_answer: newAnswerEntry.answers[0]._id
		});

		await voters.save();
		res.send({});
	});

	app.post("/api/vote/:pollId/:answerId", async (req, res) => {
		await Poll.updateOne({
			_id: req.params.pollId,
			"answers._id": req.params.answerId
		}, {
			$inc: {
				"answers.$.voteCount": 1
			}
		});

		const votersDoc = await Voters.find({
			_answer: req.params.answerId
		}).limit(
			1
		);

		if (votersDoc.length < 1) {
			const voters = await new Voters({
				_poll: req.params.pollId,
				_answer: req.params.answerId,
				voters: [{
					_user: "user" in req ? req.user.id : undefined,
					ipAddress: req.ip
				}]
			});
			voters.save();
		} else {
			await Voters.updateOne({
				_answer: req.params.answerId
			}, {
				$push: {
					voters: {
						_user: "user" in req ? req.user.id : undefined,
						ipAddress: req.ip
					}
				}
			});
		}

		res.send("Poll updated.");
	});

	app.delete("/api/poll/:pollId", requireLogin, async (req, res) => {
		await Promise.all([
			Poll.deleteOne({
				_id: req.params.pollId
			}),
			Voters.deleteMany({
				_poll: req.params.pollId
			})
		]);

		res.send("Poll deleted");
	});
};
