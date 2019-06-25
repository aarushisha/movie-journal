import React from 'react';
import ReactDOM from 'react-dom';
import key from '../../omdb_api_key.js';
import SearchResults from './components/searchresults.jsx';
import RecommendedMovie from './components/recommendedmovie.jsx';
var _ = require('lodash');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: {},
      recommendedList: [],
      watchedList: [],
    }
    this.search = this.search.bind(this);
    this.addToList = this.addToList.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.watchMovie = this.watchMovie.bind(this);
  }

  search() {
    var movie = document.getElementById("search-input").value;
    var searchQueryArray = [];
    for (var i = 0; i < movie.length; i++) {
      if (movie[i] === " ") {
        searchQueryArray.push('+')
      } else {
        searchQueryArray.push(movie[i]);
      }
    }
    var searchQuery = searchQueryArray.join("");
    fetch(`http://www.omdbapi.com/?apikey=${key}&t=${searchQuery}`)
    .then(response => response.json())
    .then(searchResults => this.setState({
      searchResult: searchResults
    }));
  }

  addToList() {
    var moviesCopy = _.cloneDeep(this.state.recommendedList);
    moviesCopy.push(this.state.searchResult);
    console.log(moviesCopy);
    // this.setState({recommendedList: moviesCopy});
    fetch('/addMovie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.searchResult)
    })
  }

  componentDidMount() {
    //getMovies()

  }

  getMovies() {
   //get request for all movies and status
  }

  deleteMovie() {

  }

  watchMovie() {

  }

  render() {
    return (
      <div>
        <div>
        Search Movie <input id="search-input" type="text"></input>
        <input onClick={this.search} type="submit" value="Search"></input>
        </div>
        <div>
        <SearchResults addToList={this.addToList} rotten={this.state.searchResult.Ratings} actors={this.state.searchResult.Actors} year={this.state.searchResult.Year} rated={this.state.searchResult.Rated} plot={this.state.searchResult.Plot} genre={this.state.searchResult.Genre} title={this.state.searchResult.Title} poster={this.state.searchResult.Poster}/>
        </div>
        <div className="recommended-movies">
          List of Recommended Movies
          {this.state.recommendedList.map(movie => <RecommendedMovie deleteMovie={this.deleteMovie}rotten={movie.Ratings[1].Value} actors={movie.Actors} poster={movie.Poster} title={movie.Title} genre={movie.Genre} year={movie.Year} rated={movie.Rated}/>)}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));