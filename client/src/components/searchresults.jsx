import React from 'react';


const SearchResults = (props) => {
  return (
    <div className="search-results">
      <div>
        {props.error ? <div>{props.error}</div> : ""}
      </div>  
      <div>
        {props.poster !== "N/A" ? <img className="poster" src={props.poster}></img> : ""}
      </div>      
      <div>{props.title}</div>
      <div>
        {props.year ? <div>Year Released: {props.year}</div> : ""}
      </div> 
      <div>
        {props.genre ? <div>Genre: {props.genre}</div> : ""}
      </div>  
      <div>{props.plot}</div>
      <div>
        {props.actors ? <div>Starring: {props.actors}</div> : ""}
      </div>  
      <div>
        {props.rated ? <div>Rated: {props.rated}</div> : ""}
      </div>  
      {/* <div id="rotten-tomatoes">
        {props.rotten ? <div>Rotten Tomatoes Rating: {props.rotten[1].Value}</div> : ""}
      </div>   */}
      <div>
        {props.title ? <button onClick={props.addToList} type="button">Add to List!</button> : ""}
      </div>
    </div>
  )

}

export default SearchResults;