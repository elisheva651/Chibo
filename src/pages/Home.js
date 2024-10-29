import React from 'react'
import Way_to_learn from './Way_to_learn';

export default function home() {
  return (
    <div >
      <div className="welcome-square">
        <h1 className="welcome-text">איזה כיף שבאת לצ'יבו</h1>
      </div>
      <Way_to_learn/>
      {/* <Categories/> */}
      <button className='welcome-square'>אפשר להתחיל</button>
      
    </div>
  )
}
