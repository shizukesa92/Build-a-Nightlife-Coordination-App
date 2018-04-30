import React from 'react';
import {
	Header,
	Input,
	Dropdown
} from 'semantic-ui-react'

const dropdownOptions = [{
		key: 1,
		text: 'sort by > rating',
		value: 'rating'
	},
	{
		key: 2,
		text: 'sort by > review count',
		value: 'review_count'
	},
	{
		key: 3,
		text: 'sort by > distance',
		value: 'distance'
	},
];

export default class SearchBar extends React.Component {
	state = {
		city: this.props.city,
		sortBy: this.props.sortBy
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			city: nextProps.city,
			sortBy: nextProps.sortBy
		})
	}
	handleInputChange = e => this.setState({
		city: e.target.value
	})
	handleDropdownChange = (e, {
		value
	}) => this.setState({
		sortBy: value
	})
	handleSearchSubmit = e => {
		e.preventDefault();
		let {
			city,
			sortBy
		} = this.state;
		this.props.getSearchList(city, sortBy);
	}
	render() {
		return (
			<div className={this.props.withSearchResult ? 'search-bar top' : 'search-bar middle'}>
				<Header 
					className="search-bar-header"
					as="h2" inverted color="teal">Search for a city and start your city night</Header>
				<form className="search-bar-input" onSubmit={this.handleSearchSubmit}>
				    <Input transparent type='text' placeholder='Search...' 
				    	value={this.state.city} 
				    	onChange={this.handleInputChange} />
				    <Dropdown 
				    	className="search-bar-dropdown icon" floating button 
				    	options={dropdownOptions} value={this.state.sortBy}
				    	onChange={this.handleDropdownChange} />
				</form>
				{
					!!this.props.error &&
					<div className="search-error" >{this.props.error}</div>
				}
			</div>
		)
	}
}
