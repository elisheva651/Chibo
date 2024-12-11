import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { plantsCategories, difficultyOptions } from 'utils/labels';
import { Checkbox, FormControlLabel } from '@mui/material';
import { plantsJsons } from 'utils/plantsJsons';
import { useRouter } from 'next/router';
import Chip from '@mui/material/Chip';


export default function Memory() {
  const router = useRouter();

  const [selectedCategories, setSelectedCategories] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [sound, setSound] = useState(true);  // true means sound on by default
  const [selectedLanguage, setSelectedLanguage] = useState("latin"); // Default to latin
  const difficultyMap = {
    easy: 5,
    medium: 10,
    hard: 15,
  };
  
  
  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  }
  const handleSoundChange = (e) => setSound(e.target.checked);
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };


  function getRandomNumbers(maxPlants, length) {
    const randomNumbers = new Set();
    while (randomNumbers.size < maxPlants) {
        const randomIndex = Math.floor(Math.random() * length); // Random index from 0 to length-1
        randomNumbers.add(randomIndex);  // Add the index to the Set
    }
    return [...randomNumbers];
  }


  const filterAndLimitPlants = () => {
    const maxPlants = difficultyMap[difficulty] ;

    // Step 1: Filter plants by selected categories
    const filteredPlants = plantsJsons.filter((plant) =>
      selectedCategories.includes(plant['קטגוריה']) // Match plant category with selected categories
    );
    if (maxPlants >= filteredPlants.length){
      return filteredPlants
    }
    const randomIndices = getRandomNumbers(maxPlants, filteredPlants.length);
    
    // Map the random indices to elements from filteredPlants
    const subArray = randomIndices.map(index => filteredPlants[index]);
    return subArray;
  };



  const handleStartClick = () => {
    const final_plants_for_game = filterAndLimitPlants(plantsJsons, selectedCategories, difficulty, difficultyMap);
    console.log(final_plants_for_game)
    // Navigate with the updated data in the query
    router.push({
      pathname: '/Games/MemGameStart',
      query: {
        plantsCategories: selectedCategories,
        difficulty: difficulty,
        sound: sound,
        language: selectedLanguage,
        numCards:final_plants_for_game.length * 2, 
        plantsForGame: JSON.stringify(final_plants_for_game)
      },
    });
  };

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };


  return (
    <div className='App'>
    <div className="mem-game-card">
   
    <h2>קטגוריות צמחים/ערוצים</h2>
    {plantsCategories.map((category, index) => (
    <Chip
      key={index}
      label={category}
      onClick={() => toggleCategory(category)}
      color={selectedCategories.includes(category) ? "primary" : "default"}
    />
  ))}

      

      

        מספר קלפים
        <select value={difficulty} onChange={handleDifficultyChange}>
          {difficultyOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <br />
        

      בחר שפה
      <label>
        <input type="radio" value="latin" checked={selectedLanguage === "latin"} onChange={handleLanguageChange}/>
        לטינית
      </label>
      <label>
        <input type="radio" value="chinese" checked={selectedLanguage === "chinese"} onChange={handleLanguageChange} />
        סינית
      </label><br /> 
        
        צלילים
        <label>
          <input type="checkbox" checked={sound} onChange={handleSoundChange}/>
        </label><br /> 

        <button onClick={handleStartClick}>אפשר להתחיל</button>
    </div>
    </div>
  )
}
