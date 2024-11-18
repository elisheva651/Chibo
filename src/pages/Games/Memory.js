import React from 'react'

import Link from 'next/link'
import { useState } from 'react'
import { plantsCategories, difficultyOptions } from 'utils/labels';
import { Checkbox, FormControlLabel } from '@mui/material';

export default function Memory() {

  const [selectedCategories, setSelectedCategories] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [sound, setSound] = useState(true);  // true means sound on by default
  const [selectedLanguage, setSelectedLanguage] = useState("latin"); // Default to latin
  const [language, setLanguage] = useState('לטינית');
  // 2. Handler functions to update state
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (selectedCategories.includes(category)) {
      // Remove category from selected if it's already selected
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    } else {
      // Add category to selected
      setSelectedCategories([...selectedCategories, category]);
    }
    console.log("selectedCategories", selectedCategories)
  };
  
  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  }
  const handleSoundChange = (e) => setSound(e.target.checked);
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };


  return (
    <div className='App-Mem'>
      <div className='top-mem-game-setting'>
        קטגוריות צמחים/ערוצים

        {plantsCategories.map((category, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={handleCategoryChange}
            />
          }
          label={category}
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
      
        <Link href={{ pathname: '/Games/MemGameStart', query: { plantsCategories: selectedCategories, difficulty: difficulty, sound:sound , language:language} }}>
          <button>אפשר להתחיל</button>
        </Link> 
      </div>
    </div>
  )
}
