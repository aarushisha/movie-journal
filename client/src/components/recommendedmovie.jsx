import React from 'react';

//maybe change this into a table 
const RecommendedMovie = (props) => {
  return (
    <div>
    <tr className="recommended-movie" key={props.id}>
      <td><img height="50" width="auto" src={props.poster}></img></td>
      <td>{props.title}</td>
      <td>{props.year}</td>
      <td>{props.genre}</td>
      <td>{props.rated}</td>
      <td>{props.watched}</td>
      <td><button type="button">Watched</button></td>
      <td><button id={props.id} type="button" onClick={props.deleteMovie}>Delete</button></td>
    </tr>
    </div>
  )

}

export default RecommendedMovie;