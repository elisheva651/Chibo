import React from 'react'
import Link from 'next/link'

function Summeries() {
  return (
    <div>Summeries
      <div className="links">
          <Link className="categoryCardBox" href={"/"}>
            Home
          </Link>
      </div>
    </div>
  )
}

export default Summeries