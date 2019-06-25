import React from 'react';

//maybe change this into a table 
const RecommendedMovie = (props) => {
  return (
    <div className="recommended-movie">
      <img className="poster" src={props.poster}></img>
      <p>{props.title}</p>
      <p>{props.year}</p>
      <p>{props.genre}</p>
      <p>{props.rated}</p>
      <button type="button">Watched</button>
    </div>
  )

}

export default RecommendedMovie;