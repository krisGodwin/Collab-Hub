import React from 'react'
import Navbar from '../components/Navbar'
import '../css/searchpage.css'
import data from '../data.js'
import Card from '../components/Card.jsx'

const Post = () => {
  return (
    <>
         <Navbar />
         <div className='search-div'>
        {data.map((product) => (
          <Card key={product.id} creator={product} />
        ))}
        </div>
    </>
  )
}

export default Post