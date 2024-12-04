import React, { use } from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import Time from 'pages/Time';


const MemoryGame = () => {
  const router = useRouter();
  const { difficulty, plantsCategories, sound, language } = router.query;  // Get query params
  const [numCards, setNumCards] = useState(0);
  const [isWinner, setIsWinner] = useState(false)
  const [plants, setPlants] = useState([]);
  const [shuffledPlants, setShuffledPlants] = useState([]); // Store shuffled plants
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const plant_name_field = language === "latin" ? "שם הצמח בלטינית" : "שם הצמח בסינית";
  const [flippedCards, setFlippedCards] = useState([]); // Track flipped cards
  const [matchedCards, setMatchedCards] = useState([]); // Track matched cards
  
  // Fetch plants based on selected difficulty
  const fetchPlants = async (plantsCategory) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/plantsData?plantsCategories=${plantsCategory}`);
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
  // Fetch plants when difficulty changes
  useEffect(() => {
    fetchPlants(plantsCategories);
  }, []);  // Re-fetch when difficulty changes

  // Shuffle and duplicate the plants for the game
  useEffect(() => {
    
  
    const difficultyMap = {
      easy: 5,
      medium: 10,
      hard: 15,
    };
    const maxCards = difficultyMap[difficulty] * 2 || 10;

    if (plants && plants.length > 0){
      setNumCards(Math.min(maxCards, plants.length * 2));
    }else{
      setNumCards(maxCards)
    }
    if (plants.length > 0) {
      const shuffled = shufflePlants(plants, maxCards);
      setShuffledPlants(shuffled);
    }
    
  }, [plants]);

  


  const shufflePlants = (arr, maxCards) => {
    if (!Array.isArray(arr)) {
      console.error('Error: Expected an array, but got:', arr);
      return []; // Return an empty array if the input is not valid
    }
  
    // Ensure we have enough plants to create the pairs
    const plantsForPairs = arr.slice(0, maxCards / 2);
  
    // Create the pairs
    const plantPairs = plantsForPairs.map(plant => {
      if (plant.name && Array.isArray(plant["תפקודים והערות"]) && plant["תפקודים והערות"].length > 0) {
        // Pick a random "תיפקוד" from the plant's list
        const randomUse = plant["תפקודים והערות"][Math.floor(Math.random() * plant["תפקודים והערות"].length)];
        console.log("plant[תפקודים והערות]", plant["תפקודים והערות"], plant[plant_name_field])
        // Create two cards: one with the plant name, and one with the "תיפקוד"
        return [
          { plantObj: plant, type: 'name', content: plant[plant_name_field] }, // Card with the name
          { plantObj: plant, type: 'use', content: randomUse } // Card with the תיפקוד
        ];
      } else {
        return [
          {plantObj: plant,  type: 'name', content: plant[plant_name_field] }, // Card with the name
          { plantObj: plant, type: 'use', content: plant[plant_name_field] } // Card with the תיפקוד
        ];
      }
    });
  
    // Flatten the array of pairs into a single array of cards
    const flattenedPairs = plantPairs.flat();
  
    // Shuffle the cards randomly
    const shuffled = flattenedPairs.sort(() => Math.random() - 0.5);
  
    return shuffled;
  };
  // // Shuffle plants (duplicate and randomize)
  // const shufflePlants = (arr, maxCards) => {
  //   if (!Array.isArray(arr)) {
  //     console.error('Error: Expected an array, but got:', arr);
  //     return [];  // Return an empty array if the input is not valid
  //   }
  //   const plantsForPairs = arr.slice(0, maxCards / 2);

  //   const shuffled = [...plantsForPairs, ...plantsForPairs]; // Duplicate for matching pairs
  //   return shuffled.sort(() => Math.random() - 0.5); // Shuffle the array randomly
  // };

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

      if (shuffledPlants[firstIndex].plantObj === shuffledPlants[secondIndex].plantObj) {
        // If cards match, add them to matchedCards
        // console.log("mutch!", shuffledPlants[firstIndex].type, shuffledPlants[secondIndex].type)
        setMatchedCards((prevMatched) => [...prevMatched, firstIndex, secondIndex]);
      }
      
      // Wait a moment before resetting flipped cards (to allow user to see the cards)
      setTimeout(() => setFlippedCards([]), 1500);  // Reset flipped cards after delay
    }
  }, [flippedCards, shuffledPlants]);

 

  // Display loading or error messages
  if (loading) return <div>Loading game...</div>;
  if (error) return <div>{error}</div>;

  return (

    <div className="App">
      {console.log(shuffledPlants, "shuffledPlants")}
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
              {flippedCards.includes(index) || matchedCards.includes(index) 
                ? plant.content // Show content (either plant name or tifkud)
                : ':)'} {/* Placeholder when the card is not flipped */}
           
              {/* {plant.type === 'name' ? plant.content : ''} */}

          </div>
        ))}
      </div>)
      }
    </div>
  );
};

export default MemoryGame;