import React from 'react'
import Navbar from '../components/Navbar'
import '../css/post.css'
// import data from '../data.js'
import Card from '../components/Card.jsx'
import { useState, useEffect } from "react"
import axios from 'axios';

const Post = () => {

  const [userposts, setUserposts] = useState([])

  const POST_CC_URL = "http://localhost:8000/hiring/getallposts"

  const getData = async () => {
    await axios.get(POST_CC_URL
      )
      .then((response) => {
        console.log(response.data.data)
        setUserposts(response.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
         <Navbar />
         <div className='post-div'>
         {userposts.map((product) => (
          <Card key={product.id} creator={product} />
        ))}
        </div>
    </>
  )
}

export default Post