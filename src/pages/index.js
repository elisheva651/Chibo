import Scroll_Options from './Scroll_Options';
import React, { useEffect, useState, useRef } from 'react';



export default function Home() {


  const [ways_to_learn, set_ways_to_learn] = useState([]);
  const[categories, set_categories] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch('/api/app_statics?type=ways_to_learn'); // or ?type=studying
        const response2 = await fetch('/api/app_statics?type=categories');
        if (!response1.ok || ! response2.ok) {
          throw new Error('Network response was not ok');
        }
        const result1 = await response1.json();
        const result2 = await response2.json();
        set_ways_to_learn(result1);
        set_categories(result2)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;






  return (
    <div className='App'>
      <div className="welcome-square">
        <h1 className="welcome-text">איזה כיף שבאת לצ'יבו</h1>
      </div>
      <Scroll_Options options={ways_to_learn}/>
      <Scroll_Options options={categories}/>
      <button className='welcome-square'>אפשר להתחיל</button>
      
    </div>
  )
}
