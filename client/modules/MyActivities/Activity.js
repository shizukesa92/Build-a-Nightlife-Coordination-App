import React from 'react';
import { Feed } from 'semantic-ui-react';
import './MyActivities.css';

const Activity = (props) => (
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

export default Activity