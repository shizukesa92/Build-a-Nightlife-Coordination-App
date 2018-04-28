import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { changeActionType, submitAccountRequest } from '../../assets/action';
import Account from './Account';

const mapStateToProps = state => ({
	...state.account
})

const mapDispatchToProps = dispatch => ({
	switchActionType: () => dispatch(changeActionType()),
	submitAccountInfo: ({ username, password, actionType }) => dispatch(submitAccountRequest({ username, password, actionType }))
})

const AccountContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Account));

export default AccountContainer