import Scroll_Options from './Scroll_Options';
import React  from 'react';
import { ways_to_learn, categories } from 'utils/labels';
import Manager from './Manager';
import Link from 'next/link';




export default function Home() {


  return (
    <div className='App'>
      <div className="card">
        <h1 className="welcome-text">איזה כיף שבאת לצ'יבו</h1>
      
      <Scroll_Options options={ways_to_learn}/>
      <Scroll_Options options={categories}/>
      <button className='welcome-square'>אפשר להתחיל</button>
      </div>


    
      {/* <Link href={{ pathname: '/ToExel' }}>
          <button> get jsons from xl</button>
      </Link>   */}


      {/* <Link href={{ pathname: '/Manager' }}>
          <button>manager only</button>
      </Link>   */}
    </div>
  )
}
