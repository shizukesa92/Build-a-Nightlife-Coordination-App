import React from 'react';
import { connect } from 'react-redux';
import { toggleAndUpdateRsvp } from '../../assets/action';
import MyActivities from './MyActivities';

const mapStateToProps = state => ({
  userInfo: state.account.userInfo,
  token: state.account.token
})

const mapDispatchToProps = dispatch => ({
  toggleRsvpAction: (id, info) => dispatch(toggleAndUpdateRsvp(id, info)) 
})

const MyActivitiesContainer = connect(mapStateToProps, mapDispatchToProps)(MyActivities);

export default MyActivitiesContainer