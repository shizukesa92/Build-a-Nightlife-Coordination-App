import React, {Component} from 'react';
import SearchBar from './search_bar';
import SearchResults from './search_results';


export default class Main extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <SearchResults />
      </div>
    );
  }
}

