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
    this.filterTitle = this.filterTitle.bind(this);
    this.filterGenre = this.filterGenre.bind(this);
    this.filterRated = this.filterRated.bind(this);
    this.randomMovie = this.randomMovie.bind(this);
    this.filterType = this.filterType.bind(this);
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

  randomMovie() {
    //get random number between 1 and 2099999
    var randomNumber = Math.floor((Math.random() * 999999) + 1);
    var randomNumberToString = randomNumber.toString();
    if (randomNumberToString.length < 7) {
      randomNumberToString = "0" + randomNumberToString;
    }
    var imdbID = "tt0" + randomNumberToString;
    fetch(`http://www.omdbapi.com/?apikey=${key}&i=${imdbID}`)
    .then(response => response.json())
    .then(randomResults => this.setState({
      searchResult : randomResults
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

  filterTitle () {
    var filteredTitle = document.getElementById("input-title").value;
    var uppercaseFilteredTitle = filteredTitle.toUpperCase();
    var table = document.getElementById('movie-table');
    var tr = table.getElementsByTagName('tr');
    for (var i = 2; i < tr.length; i++) {
      var td = tr[i].getElementsByTagName('td')[1];
      if (td) {
        var value = td.textContent || td.innerText;
        if (value.toUpperCase().indexOf(uppercaseFilteredTitle) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  filterGenre () {
    var filteredGenre = document.getElementById("input-genre").value;
    var uppercaseFilteredGenre = filteredGenre.toUpperCase();
    var table = document.getElementById('movie-table');
    var tr = table.getElementsByTagName('tr');
    for (var i = 2; i < tr.length; i++) {
      var td = tr[i].getElementsByTagName('td')[3];
      if (td) {
        var value = td.textContent || td.innerText;
        if (value.toUpperCase().indexOf(uppercaseFilteredGenre) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
    
  }

  filterRated () {
    var ratingFilter = document.getElementById('mpaa-rating').value;
    console.log(ratingFilter)
    var table = document.getElementById('movie-table');
    var tr = table.getElementsByTagName('tr');
    for (var i = 2; i < tr.length; i++) {
      var td = tr[i].getElementsByTagName('td')[5];
      if (td) {
        var value = td.textContent || td.innerText;
        console.log(value);
        if (value === ratingFilter) {
          tr[i].style.display = "";
        } else if (ratingFilter === "all") {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
    
  }

  filterWatched () {
    var ratingWatch = document.getElementById('watched-yes-no').value;
    console.log(ratingWatch);
    var table = document.getElementById('movie-table');
    var tr = table.getElementsByTagName('tr');
    for (var i = 2; i < tr.length; i++) {
      var td = tr[i].getElementsByTagName("td")[6];
      if (td) {
        var value = td.textContent || td.InnerText;
        console.log(value);
        if (value === ratingWatch) {
          tr[i].style.display = "";
        } else if (ratingWatch === "all") {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }   
  }

  filterType () {
    var type = document.getElementById("type-filter").value;

  }

  render() {
    return (
      <div>
        <div>
        <input id="search-input" type="text" size="50"></input>
        <button type="button" onClick={this.search}>Search</button>
        <button type="button" onClick={this.randomMovie}>Random!</button>
        </div>
        <div>
        <SearchResults type={this.state.searchResult.Type} error={this.state.searchResult.Error} addToList={this.addToList} rotten={this.state.searchResult.Ratings} actors={this.state.searchResult.Actors} year={this.state.searchResult.Year} rated={this.state.searchResult.Rated} plot={this.state.searchResult.Plot} genre={this.state.searchResult.Genre} title={this.state.searchResult.Title} poster={this.state.searchResult.Poster}/>
        </div>
        <div className="added-movies">
          <table id="movie-table">
            <tr className="recommended-movie">
              <th></th>
              <th>Title</th>
              <th>Year(s)</th>
              <th>Genre</th>
              <th>Type</th>
              <th>Rated</th>
              <th>Watched?</th>
              <th>Date Added</th>
              <th>Date Watched</th>
              <th></th>
              <th></th>         
           </tr>
           <tr className="recommended-movie">
              <td></td>
              <td><input onKeyUp={this.filterTitle} type="text" id="input-title" placeholder="Filter for title"></input></td>
              <td></td>
              <td><input onKeyUp={this.filterGenre} type="text" id="input-genre" placeholder="Filter for genre"></input></td>
              <td><select onChange={this.filterType} id="type-filter">
                  <option value="all">?</option>
                  <option value="movie">Movie</option>
                  <option value="series">Series</option>
              </select></td>
              <td><select onChange={this.filterRated} id="mpaa-rating">
                  <option value="all">?</option>
                  <option value="G">G</option>
                  <option value="PG">PG</option>
                  <option value="PG-13">PG-13</option>
                  <option value="R">R</option>
                  <option value="NC-17">NC-17</option>
                  <option value="N/A">N/A</option>
                  <option value="Not Rated">Not Rated</option>
                  <option value="TV-Y">TV-Y</option>
                  <option value="TV-Y7">TV-Y7</option>
                  <option value="TV-G">TV-G</option>
                  <option value="TV-PG">TV-PG</option>
                  <option value="TV-14">TV-14</option>
                  <option value="TV-MA">TV-MA</option>
              </select></td>
              <td><select onChange={this.filterWatched} id="watched-yes-no">
                  <option value="all">?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
              </select></td>
              <td></td>
              <td></td>
           </tr>
          {this.state.movieList.map(movie => <RecommendedMovie type={movie.type} created={movie.created} updated={movie.updated} watchMovie={this.watchMovie} id={movie.id} deleteMovie={this.deleteMovie} poster={movie.poster} title={movie.title} genre={movie.genre} year={movie.year} rated={movie.rated} watched={movie.watched}/>)}
          </table>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));