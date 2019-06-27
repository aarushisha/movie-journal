import React from 'react';
var moment = require('moment-timezone');

//maybe change this into a table 
const RecommendedMovie = (props) => {
  return (
    <tr className="recommended-movie" key={props.id}>
      <td>{props.poster !== "N/A" ? <img id="list-poster"  src={props.poster}></img> : ""}</td>
      <td>{props.title}</td>
      <td>{props.year}</td>
      <td>{props.genre}</td>
      <td>{props.type}</td>
      <td id="movie-rated">{props.rated}</td>
      <td id="movie-watched">{props.watched === 0 ? 'NO': 'YES'}</td>
      <td>{(moment.tz(props.created,"America/Los_Angeles")).format().slice(0,10)}</td>
      <td>{props.updated ? (moment.tz(props.updated,"America/Los_Angeles")).format().slice(0,10): ""}</td>
      <td><button id={props.id} onClick={props.watchMovie} type="button">Watched</button></td>
      <td><button id={props.id} type="button" onClick={props.deleteMovie}>Delete</button></td>
    </tr>
  )

}

export default RecommendedMovie;