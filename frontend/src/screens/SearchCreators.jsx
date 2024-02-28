import React from 'react'
import Navbar from '../components/Navbar'
import '../css/searchpage.css'
import data from '../data.js'
import Card from '../components/Card.jsx'
import axios from 'axios';
import { useState, useEffect, useCallback} from 'react'


const SearchCreators = () => {
  // eslint-disable-next-line
  const [searchQuery, setSearchQuery] = useState('');
  // eslint-disable-next-line
  const [filteredData, setFilteredData] = useState(data);
  const [userposts, setUserposts] = useState([])

  // eslint-disable-next-line
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    // filterData(e.target.value);
  };

  

  const POST_CC_URL = "http://localhost:8000/content/getallposts"

  const POST_HH_URL = "http://localhost:8000/hiring/getallposts"

  const contentCreatorType = localStorage.getItem("user")

  const getData = useCallback(async () => {
    if (contentCreatorType === "CC") {
      await axios.get(POST_CC_URL
        )
        .then((response) => {
          console.log(response.data.data)
          setUserposts(response.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      await axios.get(POST_HH_URL
        )
        .then((response) => {
          console.log(response.data.data)
          setUserposts(response.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    
  },[contentCreatorType])

  useEffect(() => {
    getData()
  }, [getData])

  // eslint-disable-next-line
  const filterData = (query) => {
    const filtered = data.filter((creator) =>
      creator.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };


  return (
    <>
         <Navbar  />
        <div class="search-container">
          <input
              type="text"
              class="search-input"
              value={""}
              onChange={""} 
              placeholder='Search creators...'   
          />
          <button class="search-button">🔍</button>
      </div>
        <div className='search-div'>
        {userposts.map((product) => (
          <Card key={product.id} creator={product} />
        ))}
        </div>
    </>
  )
}

export default SearchCreators