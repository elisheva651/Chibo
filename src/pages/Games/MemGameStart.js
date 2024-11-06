import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import Time from 'pages/Time';


export default function MemGameStart() {

    const router = useRouter();
    // const { plantsCategories, level, sound } = router.query;
    // const numCards = 4 //for now
    const { difficulty, plantsCategories, sound } = router.query;

    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Fetch plants based on selected difficulty
    const fetchPlants = async (difficulty) => {
      try {
        setLoading(true);
        const response = await fetch(`/api/plantsData?difficulty=${difficulty}`);
        const data = await response.json();
        if (response.ok && Array.isArray(data)) {
          setPlants(data); // Only set plants if data is a valid array
        } else {
          setError('Failed to load plants or received invalid data');
        }
      } catch (err) {
        setError('Failed to load plant data');
      } finally{
        setLoading(false)
      }
    };


    
  
    // Fetch plants when difficulty changes
    useEffect(() => {
      fetchPlants(difficulty);
    }, [difficulty]);  // Re-fetch when difficulty changes
  
    if (loading) return <div>Loading game...</div>;
    if (error) return <div>{error}</div>;
  
    // Shuffle plants for the memory game cards
    const shufflePlants = (arr) => {
      if (!Array.isArray(arr)) {
        console.error('Error: Expected an array, but got:', arr);
        return [];  // Return an empty array if the input is not valid
      }
      const shuffled = [...arr, ...arr];  // Duplicate the plants for matching
      return shuffled.sort(() => Math.random() - 0.5);
    };
  
    const shuffledPlants = shufflePlants(plants);
  
    return (
      <div className='App'>
        <Time/>    
          <div className="game-board">
            <div className="game-board">
            {shuffledPlants.map((plant, index) => (
              <div key={index} className="card">
                  <p>{plant.name}</p>
              </div>
            ))}
            </div>
          </div>
      </div>
    );
}
