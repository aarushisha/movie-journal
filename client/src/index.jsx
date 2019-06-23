import React from 'react';
import ReactDOM from 'react-dom';
import key from '../../omdb_api_key.js'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: {},
      recommendedList: [],
      watchedList: [],
    }
    this.search = this.search.bind(this);
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
    console.log(searchQuery);
    fetch(`http://www.omdbapi.com/?apikey=${key}&t=${searchQuery}`)
    .then(response => response.json())
    .then(searchResults => console.log(searchResults));
  }

  render() {
    return (
      <div>
        Search Movie <input id="search-input" type="text"></input>
        <input onClick={this.search} type="submit" value="Search"></input>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));