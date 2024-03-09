import React from 'react'
import '../css/searchpage.css'
import data from '../data.js'
import Card from '../components/Card.jsx'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Recommendations = () => {

    const [rArray, setrArray] = useState([])
    const navigate = useNavigate()

    useEffect(async () => {
    const temp = await axios.get("api")
    const temp2 = await axios.get("api/recommendation", temp)
    }, [])
    const goCreator = () => {
        navigate('/post');
      };

  return (
    <>
        <div className='search-div'>
        {data.map((product) => (
          <Card key={product.id} creator={product} />
        ))}
        </div>
        <div className="temp">
        <button onClick={goCreator} className="reccomendation-button">
          Go Back to Search
        </button>
      </div>
    </>
  )
}

export default Recommendations