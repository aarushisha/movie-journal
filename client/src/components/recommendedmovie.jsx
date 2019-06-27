import React from 'react';

//maybe change this into a table 
const RecommendedMovie = (props) => {
  return (
    <tr className="recommended-movie" key={props.id}>
      <td><img id="list-poster" src={props.poster}></img></td>
      <td>{props.title}</td>
      <td>{props.year}</td>
      <td>{props.genre}</td>
      <td id="movie-rated">{props.rated}</td>
      <td id="movie-watched">{props.watched === 0 ? 'NO': 'YES'}</td>
      <td><button id={props.id} onClick={props.watchMovie} type="button">Watched</button></td>
      <td><button id={props.id} type="button" onClick={props.deleteMovie}>Delete</button></td>
      <td>{props.created}</td>
      <td>{props.updated}</td>
    </tr>
  )

}

export default RecommendedMovie;