import React from "react";

export const PollAnswers = props => {
	return props.answers.map((answer, index) => {
		return (
			<div key={answer._id}>
        <div>
          <input
            type="radio"
            id={answer._id}
            onChange={props.handleAnswerSelect}
            checked={props.selectedAnswer === answer._id}
          />
          <label htmlFor={answer._id} className={props.pointer}>
            {answer.answer}
          </label>
        </div>
      </div>
		);
	});
};
