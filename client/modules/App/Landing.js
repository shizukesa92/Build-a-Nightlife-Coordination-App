import React, {
	Component
} from "react";
import {
	Link
} from "react-router-dom";
import {
	connect
} from "react-redux";

import {
	fetchPolls,
	showVotes,
	deletePoll
} from '../Vote/VoteActions';
import {
	Button,
	ButtonToolbar
} from "react-bootstrap";

class Landing extends Component {

	constructor(props) {
		super(props);
		this.state = {
			personalView: this.props.match.path === "/my_polls"
		};
	}
	componentDidMount() {
		this.props.fetchPolls(this.state.personalView);
	}

	renderDelete(pollId) {
		if (this.state.personalView)
			return (
				<Button bsStyle = "link"
          onClick={() => deletePoll(pollId)}
        >
          Delete
        </Button>
			);
	}

	renderPolls() {
		if (this.state.personalView && this.props.polls.length === 0)
			return (
				<div>
          <h2>
            You have not created any pools.
          </h2>
          <h2>
            Click on 'Create New Poll' in the overhead menu to get started.
          </h2>
        </div>
			);
		return this.props.polls.reverse().map(poll => {
			return (
				<div id = "poll" key={poll._id}>
            <div>
              <div>{poll.question}</div>
              <div id = "landingbuttons">
                <Link
                  to={"/poll/" + poll._id}
                >
                  View
                </Link>
                <Link
                  to={"/poll/" + poll._id}
                  onClick={() => this.props.showVotes(true)}
                >
                  Vote
                </Link>
                {this.renderDelete(poll._id)}
              </div>
            </div>
            <div>
              <div>
                {this.state.personalView
                  ? "You created this poll "
                  : "Created by user '" + poll.username + "'"}{' '}
                on {new Date(poll.dateCreated).toLocaleDateString()}.
              </div>
              <div>
                <div>
                  Total Votes:{" "}
                  {poll.answers.reduce(
                    (ans1, ans2) => ans1 + ans2.voteCount,
                    0
                  )}
                </div>
              </div>
            </div>
        </div>
			);
		});
	}

	render() {
		return (
			<div id = "landing">
        <h2>
          {this.state.personalView ? "My " : " "}Recent Polls
        </h2>
        {this.renderPolls()}
      </div>
		);
	}
}

const mapStateToProps = ({
	polls
}) => {
	return {
		polls
	};
}

export default connect(mapStateToProps, {
	fetchPolls,
	showVotes
})(Landing);
