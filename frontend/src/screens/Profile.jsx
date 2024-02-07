import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
// import MultiSelectCheckBox from 'react-multiselect-checkboxes';
import axios from 'axios';
import '../css/profile.css';

const Profile = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [checked, setChecked] = useState([]);
  // const [selectedOptions, setSelectedOptions] = useState([]);
  // eslint-disable-next-line
  const CLOUD_NAME = "dt0ndopcz"

  const navigate = useNavigate();

  const PROFILE_URL = "http://localhost:8000/content/profile";

  const checkList = ["Entertainment", "Music", "Sport", "Lifestyle"];

  const goCreator = () => {
    navigate('/recommendation');
  };

  const handleCheck = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setChecked(prevChecked => [...prevChecked, value]);
    } else {
      setChecked(prevChecked => prevChecked.filter(item => item !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(PROFILE_URL, {
      name,
      description,
      checked,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // const handleDropdownChange = (selected) => {
  //   setSelectedOptions(selected.map(option => option.value));
  // };

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
              <span className="placeholder">Name</span>
            </div>
            <div className="input-block">
              <input
                type="text"
                value={description}
                onChange={handleDescriptionChange}
                name="description"
                id="description-text"
                required
                spellCheck="false"
              />
              <span className="placeholder">Description</span>
            </div>
            <div className="app">
              <div className="checkList">
                <div className="title">Select your content types</div>
                <div className="list-container">
                  {checkList.map((item, index) => (
                    <div key={index}>
                      <input
                        value={item}
                        type="checkbox"
                        checked={checked.includes(item)}
                        onChange={handleCheck}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                {`Content Types: ${checked.join(", ")}`}
              </div>
            </div>
            {/* <div className="dropdown-checkboxes">
              <MultiSelectCheckBox
                options={checkList.map(item => ({ label: item, value: item }))}
                onChange={handleDropdownChange}
                placeholder="Select options"
              />
            </div> */}
            <button type="submit" className="login-button">
              Post
            </button>
          </form>
        </div>
      </div>
      <div className="temp">
        <button onClick={goCreator} className="reccomendation-button">
          Browse Recommendations
        </button>
      </div>
    </>
  );
};

export default Profile;