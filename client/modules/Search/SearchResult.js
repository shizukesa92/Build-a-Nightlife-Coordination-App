import React from 'react';
import { Grid } from 'semantic-ui-react'
import SearchResultItem from './SearchResultItem';
import './Search.css';

const SearchResult = (props) => {
	return (
		<Grid className="search-result" >
	      {
	      	props.searchList.map(searchItem => (
	      		<SearchResultItem 
	      			key={searchItem.id} 
	      			searchItem={searchItem} 
	      			token={props.token}
	      			handleRsvpAction={props.handleRsvpAction} />
	      	))
	      }
	    </Grid>
	)
}

export default SearchResult;