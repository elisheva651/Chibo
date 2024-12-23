import { useState, useEffect, use } from 'react'
import Time from 'pages/Time';
import { potions } from 'utils/potions';
import { plantsJsons } from 'utils/plantsJsons';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/potions.module.css';


// randomly chose a potion from the categories that user chose.
// randomly chose from the components of the potion and from list of not components of the potion.
export default function BrewingPotions() {

  const router = useRouter();
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
  // const toPracticeOn = "תפקודים והערות";

  
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

    const shuffled = [...combinedIngredients]; // shallow copy to not harm randomPotion["צמחים (ברק)"],
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }

    return shuffled;
  };



 
  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || matchedCards.includes(index)) {
      return; // Prevent flipping more than two cards at once or if card is already matched
    }
    setFlippedCards((prevFlipped) => [...prevFlipped, index]); // Flip the card
  };

  // Check for a match after two cards are flipped
  


  return (

    <div className={styles.game}>
      {error || isWinner ? (
        <div className='card categories-list'>
          <h1>{messages}</h1>
           
        
        </div>
  
      ):randomPotion?  (
        <div>
          <div className={styles.titlePotion}>
            {randomPotion["שם"]}
          </div>
            <div className={styles.plantsOptions}>
              {console.log("shuffledIngredients", shuffledIngredients)}
            {shuffledIngredients.map((ingredient, index) => (
                <div key={index} className={styles.categoryBox}>
                  {ingredient}
                </div>
            ))}
            </div>
          </div>

          ) : (
         <p>No potion found</p> // This is what you show if randomPotion["שם"] is not defined
        )
      }
      <div className={styles.links}>
        <Link  className={styles.categoryBox} href={{pathname:`/Games/GameSettings/`, query:{ name_game: "BrewingPotions" }}}>
            Play again
          </Link>
          <Link   className={styles.categoryBox} href={"/"}>
            Home
          </Link>
      </div>
    </div>
  );
};

