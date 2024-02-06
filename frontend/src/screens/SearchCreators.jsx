import React from 'react'
import Navbar from '../components/Navbar'
import '../css/searchpage.css'
import data from '../data.js'
import Card from '../components/Card.jsx'
import { useState} from 'react'


const SearchCreators = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  // const [isCreatorLoggedIn, setIsCreatorLoggedIn] = useState(false);

  // useEffect(() => {
  //   const user = localStorage.getItem('user')

  //   if(user === "CC"){
  //     setIsCreatorLoggedIn(true)
  //   }
  // },[isCreatorLoggedIn])

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    filterData(e.target.value);
  };

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
              value={searchQuery}
              onChange={handleSearchInputChange} 
              placeholder='Search creators...'   
          />
          <button class="search-button">🔍</button>
      </div>
        <div className='search-div'>
        {filteredData.map((product) => (
          <Card key={product.id} creator={product} />
        ))}
        </div>
    </>
  )
}

export default SearchCreators