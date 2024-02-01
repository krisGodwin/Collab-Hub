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

    const navigate = useNavigate();

    const goCreator = () => {
      navigate('/post')
    }
  
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

    // eslint-disable-next-line
    const onSignup = () => {
      navigate('/signup')
    }
  

        return (
          <>
            <Navbar />
            <div className="loginDiv">
              <div className="login-container">
                <img src="./logo.png" alt="" />
                <h2 className="login-title">Create Your Post</h2>
                <form onSubmit={handleSubmit} className="login-form">
                  <div className="input-block">
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      name="name"
                      id="input-text"
                      required
                      spellCheck="false"
                    />
                    <span className="placeholder">name</span>
                  </div>
                  <div className="input-block">
                    <input
                      type="password"
                      value={description}
                      onChange={handleDescriptionChange}
                      name="password"
                      id="password-text"
                      required
                      spellCheck="false"
                    />
                    <span className="placeholder">Description</span>
                  </div>
                  <button type="submit" className="login-button">
                    Post
                  </button>
                </form>
              </div>
            </div>
            <div className="temp">
              <button onClick={goCreator} type="submit" className="reccomendation-button">
                      Browse Recommendations
              </button>
            </div>
          </>
  )
}

export default Profile