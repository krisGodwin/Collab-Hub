import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios';
import '../css/profile.css'

const Profile = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const PROFILE_URL = "http://localhost:8000/content/profile"

  
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(PROFILE_URL, {
          name,
          description
        })
        .then((response) => {
          return response.status
        })
        .catch((error) => {
          console.log(error)
        })
    };

    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };

    const navigate = useNavigate();
    // eslint-disable-next-line
    const onSignup = () => {
      navigate('/signup')
    }
  

        return (
          <>
            <Navbar />
            <div className="profileDiv">
              <div className="profile-container">
                <img src="./logo.png" alt="" />
                <h2 className="profile-title">Create your post</h2>
                <form onSubmit={handleSubmit} className="profile-form">
                  <div className="profile-input-block">
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      name="name"
                      id="input-text"
                      required
                      spellCheck="false"
                    />
                    <span className="placeholder">Name</span>
                  </div>
                  {/* <div className="input-block">
                    <textarea
                      rows={10} 
                      cols={85} 
                      value={description}
                      onChange={handleDescriptionChange}
                      name="text"
                      id="description-txt"
                      required
                      spellCheck="false"
                    />
                    <span className="placeholder">Description</span> */}
                  {/* </div> */}
                  <div className="profile-input-block">
                    <input
                      type="textarea"
                      value={description}
                      onChange={handleDescriptionChange}
                      name="text"
                      id="description-text"
                      required
                      spellCheck="false"
                    />
                    <span className="placeholder">Description</span>
                  </div>
                  <button type="submit" className="profile-button">
                    profile
                  </button>
                </form>
              </div>
            </div>
          </>
  )
}

export default Profile