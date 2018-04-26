import React from "react";
import {
	connect
} from "react-redux";
import {
	withRouter
} from "react-router-dom";
import {
	PollAnswers
} from "./PollAnswers";
import axios from "axios";
import {
	Button
} from "react-bootstrap";

const PollFormReview = ({
	history,
	onCancel,
	formValues
}) => {
	const parsedAnswers = formValues.answers
		.split(",")
		.map(answer => answer.trim())
		.map((answer, index) => ({
			_id: index,
			answer
		}));

	const submitPoll = async () => {
		await axios.post("/api/poll/new", {
			question: formValues.question,
			answers: parsedAnswers.map(answer => {
				return {
					answer: answer.answer
				};
			})
		});

		history.push("/my_polls");
	};

	return (
		<div>
      <h4>Please confirm your entries</h4>
      <span>Question:</span>
      <h5>
        {formValues.question}
      </h5>
      <span>Answers:</span>

      <PollAnswers
        answers={parsedAnswers}
        selectedAnswer={null}
        checked={false}
        pointer={"noHandPointer"}
      />


      <Button bsStyle = "link"
        onClick={onCancel}
      >
        Back
      </Button>
      <Button bsStyle = "link"
        onClick={submitPoll}
      >
        Create Poll
      </Button>
    </div>
	);
};

const mapStateToProps = (state) => {
	return {
		formValues: state.form.pollForm.values
	};
}
export default connect(mapStateToProps)(withRouter(PollFormReview));
