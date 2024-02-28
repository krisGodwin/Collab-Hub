import React from 'react'
import Navbar from '../components/Navbar'
import '../css/signup.css'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const Signup = () => {

  const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
      
        const handleEmailChange = (e) => {
          setEmail(e.target.value);
        };
      
        const handlePasswordChange = (e) => {
          setPassword(e.target.value);
        };

        const REGISTER_CC_URL = "http://localhost:8000/content/register"

        const REGISTER_HH_URL = "http://localhost:8000/hiring/register"

        const navigate = useNavigate();

        const notifyA = (msg) => toast.error(msg);
        const notifyB = (msg) => toast.success(msg);
      
        // eslint-disable-next-line
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // eslint-disable-next-line
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

        const goSearchPage = () => {
          navigate('/search')
        }
      
        const handleSubmitCC = (e) => {
          e.preventDefault();
          if (!emailRegex.test(email)) {
            notifyA("Invalid email");
            return;
          } else if (!passRegex.test(password)) {
            notifyA(
              "Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!"
            );
            return;
          }
            axios.post(REGISTER_CC_URL, {
              email,
              password
            })
            .then((response) => {
              if(response.status=== 200){
                console.log(response.data.id)
                console.log(response.status)
                console.log(response.data.message)
                notifyB("Account created")
                goSearchPage();
              }
              return response.status
            })
            .catch((error) => {
              console.log(error)
            })
        };

        const handleSubmitHH = (e) => {
          e.preventDefault();
          axios.post(REGISTER_HH_URL, {
            email,
            password
          })
          .then((response) => {
            console.log(response._id)
            goSearchPage()
            return response.status
          })
          .catch((error) => {
            console.log(error)
          })
        };

  const[isCreator, setCreator] = useState(true)

    const changeToSponsor = () => {
        setCreator(false)
    }

    const changeToCreator = () => {
      setCreator(true)
  }


  return (
    <>
        <Navbar />
        <div className="signup-container">
        <div className="button-div">
                <button  onClick={changeToCreator}>Creator</button>
                <button onClick={changeToSponsor}>Sponsor</button>
            </div>
        </div>
        { isCreator ? <div className="loginDiv">
            <div className="login-container">
            <img src="./logo.png" alt=""></img>
                <h2 className="login-title">Sign-up into CollabHub as a Creator</h2>
            <form onSubmit={handleSubmitCC} className="login-form">
            <div className="input-block">
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      name="email"
                      id="input-text"
                      required
                      spellCheck="false"
                    />
                    <span className="placeholder">Email</span>
                  </div>
                  <div className="input-block">
                    <input
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      name="password"
                      id="password-text"
                      required
                      spellCheck="false"
                    />
                    <span className="placeholder">Password</span>
                  </div>
                    <button type="submit" className="login-button">
                    Sign-Up
                    </button>
                </form>
            </div>
        </div>
         : <div className="loginDiv">
         <div className="login-container">
         <img src="./logo.png" alt=""></img>
             <h2 className="login-title">Sign-up into CollabHub as a Sponsor</h2>
         <form onSubmit={handleSubmitHH} className="login-form">
         <div className="input-block">
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      name="email"
                      id="input-text"
                      required
                      spellCheck="false"
                    />
                    <span className="placeholder">Email</span>
                  </div>
                  <div className="input-block">
                    <input
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      name="password"
                      id="password-text"
                      required
                      spellCheck="false"
                    />
                    <span className="placeholder">Password</span>
                  </div>
                 <button type="submit" className="login-button">
                 Sign-Up
                 </button>
             </form>
         </div>
     </div>}
    </>
  )
}

export default Signup