import React from "react";
import {
	reduxForm,
	Field
} from "redux-form";
import {
	withRouter
} from "react-router-dom";

import {
	Button,
	ButtonToolbar
} from "react-bootstrap";

const pollFields = [{
		label: "Poll Question",
		name: "question"
	},
	{
		label: "Poll Responses",
		name: "answers"
	}
];

const PollField = ({
	input,
	label,
	meta: {
		error,
		touched
	}
}) => {
	return (
		<div>
      <label>{label}</label>
      <input {...input} />
      <div>
        {touched && error}
      </div>
    </div>
	);
};

const renderFields = () => {
	return pollFields.map(({
		label,
		name
	}) => {
		return (
			<Field
        key={name}
        component={PollField}
        type="text"
        label={label}
        name={name}
      />
		);
	});
};

const PollForm = ({
	history,
	handleSubmit,
	onPollSubmit
}) => {
	return (
		<div>
      <h1>New Poll</h1>
      <p>
        Please enter your poll question and poll responses.<br />Use commas to
        separate the possible responses (for example: "Yes, No, Maybe").
      </p>
      <form onSubmit={handleSubmit(onPollSubmit)}>
        {renderFields()}
        <Button bsStyle = "link"
          onClick={history.goBack}
        >
          Cancel
        </Button>
		<ButtonToolbar>
		<Button bsStyle = "link"
          type="submit"
        >
          Next
	  </Button>
  </ButtonToolbar>
      </form>
    </div>
	);
};

const validate = (values) => {
	const errors = {};

	pollFields.forEach(({
		name
	}) => {
		if (!values[name]) {
			errors[name] = "You must provide a value";
		}
	});
	return errors;
}

export default reduxForm({
	validate,
	form: "pollForm",
	destroyOnUnmount: false
})(withRouter(PollForm));
