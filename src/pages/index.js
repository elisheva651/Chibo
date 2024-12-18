import Scroll_Options from './Scroll_Options';
import React  from 'react';
import { ways_to_learn, categories, names_of_games } from 'utils/labels';
import Manager from './Manager';
import Link from 'next/link';



export default function Home() {


  return (
    <div className='App'>
      <div className="card">
      <div className="categories-container" style={{display: 'flex', flexWrap: 'wrap'}} >

        <h1 className="welcome-text">איזה כיף שבאת לצ'יבו</h1>
        {ways_to_learn?.map((item, index) => {
        const [hebrew, english] = Object.entries(item)[0];  // Get the first (and only) key-value pair in each object
        const targetPath = `/ways_to_learn/${english}`;
        // console.log("hebrew, english, targetPath", hebrew, english, targetPath);
        return (
          <Link key={index}  className="category-box" href={targetPath}>
            {hebrew}
          </Link>
      )
      })}
        </div>
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
