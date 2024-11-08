import React, { use } from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import Time from 'pages/Time';


const MemoryGame = () => {
  const router = useRouter();
  const { difficulty, plantsCategories, sound } = router.query;  // Get query params
  const [numCards, setNumCards] = useState(0);
  const [isWinner, setIsWinner] = useState(false)
  const [plants, setPlants] = useState([]);
  const [shuffledPlants, setShuffledPlants] = useState([]); // Store shuffled plants
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [flippedCards, setFlippedCards] = useState([]); // Track flipped cards
  const [matchedCards, setMatchedCards] = useState([]); // Track matched cards
  
  // Fetch plants based on selected difficulty
  const fetchPlants = async (difficulty) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/plantsData?difficulty=${difficulty}`);
      const data = await response.json();
      if (response.ok && Array.isArray(data)) {
        setPlants(data); // Set the fetched plants
      } else {
        setError('Failed to load plants or received invalid data');
      }
    } catch (err) {
      setError('Failed to load plant data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const difficultyMap = {
      easy: 16,
      medium: 24,
      hard: 36,
    };
    const maxCards = difficultyMap[difficulty] || 16;

    // Set numCards to be the minimum between maxCards and plants.length
    if (plants && plants.length > 0){
      setNumCards(Math.min(maxCards, plants.length * 2));
    }else{
      setNumCards(maxCards)
    }
  }, [difficulty, plants]);

  // Fetch plants when difficulty changes
  useEffect(() => {
    fetchPlants(difficulty);
  }, [difficulty]);  // Re-fetch when difficulty changes

  // Shuffle and duplicate the plants for the game
  useEffect(() => {
    if (plants.length > 0) {
      const shuffled = shufflePlants(plants);
      setShuffledPlants(shuffled);
    }
  }, [plants]); // Re-shuffle when plants are loaded

  // Shuffle plants (duplicate and randomize)
  const shufflePlants = (arr) => {
    if (!Array.isArray(arr)) {
      console.error('Error: Expected an array, but got:', arr);
      return [];  // Return an empty array if the input is not valid
    }
    const shuffled = [...arr, ...arr]; // Duplicate for matching pairs
    return shuffled.sort(() => Math.random() - 0.5); // Shuffle the array randomly
  };

  // Handle card click
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

      if (shuffledPlants[firstIndex].name === shuffledPlants[secondIndex].name) {
        // If cards match, add them to matchedCards
        setMatchedCards((prevMatched) => [...prevMatched, firstIndex, secondIndex]);
      }
      console.log("in jandle click", numCards, matchedCards)
      
      // Wait a moment before resetting flipped cards (to allow user to see the cards)
      setTimeout(() => setFlippedCards([]), 1000);  // Reset flipped cards after delay
    }
  }, [flippedCards, shuffledPlants]);

 

  // Display loading or error messages
  if (loading) return <div>Loading game...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="App">
      
      {matchedCards.length === numCards ? (
        <div>
          <h1>Congratulations, You Won!</h1>

        </div>

      ):(<div className="game-board">
        {shuffledPlants.map((plant, index) => (
          <div
            key={index}
            className={`card ${flippedCards.includes(index) || matchedCards.includes(index) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {/* Show the plant name if the card is flipped or matched */}
            <p>{flippedCards.includes(index) || matchedCards.includes(index) ? plant.name : ':)'}</p>
          </div>
        ))}
      </div>)
      }
    </div>
  );
};

export default MemoryGame;