import { useState, useEffect, use } from 'react'
import Time from 'pages/Time';
import { potions } from 'utils/potions';
import { plantsJsons } from 'utils/plantsJsons';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/potions.module.css';
import { Button } from '@mui/material';  // Import Button from MUI


// randomly chose a potion from the categories that user chose.
export default function BrewingPotions() {

  const router = useRouter();
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [droppedIngredients, setDroppedIngredients] = useState([]);

  const { selectedCategories, sound, language } = router.query;  // Get query params
  const [isWinner, setIsWinner] = useState(false)
  const categoriesArray = Array.isArray(selectedCategories) ? selectedCategories : selectedCategories ? [selectedCategories] : [];
  const numBadIngredients = 2;
  const [badIngredients, setBadIngredients ]= useState([])
  const [randomPotion, setRandomPotion] = useState()
  const [shuffledIngredients, setShuffledIngredients] = useState([]); // Store shuffled plants for the potion
  const [error, setError] = useState(false);
  const [messages, setMessage] = useState("Congratulations, You Won!");
  const plant_name_field = 
  language === "latin" ? "שם הצמח בלטינית" : 
  language === "pinyin" ? "שם הצמח בפין יין" : 
  "שם הצמח בסינית";  const [flippedCards, setFlippedCards] = useState([]); // Track flipped cards
  const [matchedComponents, setMatchedComponents] = useState([]); // Track matched cards
  
  // Shuffle and duplicate the plants for the game
  useEffect(() => {
    if (categoriesArray.length > 0) {
      
      const filteredPotions = potions.filter(potion =>
        categoriesArray.includes(potion["קטגוריות רחבות"])
      );
      if (filteredPotions.length !== 0) {
        const randomIndex = Math.floor(Math.random() * filteredPotions.length);
        setRandomPotion(filteredPotions[randomIndex]);
      }
      
    } 
    else{
      setError(true)
      setMessage("no categories was chose.");

    } 
  }, [selectedCategories, potions]);

  useEffect(() => {
    if (!randomPotion){
      return;
    }
    const ingredients = shufflePlants() // will randomly choose bad ingredients that not connects to this potion.
    setShuffledIngredients(ingredients);
  },[randomPotion]);

// randomly chose from list of not components of the potion.
  const generateBadIngredients = () => {
    const usedIndices = new Set();  // To track indices we've already tried
    const usedPlantsSet = new Set();
    randomPotion["צמחים (ברק)"].split(',').map(plant => plant.trim()).forEach(plant => usedPlantsSet.add(plant));
    const randomPlants = [];
    while (randomPlants.length < numBadIngredients) {
      // Step 3: Generate a random index and check if it is valid
      const randomIndex = Math.floor(Math.random() * plantsJsons.length);
  
      // Skip if the plant at this index is already used in the potion
      if (usedPlantsSet.has(plantsJsons[randomIndex].name) || usedIndices.has(randomIndex)) {
        continue;
      }
      randomPlants.push(plantsJsons[randomIndex][plant_name_field]);
    
    // Mark the index as used
      usedIndices.add(randomIndex);
    }
    setBadIngredients(randomPlants)
    return randomPlants;

  }

  const shufflePlants = () => {
    const randomPlants = generateBadIngredients();
    const combinedIngredients = [
      ...randomPotion["צמחים (ברק)"].split(",").map(ingredient => ingredient.trim()),
      ...randomPlants
    ];
    setDroppedIngredients(Array(combinedIngredients.length - 2).fill(null)) // now we know how mutch ingredient should be in potion.


    const shuffled = [...combinedIngredients]; // shallow copy to not harm randomPotion["צמחים (ברק)"],
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }

    return shuffled;
  };



  const handleDragStart = (e, ingredient) => {
    e.dataTransfer.setData("ingredient", ingredient);
    const dragImage = document.createElement('div');
    dragImage.textContent = ingredient;
    dragImage.style.fontSize = '16px';
    dragImage.style.color = 'green';
    dragImage.style.padding = '5px';
    dragImage.style.background = 'white';
    dragImage.style.border = '1px solid #333';
    dragImage.style.borderRadius = '4px';
    dragImage.style.position = 'absolute';  // Position it relative to the page
  dragImage.style.pointerEvents = 'none';  // Ensure it doesn't interfere with drop areas


    document.body.appendChild(dragImage);
    dragImage.style.left = `${e.clientX + 10}px`;  // Adjust offset for better positioning
    dragImage.style.top = `${e.clientY + 10}px`;   // Adjust offset for better positioning
  
    // Set the custom drag image
    e.dataTransfer.setDragImage(dragImage, dragImage.width / 2, dragImage.height / 2);

    // Clean up after the drag operation
    e.target.addEventListener('dragend', () => {
      if (dragImage.parentNode) {

        document.body.removeChild(dragImage);
      }
    });
  };

  // Handle the drop event
  const handleDrop = (e, index) => {
    e.preventDefault();
    const ingredient = e.dataTransfer.getData("ingredient");
    if(droppedIngredients.includes(ingredient)){
      return;
    }
    // Make sure we don't replace existing ingredients, only add new ones if the box is empty
    const updatedIngredients = [...droppedIngredients];
    if (updatedIngredients[index] === null) {
      updatedIngredients[index] = ingredient;
      setDroppedIngredients(updatedIngredients);
    }
  };

  // Handle the drag over event (needed for the drop to work)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...droppedIngredients];
    updatedIngredients[index] = null; // Reset the box to be empty
    setDroppedIngredients(updatedIngredients);
  };

  const handleSubmit = (e) => {
    return;
  }

  return (
    <div className={styles.game}>
      {error || isWinner ? (
        <div className='card categories-list'>
          <h1>{messages}</h1>
        </div>
  
        ):randomPotion?  (
          <div >
            <h1 className={styles.titlePotion}>{randomPotion["שם"]}</h1>
            
           
            <div className={styles.dropZoneContainer}>
              {console.log("droppedIngredients", droppedIngredients)}
            {droppedIngredients.map((ingredient, index) => (
            <div key={index} className={styles.dropBox} onDrop={(e) => handleDrop(e, index)} onDragOver={handleDragOver} onClick={() => handleRemoveIngredient(index)}>
                {ingredient ? (
                  <div className={styles.selectedIngredient}>{ingredient}</div>
                ) : (
                  <div className={styles.placeholder}>Drop ingredient here</div>
                )}
                </div>
            ))}

            </div>
            <div className={styles.plantsOptions}>
            {shuffledIngredients.map((ingredient, index) => (
          <div
            key={index}
            className="categoryCardBox"
            draggable
            onDragStart={(e) => handleDragStart(e, ingredient)}
          >
            {ingredient}
          </div>
        ))}
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',  // Horizontally center
                alignItems: 'center',      // Vertically center
                margin: 20,                 // Remove any default margin
              }}>
            <Button
                variant="contained"  // Makes it a solid button with background color
                color="primary"      // Sets the color theme (can use 'primary', 'secondary', etc.)
                className={styles.links} // Your custom class (if you want to override MUI styles)
                onClick={handleSubmit} // Handle the click
                sx={{
                  // Custom styles with MUI's sx prop (use this to override or customize styles)
                  fontWeight: 'bold', 
                  padding: '10px 20px',
                  borderRadius: '8px', 
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',  // Shadow for a more modern look
                  '&:hover': {
                    backgroundColor: 'primary.main',  // Custom hover effect
                  },
                }}
              >
                Submit
              </Button>
            </div>
          </div>

        ) : (
          <p>No potion found</p> // This is what you show if randomPotion["שם"] is not defined
        )
      }
      
      <div className="links">
        <Link  className="categoryCardBox" href={{pathname:`/Games/GameSettings/`, query:{ name_game: "BrewingPotions" }}}>
          Play again
        </Link>
        <Link   className="categoryCardBox" href={"/"}>
          Home
        </Link>
      </div>
    </div>
  );
};