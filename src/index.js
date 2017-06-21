import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import firebase from 'firebase';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDUw8r07MooelXJfRA732d4hKRVIReunu4';

firebase.initializeApp({
    apiKey: "AIzaSyB6IjjKkxHFGYlMZIQKDkHmr5HO3G1diu4",
    authDomain: "clon-youtube.firebaseapp.com",
    databaseURL: "https://clon-youtube.firebaseio.com",
    storageBucket: "clon-youtube.appspot.com",
    messagingSenderId: "406610829790"
});

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      videos : [],
      onVideoSelect : null
     };
     this.videoSearch('Edgar Allan Poe');
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
           videos: videos,
           onVideoSelect: videos[0]
         });
    });
  }

  render(){
    const videoSearch = _.debounce( (term) => {this.videoSearch(term)}, 300);
    return (<div>
          <SearchBar onSearchTermChange={videoSearch}/>
          <VideoDetail video={this.state.onVideoSelect }  />
          <VideoList
              videos={this.state.videos}
              onVideoSelect={ (onVideoSelect) => this.setState({onVideoSelect}) } />
      </div>);
  }
}

ReactDOM.render(<App />, document.querySelector('.container'))
