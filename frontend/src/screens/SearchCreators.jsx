import React from 'react'
import Navbar from '../components/Navbar'
import '../css/searchpage.css'
import data from '../data.js'
import Card from '../components/Card.jsx'

const SearchCreators = () => {
  return (
    <>
        <Navbar />
        <div className='search-div'>
          {data.map((product) => (
            <Card creator={product} />
          ))}
        </div>
    </>
  )
}

export default SearchCreators