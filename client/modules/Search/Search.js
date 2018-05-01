import React from 'react';
import PropTypes from 'prop-types';
import {
	Container
} from 'semantic-ui-react'
import SearchBar from './SearchBar';
import {
	SearchResult
} from './SearchResult';
import {
	formatSearchList,
	fetchSearchList
} from './SearchActions';
import {
	toggleAndUpdateRsvp
} from "../Activities/ActivityActions";
import {
	connect
} from 'react-redux';
export class Search extends React.Component {
	static propTypes = {
		userInfo: PropTypes.object,
		token: PropTypes.string,
		city: PropTypes.string,
		sortBy: PropTypes.string,
		searchList: PropTypes.array,
		error: PropTypes.string,
		loading: PropTypes.bool,
		getSearchList: PropTypes.func,
		toggleRsvpAction: PropTypes.func
	}
	componentDidMount() {
		if (localStorage.city) {
			let city = localStorage.city;
			let sortBy = localStorage.sortBy;
			this.getSearchList(city, sortBy);
		}
	}
	getSearchList = (city, sortBy) => {
		localStorage.city = city;
		localStorage.sortBy = sortBy;
		this.props.getSearchList(city, sortBy)
	}
	handleRsvpAction = (id, info) => {
		this.props.toggleRsvpAction(id, info);
	}
	render() {
		let {
			city,
			sortBy,
			searchList,
			error,
			token,
			userInfo
		} = this.props;
		let withSearchResult = !!searchList.length;
		let searchListDisplay = formatSearchList(searchList, userInfo.rsvps);
		return (
			<Container className="search-root">
				<SearchBar 
					city={city}
					sortBy={sortBy}
					error={error}
					withSearchResult={withSearchResult} 
					getSearchList={this.getSearchList} />
				{
					withSearchResult &&
					<SearchResult 
						searchList={searchListDisplay} 
						token={token}
						handleRsvpAction={this.handleRsvpAction} />
				}
    		</Container>
		)
	}
}

const mapStateToProps = state => ({
	...state.search,
	token: state.account.token,
	userInfo: state.account.userInfo
})

const mapDispatchToProps = dispatch => ({
	getSearchList: (city, sortBy) => dispatch(fetchSearchList(city, sortBy)),
	toggleRsvpAction: (id, info) => dispatch(toggleAndUpdateRsvp(id, info))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Search);
