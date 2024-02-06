import React from 'react'
import Navbar from '../components/Navbar'
import '../css/post.css'
import data from '../data.js'
import Card from '../components/Card.jsx'

const Post = () => {
  return (
    <>
         <Navbar />
         <div className='post-div'>
        {data.map((product) => (
          <Card key={product.id} creator={product} />
        ))}
        </div>
    </>
  )
}

export default Post