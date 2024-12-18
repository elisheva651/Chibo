import { names_of_games } from "utils/labels";
import React from 'react';
import Link from 'next/link';


const Games = () => {

  const games = names_of_games.map(obj => Object.entries(obj)[0]);

  return (
  <div className="App">
    <div className="card">
        
      <div className="categories-container" style={{display: 'flex', flexWrap: 'wrap'}} >
      {games?.map(([hebrew, english], index) => {
        const targetPath = `/Games/GameSettings`;
        console.log(english)
        const query = { name_game: english };
        return (
          <Link  key={index}  className="category-box" href={{
            pathname: targetPath,
            query: query,  // Pass the query object to the Link
          }}>
            {hebrew}
          </Link>
      )})}
      </div>
    </div>
  </div>
  );
};

export default Games;