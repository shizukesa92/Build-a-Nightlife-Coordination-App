import React from 'react';
import { Container, Header, Feed } from 'semantic-ui-react';
import Activity from './Activity';
import './MyActivities.css';

const MyActivities = (props) => {
	if(props.token) {
		return (
			<Container className="user-activities-root">
			  	<Header as='h1' inverted>Recent activities of {props.userInfo.username}</Header>
			  	{
			  		props.userInfo.rsvps.length 
			  		? <Feed>
			  			{
			  				props.userInfo.rsvps.map(rsvp => 
			  					<Activity 
			  						key={rsvp.date + rsvp.id} 
			  						id={rsvp.id} 
			  						info={rsvp.info} 
			  						date={rsvp.date}
			  						toggleRsvpAction={props.toggleRsvpAction} />)
			  			}
		  			  </Feed>
			  		: <Header as="h3" inverted>You don't have any recent activity yet, browse and reserve now!</Header>
			  	}
			</Container>
		)
	} else {
		return (
			<Container>
				<Header as="h3" inverted>Please login to view your recent activities!</Header>
			</Container>
		)
	}
  
}

export default MyActivities