import React, { useEffect, useState, useRef } from 'react';

const Ways_to_learn = () => {
  const [ways_to_learn, setWays_to_learn] = useState([]);
  const scrollRef = useRef(null); // Ref to scroll the container



  // Fetch the categories from the backend when the component mounts
  useEffect(() => {

    fetch('http://localhost:5000/api/ways_to_learn')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok'); // Handle bad responses
      }
      return response.json(); // Parse the JSON data
    }).then((data) => {
      setWays_to_learn(data);}).catch((error) => {
      console.error('Error fetching ways_to_learn:', error); // Handle errors
    });
  }, []); 

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollBy({ left: -300, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="categories-container">

        <button className="scroll-button left" onClick={() => scroll('left')}>
        ◀
      </button>
      <div className="categories-list" ref={scrollRef}>

      {ways_to_learn.map((ways_to_learn, index) => (
        <div className="category-box"> {ways_to_learn}</div>
      ))}
      </div>
      <button className="scroll-button right" onClick={() => scroll('right')}>
        ▶
      </button>
    </div>
  );
};

export default Ways_to_learn;
