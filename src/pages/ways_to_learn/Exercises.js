import React from 'react'
import Link from 'next/link';

function Exercises() {
  return (
    <div>Exercises

      <div className="links">
          <Link className="categoryCardBox" href={"/"}>
            Home
          </Link>
      </div>
    </div>
  )
}

export default Exercises