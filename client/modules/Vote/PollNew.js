import React, {
	Component
} from "react";
import {
	reduxForm
} from "redux-form";

import PollForm from "./PollForm";
import PollFormReview from "./PollFormReview";

class PollNew extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showFormReview: false
		};
	}

	renderContent() {
		if (this.state.showFormReview) {
			return (
				<PollFormReview
          onCancel={() => {
            this.setState({ showFormReview: false });
          }}
        />
			);
		}

		return (
			<PollForm onPollSubmit={() => this.setState({ showFormReview: true })} />
		);
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}
export default reduxForm({
	form: "pollForm"
})(PollNew);
