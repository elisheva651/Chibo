import React, { useEffect, useState, useRef } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null); // Ref to scroll the container


  // Fetch the categories from the backend when the component mounts
  useEffect(() => {

    fetch('http://localhost:5000/api/categories')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok'); // Handle bad responses
      }
      return response.json(); // Parse the JSON data
    }).then((data) => {
      setCategories(data);}).catch((error) => {
      console.error('Error fetching categories:', error); // Handle errors
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
      {/* {categories.map((category, index) => (
        <div className='categories'> {category}</div>
        <div className="categories-container"> */}

        <button className="scroll-button left" onClick={() => scroll('left')}>
        ◀
      </button>
      <div className="categories-list" ref={scrollRef}>

      {categories.map((categories, index) => (
        <div className="category-box"> {categories}</div>
      ))}
      </div>
      <button className="scroll-button right" onClick={() => scroll('right')}>
        ▶
      </button>
    </div>
  );
};

export default Categories;
