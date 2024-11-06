import React from 'react'
import Link from 'next/link'
import { useState } from 'react'

export default function Memory() {

  const [plantsCategories, setCategories] = useState([])
  const [difficulty, setDifficulty] = useState("easy")
  const [sound, setSound] = useState([])



  return (
    <div className='App'>
        <div className='top-mem-game-setting'>
            קטגוריות צמחים/ערוצים
        </div>
        <div className='rec2-setting-mem-game'>
            רמת קושי

        </div>
        <div className='rec3-setting-mem-game'>
            צלילים
        </div>
        <Link href={{ pathname: '/Games/MemGameStart', query: { plantsCategories: plantsCategories, difficulty: difficulty, sound:sound } }}>
          <button>אפשר להתחיל</button>
        </Link>  
        

    </div>
  )
}
