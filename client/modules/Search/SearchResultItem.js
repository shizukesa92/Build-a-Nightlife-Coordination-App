import React from 'react';
import {
	Link
} from 'react-router-dom';
import {
	Card,
	Icon,
	Rating,
	Statistic
} from 'semantic-ui-react';

export const SearchResultItem = (props) => {
	const searchResultInfo = [{
			label: 'Price',
			value: props.searchItem.price
		},
		{
			label: 'Distance',
			value: Math.round(props.searchItem.distance) + 'm'
		},
	]
	return (
		<Card color='teal' className="search-result-item">
        	<a className="search-result-image" href={props.searchItem.url}
        		style={{backgroundImage: `url(${props.searchItem.image_url})`}} />
        	<Card.Content>
		      <Card.Header className="search-result-title" as="a" href={props.searchItem.url}>
		        {props.searchItem.name}
		      </Card.Header>
		      <Card.Meta>
		        <Rating id="search-result-rating"
		        	icon='star' defaultRating={props.searchItem.rating} maxRating={5} disabled />({props.searchItem.review_count})
				<Statistic.Group id="search-result-info"
					items={searchResultInfo} size='mini' />
		      </Card.Meta>
		    </Card.Content>
		    {
		    	props.token 
		    	? 
		    	<Card.Content extra 
		    		className={props.searchItem.rsvp ? "search-result-action rsvp" : "search-result-action"}
		    		onClick={() => props.handleRsvpAction(props.searchItem.id, props.searchItem)}
		    	>
			        <div className="search-result-action-content">
			        	<Icon name='like' />{' '} {props.searchItem.rsvp ? "Click to cancel" : "Click to go!"}
			        </div>
			    </Card.Content>
			    :
			    <Card.Content extra className="search-result-action" as={Link} to="/login">
			        <div className="search-result-action-content"  >
			        	<Icon name='like' />{' '} Login to Rsvp!
			        </div>
			    </Card.Content>
		    }
		    
        </Card>
	)
}
