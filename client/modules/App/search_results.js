import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
import SearchResult from './search_result';
import * as actions from '../actions';

class SearchResults extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  
  componentDidMount() {
    // process redux barSearchData into yelpIdString
    const yelpIds = _.map(this.props.barSearchData, (element) => {return element.id;});
    const yelpIdString = JSON.stringify(yelpIds);
    
    this.props.getUserData(yelpIdString);
  }
  
  processData(barSearchData, userData) {
    const barSearchDataCopy = [...barSearchData];
    
    _.forEach(userData, (element) => {
      barSearchDataCopy[element['__order']] = Object.assign({}, barSearchDataCopy[element['__order']], element);
    });
    
    return barSearchDataCopy;
  }
  
  // render the array of search results
  render() {
    const searchUserData = this.processData(this.props.barSearchData, this.props.userData);
    
    const results = _.map(searchUserData, (data, index) => {
      data.addBar = this.props.addBar;
      data.removeBar = this.props.removeBar;
      return <SearchResult {...data} index={index} authenticated={this.props.authenticated} history={this.context.router.history} key={data.id} />
    });
    
    return (
      <div>
        <ul className="list-group">
          {results}
        </ul>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {barSearchData: state.data.barSearchData, userData: state.data.userData, authenticated: state.auth.authenticated};
}


export default connect(mapStateToProps, {...actions})(SearchResults);

