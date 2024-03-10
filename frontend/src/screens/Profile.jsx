import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
// import MultiSelectCheckBox from 'react-multiselect-checkboxes';
import { toast } from "react-toastify";
import axios from 'axios';
import '../css/profile.css';

const Profile = () => {
  const [title, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ytlink, setYtLink] = useState('')
  const[instlink, setInstLink] = useState('')
  const [checked, setChecked] = useState([]);
  const [filename, setImage] = useState('');
  // const [selectedOptions, setSelectedOptions] = useState([]);
  // eslint-disable-next-line
  // const CLOUD_NAME = "dt0ndopcz"

  const navigate = useNavigate();

  const PROFILE_CC_URL = "http://localhost:8000/content/addpost";

  const PROFILE_HH_URL = "http://localhost:8000/hiring/addpost";

  const checkList = ["Tech", "Music", "Sport", "Entertainment"];

  const contentCreatorType = localStorage.getItem("user")

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

  const handleImage = (e) =>{
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
}

  const setFileToBase = (file) =>{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () =>{
          setImage(reader.result);
      }
  }

  const token = localStorage.getItem('token');

  const headers = {
    'Authorization': `Bearer ${token}`
  };

  const goSearchPage = () => {
    navigate('/search')
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    var contenttypes = checked
    if(contentCreatorType === "CC"){
      axios.post(PROFILE_CC_URL, {
        title,
        description,
        ytlink,
        instlink,
        contenttypes,
        filename,
        contentCreatorType,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      },
        { headers }
      )
    .then((response) => {
      if(response.status === 204){
        toast.success("Post Created")
        localStorage.setItem("post","true")
        goSearchPage()
      }
      console.log(response.data);
      console.log(response.status)
    })
    .catch((error) => {
      console.log(error);
    });
    } else {
      axios.post(PROFILE_HH_URL, {
        title,
        description,
        ytlink,
        instlink,
        contenttypes,
        filename,
        contentCreatorType,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      },{ headers }
      )
        .then((response) => {
          console.log(response.data);
          if(response.status === 204){
            toast.success("Post Created")
            localStorage.setItem("post","true")
            goSearchPage()
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleYTChange = (e) => {
    setYtLink(e.target.value);
  };

  const handleISNTGChange = (e) => {
    setInstLink(e.target.value);
  };

  // const handleDropdownChange = (selected) => {
  //   setSelectedOptions(selected.map(option => option.value));
  // };

  return (
    <>
      <Navbar />
      <div className="loginDiv">
        <div className="profile-login-container">
          <img src="./logo.png" alt="" />
          <h2 className="login-title">Create Your Post</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-block">
              <input
                type="text"
                value={title}
                onChange={handleNameChange}
                name="name"
                id="input-text"
                required
                spellCheck="false"
              />
              <span className="placeholder">Name</span>
            </div>
            {/* <div className="input-block">
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
            </div> */}
            <div className="input-block">
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  name="description"
                  id="description-text"
                  required
                  spellCheck="false"
                />
                <span className="placeholder">Description</span>
              </div>
              <div className="input-block">
              <input
                type="text"
                value={ytlink}
                onChange={handleYTChange}
                name="name"
                id="input-text"
                required
                spellCheck="false"
              />
              <span className="placeholder">Youtube Link</span>
            </div>
            <div className="input-block">
              <input
                type="text"
                value={instlink}
                onChange={handleISNTGChange}
                name="name"
                id="input-text"
                required
                spellCheck="false"
              />
              <span className="placeholder">Instagram Link</span>
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
            <div className="temp">
                <input onChange={handleImage}  type="file" id="formupload" name="filename" className="form-control"  />
                <label className="form-label" htmlFor="form4Example2">Image</label>
            </div>
            <img className="img-fluid" src={filename} alt="" />
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
      {/* <div className="temp">
        <button onClick={goCreator} className="reccomendation-button">
          Browse Recommendations
        </button>
      </div> */}
    </>
  );
};

export default Profile;
