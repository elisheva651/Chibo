import React, { useEffect, useState, useRef } from 'react';
// import '../styles/other.css'; // Import global CSS

function Ways_to_learn() {


  const [ways_to_learn, set_ways_to_learn] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/app_statics?type=learning'); // or ?type=studying

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        set_ways_to_learn(result);
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




  const scrollRef = useRef(null); // Ref to scroll the container

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