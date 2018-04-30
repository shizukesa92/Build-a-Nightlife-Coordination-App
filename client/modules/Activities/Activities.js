import React from 'react';
import {
	Container,
	Header,
	Feed
} from 'semantic-ui-react';
import {
	connect
} from 'react-redux';
import {
	toggleAndUpdateRsvp
} from './ActivityActions';

const ActivityList = (props) => (
	<Feed.Event className="user-activity">
      <Feed.Label icon="heart" />
      <Feed.Content>
        <Feed.Summary className="user-activity-title"
          as="a" href={props.info.url} content={props.info.name} date={props.date} />
        <Feed.Extra>
          <div>location: {props.info.location.city}</div>
          <div>phone: {props.info.phone}</div>
        </Feed.Extra>
        <Feed.Like icon="trash" content="Cancel RSVP" onClick={() => props.toggleRsvpAction(props.id, props.info)} />
      </Feed.Content>
    </Feed.Event>
)

export const Activities = (props) => {
	if (props.token) {
		return (
			<Container className="user-activities-root">
			  	<Header as='h1' inverted>Recent activities of {props.userInfo.username}</Header>
			  	{
			  		props.userInfo.rsvps.length 
			  		? <Feed>
			  			{
			  				props.userInfo.rsvps.map(rsvp => 
			  					<ActivityList 
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

const mapStateToProps = state => ({
	userInfo: state.account.userInfo,
	token: state.account.token
})

const mapDispatchToProps = dispatch => ({
	toggleRsvpAction: (id, info) => dispatch(toggleAndUpdateRsvp(id, info))
})

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
