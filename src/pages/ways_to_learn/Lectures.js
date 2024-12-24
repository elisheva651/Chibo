import React from 'react'
import Link from 'next/link'

function Lectures() {
  return (
    <div>Lectures
      <div className="links">
          <Link className="categoryCardBox" href={"/"}>
            Home
          </Link>
      </div>
    </div>
  )
}

export default Lectures