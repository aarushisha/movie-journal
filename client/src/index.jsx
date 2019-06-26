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
    var id = parseInt(event.target.id);
    fetch('/deleteMovie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: id})
    })
    location.reload();
  }

  watchMovie() {
    var id = parseInt(event.target.id);
    console.log(id);
    fetch('/watchMovie', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: id})
    })
    location.reload();

  }

  render() {
    return (
      <div>
        <div>
        <input id="search-input" type="text" size="50"></input>
        <button type="button" onClick={this.search}>Search</button>
        </div>
        <div>
        <SearchResults error={this.state.searchResult.Error} addToList={this.addToList} rotten={this.state.searchResult.Ratings} actors={this.state.searchResult.Actors} year={this.state.searchResult.Year} rated={this.state.searchResult.Rated} plot={this.state.searchResult.Plot} genre={this.state.searchResult.Genre} title={this.state.searchResult.Title} poster={this.state.searchResult.Poster}/>
        </div>
        <div className="added-movies">
        <div className="added-movies-header">
          Your Movie List
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
          {this.state.movieList.map(movie => <RecommendedMovie watchMovie={this.watchMovie} id={movie.id} deleteMovie={this.deleteMovie} poster={movie.poster} title={movie.title} genre={movie.genre} year={movie.year} rated={movie.rated} watched={movie.watched}/>)}
          </table>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));