import React, { use } from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import Time from 'pages/Time';
import Link from 'next/link';
import styles from '../../styles/memory.module.css';


const Memory = () => {
  const router = useRouter();
  const { numCards, plantsForGame, sound, language } = router.query;  // Get query params
  const [isWinner, setIsWinner] = useState(false)
  const [shuffledPlants, setShuffledPlants] = useState([]); // Store shuffled plants
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const plant_name_field = 
  language === "latin" ? "שם הצמח בלטינית" : 
  language === "pinyin" ? "שם הצמח בפין יין" : 
  "שם הצמח בסינית"; 
  const [flippedCards, setFlippedCards] = useState([]); // Track flipped cards
  const [matchedCards, setMatchedCards] = useState([]); // Track matched cards
  const toPracticeOn = "תפקודים והערות";

  
  // Shuffle and duplicate the plants for the game
  useEffect(() => {
 
    if (plantsForGame.length > 0) {
      const shuffled = shufflePlants(plantsForGame);
      setShuffledPlants(shuffled);
    }
    setLoading(false)
  }, []);

  


  const shufflePlants = (arr) => {
    if (typeof arr === 'string') {
      arr = JSON.parse(arr); // Convert string to array
    }
    if (!Array.isArray(arr)) {
      console.error('Error: Expected an array, but got:', arr);
      return []; // Return an empty array if the input is not valid
    }
  
    // Create the pairs
    const plantPairs = arr.map(plant => {
      if (plant[plant_name_field] &&  plant["תפקודים והערות"].length > 0) {
        // Pick a random "תיפקוד" from the plant's list
        const characters = plant[toPracticeOn].split(",") ;
        const randomUse = characters[Math.floor(Math.random() * characters.length)];
        // Create two cards: one with the plant name, and one with the "תיפקוד"

        return [
          { plantObj: plant, type: 'name', content: plant[plant_name_field], contentId: randomUse}, // Card with the name
          { plantObj: plant, type: 'use', content: randomUse, contentId:randomUse} // Card with the תיפקוד
        ];
      } else {
        //return just the card name twice
        return [
          {plantObj: plant,  type: 'name', content: plant[plant_name_field] , contentId: plant[plant_name_field]}, // Card with the name
          { plantObj: plant, type: 'use', content: plant[plant_name_field] , contentId: plant[plant_name_field]} // Card with the תיפקוד
        ];
      }
    });
  
    const flattenedPairs = plantPairs.flat();
    const shuffled = flattenedPairs.sort(() => Math.random() - 0.5);
  
    return shuffled;
  };
 
  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || matchedCards.includes(index)) {
      return; // Prevent flipping more than two cards at once or if card is already matched
    }
    setFlippedCards((prevFlipped) => [...prevFlipped, index]); // Flip the card
  };

  // Check for a match after two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      const c1 = shuffledPlants[firstIndex]
      const c2 = shuffledPlants[secondIndex]
      if ((c1.type === "name" && c2.type === "use" && c1.contentId === c2.contentId) || 
      (c1.type === "use" && c2.type === "name" && c1.contentId === c2.contentId))
      {
        // If cards match, add them to matchedCards
        // console.log("mutch!", shuffledPlants[firstIndex].type, shuffledPlants[secondIndex].type)
        setMatchedCards((prevMatched) => [...prevMatched, firstIndex, secondIndex]);
        
      }
      
      // Wait a moment before resetting flipped cards (to allow user to see the cards)
      setTimeout(() => setFlippedCards([]), 1500);  // Reset flipped cards after delay
    }
  }, [flippedCards, shuffledPlants]);

  useEffect(() => {
    console.log(numCards, matchedCards.length)
    if (matchedCards.length >= numCards) {
      setIsWinner(true);
    }
  }, [matchedCards, numCards]);

  // Display loading or error messages
  if (loading) return <div>Loading game...</div>;
  if (error) return <div>{error}</div>;

  return (

    <div className="App">
      <Time/>
      {isWinner ? (
          <h1>Congratulations, You Won!</h1>

      ):(<div className="memory-board">
        {shuffledPlants.map((plant, index) => (
          <div 
            key={index}
            className={`category-box memory-card ${flippedCards.includes(index) || matchedCards.includes(index) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
              {flippedCards.includes(index) || matchedCards.includes(index) 
                ? <h2 className="card-text">{plant.content}</h2> 
                : ':)'}
           
          </div>
        ))}
      </div>)
      }
      <div className="links">
        <Link  className="categoryCardBox" href={{pathname:`/Games/GameSettings/`, query:{ name_game: "Memory" }}}>
            Play again
          </Link>
          <Link   className="categoryCardBox" href={"/"}>
            Home
          </Link>
      </div>
    </div>
  );
};

export default Memory;