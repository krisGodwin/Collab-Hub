import React from 'react'
import Navbar from '../components/Navbar'
import '../css/searchpage.css'
import data from '../data.js'
import Card from '../components/Card.jsx'
import axios from 'axios';
<<<<<<< HEAD
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
=======
>>>>>>> chat
import { useState, useEffect, useCallback} from 'react'


const SearchCreators = () => {
  // eslint-disable-next-line
  const [searchQuery, setSearchQuery] = useState('');
  // eslint-disable-next-line
  const [filteredData, setFilteredData] = useState(data);
  const [userposts, setUserposts] = useState([])

<<<<<<< HEAD

=======
>>>>>>> chat
  // eslint-disable-next-line
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    // filterData(e.target.value);
  };

  const userid = localStorage.getItem('user_id');
  

  const POST_CC_URL = "http://localhost:8000/content/getallposts"

  const POST_HH_URL = "http://localhost:8000/hiring/getallposts"

  const contentCreatorType = localStorage.getItem("user")
<<<<<<< HEAD
  // console.log(contentCreatorType)
=======
  console.log(contentCreatorType)
>>>>>>> chat
  const getData = useCallback(async () => {
    if (contentCreatorType === "CC") {
      await axios.get(POST_CC_URL,{
        params: {
            user_id: userid
        }, 
    }
        )
        .then((response) => {
<<<<<<< HEAD
          console.log(response)
=======
>>>>>>> chat
          setUserposts(response.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    } else if(contentCreatorType==="HH") {
      await axios.get(POST_HH_URL,
        {
          params: {
              user_id: userid
          }, 
      }
        )
        .then((response) => {
          setUserposts(response.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    
  },[userid,contentCreatorType])

  useEffect(() => {
    getData()
  }, [getData])

  // eslint-disable-next-line
  // const filterData = () => {
  //   const 
  // };

  const searchPost = async (e) => {
    setSearchQuery(e.target.value)
    const searchValue = e.target.value
    const { data } = await axios.get(`http://localhost:8000/content/searchposts?title=${searchValue}`)
    console.log(data)
    setUserposts(data.searchResults)
<<<<<<< HEAD
    console.log(userposts.length)
=======
>>>>>>> chat
  }


  return (
    <>
         <Navbar  />
        <div class="search-container">
          <input
              type="text"
              class="search-input"
              value={searchQuery}
              onChange={searchPost} 
              placeholder='Search creators...'   
          />
          <button class="search-button">🔍</button>
      </div>
<<<<<<< HEAD
      { userposts.length === 0 ? <div class="error-div"><img src="./error.png" alt=""></img></div> 
      : 
      <div className='search-div'>
        {userposts.map((product, index) => (
          <Card key={index} creator={product} />
        ))}
        </div>}
        
=======
      
        
        {userposts.length === 0 ? <div class="error-div"><img src="./error.png" alt=""></img></div>
        :  
        <div className='search-div'>
        {userposts.map((product, index) => (
          <Card key={index} creator={product} />
        ))}
        </div>
      }
>>>>>>> chat
    </>
  )
}

export default SearchCreators