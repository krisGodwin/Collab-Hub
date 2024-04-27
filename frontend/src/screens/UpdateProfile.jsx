import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
// import MultiSelectCheckBox from 'react-multiselect-checkboxes';
import { toast } from "react-toastify";
import axios from 'axios';
import '../css/profile.css';

const UpdateProfile = () => {
  const [title, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ytlink, setYtLink] = useState('')
  const[instlink, setInstLink] = useState('')
  const[totalvideos, setTotalVideos] = useState('')
  const[totalsubscriber, setTotalSubscribers] = useState('')
  const[totalviews, setTotalViews] = useState('')
  const [checked, setChecked] = useState([]);
  const [filename, setImage] = useState('');
  // const [selectedOptions, setSelectedOptions] = useState([]);
  // eslint-disable-next-line
  // const CLOUD_NAME = "dt0ndopcz"

  const navigate = useNavigate();

  const PROFILE_CC_URL = "http://localhost:8000/content/updatepost";

  const PROFILE_HH_URL = "http://localhost:8000/hiring/updatepost";

  const checkList = ["Tech", "Music", "Sport", "Entertainment"];

  const contentCreatorType = localStorage.getItem("user")
  const user_id = localStorage.getItem("user_id")

  
  useEffect(() => {
    if(contentCreatorType === "CC") {
        axios.get(`http://localhost:8000/content/getcontent`,{
        params: {
            user_id: user_id
        }, 
    })
      .then(response => {
        const { data } = response;
        console.log(data.data[0])
          setName(data.data[0].title);
          setDescription(data.data[0].description);
          setYtLink(data.data[0].youtube_link);
          setInstLink(data.data[0].instagram_link);
          setTotalVideos(data.data[0].No_of_videos);
          setTotalSubscribers(data.data[0].Subscriber_Count);
          setTotalViews(data.data[0].Total_Views);
        }
      )
      .catch(error => console.error(error));
    } else {
        axios.get(`http://localhost:8000/hiring/getcontent`,{
        params: {
            user_id: user_id
        }, 
    })
      .then(response => {
        const { data } = response;
        console.log(data.data[0])
          setName(data.data[0].title);
          setDescription(data.data[0].description);
          setYtLink(data.data[0].youtube_link);
          setInstLink(data.data[0].instagram_link);
        }
      )
      .catch(error => console.error(error));
    }
  }, [user_id, contentCreatorType]);
  // const goCreator = () => {
  //   navigate('/recommendation');
  // };

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
        totalvideos,
        totalsubscriber,
        totalviews,
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

  const handleTotalSubscriberChange = (e) => {
    setTotalSubscribers(e.target.value)
  }

  const handleTotalVideosChange = (e) => {
    setTotalVideos(e.target.value)
  }
  const handleTotalViewsChange = (e) => {
    setTotalViews(e.target.value)
  }

  // const handleDropdownChange = (selected) => {
  //   setSelectedOptions(selected.map(option => option.value));
  // };

  return (
    <>
      <Navbar />
      { contentCreatorType === "CC" ? <div className="loginDiv">
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
            <div className="input-block">
              <input
                type="text"
                value={totalvideos}
                onChange={handleTotalVideosChange}
                name="name"
                id="input-text"
                spellCheck="false"
              />
              <span className="placeholder">Total Videos</span>
            </div>
            <div className="input-block">
              <input
                type="text"
                value={totalsubscriber}
                onChange={handleTotalSubscriberChange}
                name="name"
                id="input-text"
                spellCheck="false"
              />
              <span className="placeholder">Total Subscribers</span>
            </div>
            <div className="input-block">
              <input
                type="text"
                value={totalviews}
                onChange={handleTotalViewsChange}
                name="name"
                id="input-text"
                spellCheck="false"
              />
              <span className="placeholder">Total Views</span>
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
            <button type="submit" className="login-button">
              Post
            </button>
          </form>
        </div>
      </div> 
      :
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
            <button type="submit" className="login-button">
              Post
            </button>
          </form>
        </div>
      </div>}
      
    </>
  );
};

export default UpdateProfile;
