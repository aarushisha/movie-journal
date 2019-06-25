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
      movieList: [],
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
    var moviesCopy = _.cloneDeep(this.state.movieList);
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
    .then(console.log('added to list'))
    location.reload();
  }

  componentDidMount() {
    this.getMovies();

  }

  getMovies() {
   fetch('/getMovie')
   .then(data => data.json())
   .then(movies => this.setState({movieList: movies}))
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
        <div className="added-movies">
        <div className="added-movies-header">
          Added Movies
        </div>
          <table className="movie-table">
            <tr className="recommended-movie">
              <th>Poster</th>
              <th>Title</th>
              <th>Year Released</th>
              <th>Genre</th>
              <th>Rated</th>
              <th>Watched?</th>
              <th></th>
              <th></th>
           </tr>
          {this.state.movieList.map(movie => <RecommendedMovie id={movie.id} deleteMovie={this.deleteMovie} poster={movie.poster} title={movie.title} genre={movie.genre} year={movie.year} rated={movie.Rated} watched={movie.watched}/>)}
          </table>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));