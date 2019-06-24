import React from 'react';


const SearchResults = (props) => {
  return (
    <div className="search-results">
      <div>
        {props.poster ? <img className="poster" src={props.poster}></img> : ""}
      </div>      
      <div>{props.title}</div>
      <div>{props.year}</div>
      <div>{props.genre}</div>
      <div>{props.plot}</div>
      <div>
        {props.rated ? <div>Rated: {props.rated}</div> : ""}
      </div>  
      <div>
        {props.title ? <button onClick={props.addToList} type="button">Add to List!</button> : ""}
      </div>
    </div>
  )

}

export default SearchResults;