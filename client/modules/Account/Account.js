import React from 'react';
import PropTypes from 'prop-types';
import {
	Header,
	Button
} from 'semantic-ui-react';
import AccountForm from './AccountForm';
import {
	connect
} from 'react-redux';
import {
	withRouter
} from 'react-router-dom'
import {
	changeActionType,
	submitAccountRequest
} from './AccountActions';

export const Account = (props) => {
	let actionType = props.match.params.actionType;
	let isLogin = !!props.token;
	let displayType = actionType[0].toUpperCase() + actionType.slice(1);
	if (actionType === 'logout') {
		return (
			<div className="account-root">
				<Header as="h1" inverted color='teal'>{displayType}</Header>
				{
					isLogin 
					? <div>
						<Header as="h3" inverted>Sure that you want to logout? </Header>
						<Button color="teal" inverted fluid
						    onClick={() => props.submitAccountInfo({username: '', password: '', actionType: 'logout'})}
						>
					  		{displayType}
						</Button>
					  </div>
					: <Header as="h3" inverted>You have logged out successfully!</Header>
				}
			</div>
		)
	} else {
		return <AccountForm 
					actionType={actionType} 
					isLogin={isLogin}
					userInput={props.userInput}
					userInfo={props.userInfo}
					loading={props.loading}
					errorMsg={props.errorMsg}
      				submitionStatus={props.submitionStatus}
      				switchActionType={props.switchActionType}
      				submitAccountInfo={props.submitAccountInfo} />
	}
}

Account.PropTypes = {
	userInput: PropTypes.object,
	userInfo: PropTypes.object,
	token: PropTypes.string,
	actionType: PropTypes.string,
	errorMsg: PropTypes.string,
	submitionStatus: PropTypes.string,
	loading: PropTypes.bool,
	switchActionType: PropTypes.func,
	submitAccountInfo: PropTypes.func
};




const mapStateToProps = state => ({
	...state.account
})

const mapDispatchToProps = dispatch => ({
	switchActionType: () => dispatch(changeActionType()),
	submitAccountInfo: ({
		username,
		password,
		actionType
	}) => dispatch(submitAccountRequest({
		username,
		password,
		actionType
	}))
})

const AccountContainer = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Account));
