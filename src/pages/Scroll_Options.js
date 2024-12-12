import React  from 'react';
import Link from 'next/link';



function Scroll_Options({options}) {

 

  const arr_options = options?.map(obj => Object.entries(obj)[0]);


  return (
    <div className="categories-container">
      <div className='categories-list'>
      {arr_options?.map(([hebrew, english], index) => {
        const targetPath = `/ways_to_learn/${english}`;

        return (
          <Link key={index}  className="category-box" href={targetPath}>
            {hebrew}
          </Link>
      )})}
      </div>
    </div>
  );
};

export default Scroll_Options;