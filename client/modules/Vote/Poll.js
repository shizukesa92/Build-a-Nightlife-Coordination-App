import React, {
	Component
} from "react";
import {
	connect
} from "react-redux";
import axios from "axios";
import {
	Button
} from "react-bootstrap";


import VotesChart from "./VotesChart";
import PollSubmitAnswer from "./PollSubmitAnswer";
import {
	showVotes,
	deletePoll
} from "../Vote/VoteActions";

class Poll extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pollId: this.props.match.params.pollId,
			username: "",
			dateCreated: "",
			question: "",
			answers: [],
			totalVotes: 0
		};
	}

	componentDidMount() {
		this.getPollInfo(this.state.pollId);
	}

	componentWillUnmount() {
		this.props.showVotes(false);
	}

	getPollInfo = async pollId => {
		const res = await axios.get("/api/poll/" + pollId);
		this.setState({
			dateCreated: new Date(res.data.dateCreated).toLocaleDateString(),
			username: res.data.username,
			question: res.data.question,
			answers: res.data.answers,
			totalVotes: res.data.answers.reduce(
				(ans1, ans2) => ans1 + ans2.voteCount,
				0
			)
		});
	};

	renderPollOptions() {
		return (
			<div>
        <h4>
          Options
        </h4>
        <ul>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={
                "http://twitter.com/share?text=Vote in this poll on Demos: &url=" +
                window.location.href +
                "&hashtags=DemosVoting"
              }
            >
              Share &nbsp;&nbsp;&nbsp;<i className="fab fa-twitter" />
            </a>
          </li>
          {this.props.auth &&
          this.props.auth.username === this.state.username ? (
            <li
              onClick={() => deletePoll(this.state.pollId)}
            >
              Delete
            </li>
          ) : null}
          {this.props.showVoteOptions ? (
            <PollSubmitAnswer
              answers={this.state.answers}
              pollId={this.state.pollId}
              getPollInfo={this.getPollInfo}
              auth={this.props.auth}
              clearAnswers={() => {
                this.props.showVotes(false);
              }}
            />
          ) : (
            <Button bsStyle = "link" onClick={this.props.showVotes}>
              Vote
            </Button>
          )}
        </ul>
      </div>
		);
	}

	render() {
		return (
			<div id = "poll">
        <div className="row ">
            <h2>
              {this.state.question}
            </h2>
        </div>
        <div className="row">
            <div className="row">
                Created by user <i>{this.state.username}</i> on{" "}
                {this.state.dateCreated}.
              <div>Total Votes: {this.state.totalVotes}</div>
            </div>
              <VotesChart
                answers={this.state.answers}
                totalVotes={this.state.totalVotes}
              />
          </div>

            {this.renderPollOptions()}
        </div>
		);
	}
}

const mapStateToProps = ({
	auth,
	showVoteOptions
}) => {
	return {
		auth,
		showVoteOptions
	};
}

export default connect(mapStateToProps, {
	showVotes
})(Poll);
