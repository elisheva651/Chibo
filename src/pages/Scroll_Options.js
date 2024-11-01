import React, { useEffect, useState, useRef } from 'react';
import Games from './ways_to_learn/Games';
import Summaries from './ways_to_learn/Summaries';
import Lectures from './ways_to_learn/Lectures';
import Exercises from './ways_to_learn/Exercises';
import Link from 'next/link';



function Scroll_Options({options}) {

  const scrollRef = useRef(null); // Ref to scroll the container

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current){
      if (direction === 'left') {
        current.scrollBy({ left: -300, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }};


  const arr_options = options.map(obj => Object.entries(obj)[0]);


  return (
    <div className="categories-container">
        <button className="scroll-button left" onClick={() => scroll('left')}>
        ◀
      </button>
      <div className="categories-list" ref={scrollRef}>
      {arr_options?.map(([hebrew, english], index) => {
        const targetPath = `/ways_to_learn/${english}`;

        

        return (
          <Link
            key={index}
            className="category-box"
            href={targetPath} // Use the correct path
          >
            {hebrew}
          </Link>
      )})}
      </div>

      <button className="scroll-button right" onClick={() => scroll('right')}>
        ▶
      </button>
      
    </div>
  );
};

export default Scroll_Options;