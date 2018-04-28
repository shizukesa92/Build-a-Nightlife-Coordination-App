import { connect } from 'react-redux';
import { fetchSearchList, toggleAndUpdateRsvp } from '../../assets/action';
import Search from './Search';

const mapStateToProps = state => ({
	...state.search,
	token: state.account.token,
	userInfo: state.account.userInfo
})

const mapDispatchToProps = dispatch => ({
	getSearchList: (city, sortBy) => dispatch(fetchSearchList(city, sortBy)),
	toggleRsvpAction: (id, info) => dispatch(toggleAndUpdateRsvp(id, info)) 
})

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export default SearchContainer;