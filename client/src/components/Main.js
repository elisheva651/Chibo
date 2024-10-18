import React from 'react'
import Categories from './Categories'
import Ways_to_learn from './Ways_to_learn'

const Main = () => {
  return (
    <div >
      <div className="welcome-square">
        <h1 className="welcome-text">איזה כיף שבאת לצ'יבו</h1>
      </div>
      <Ways_to_learn/>
      <Categories/>
      <button className='welcome-square'>אפשר להתחיל</button>
      
    </div>
  )
}

export default Main