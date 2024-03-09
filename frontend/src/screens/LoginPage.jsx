// import React, { useCallback } from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../css/loginpage.css'

const LoginPage = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const notifyA = (msg) => toast.error(msg);
        // const notifyB = (msg) => toast.success(msg);
        

        const LOGIN_CC_URL = "http://localhost:8000/content/login"

        const LOGIN_HH_URL = "http://localhost:8000/hiring/login"

        const navi = useNavigate();

        const goSearchPage = () => {
          navi('/search')
        }

        const handleSubmitCC = (e) => {
            e.preventDefault()
            axios.post(LOGIN_CC_URL, {
              email,
              password
            }, {
              withCredentials: true,
              headers: {
                  'Access-Control-Allow-Origin': '*', 
                  'Content-Type': 'application/json'}
              })
            .then((response) => {
              if(response.status === 200){
                toast.success("User Logged in");
                localStorage.setItem('user', "CC")
                localStorage.setItem("token",response.data._token)
                localStorage.setItem("user_id",response.data._id)
                localStorage.setItem("post",response.data._post)
                goSearchPage();
              } else {
                notifyA("Invalid credentials")
                return;
              }
              return response.status
            })
            .catch((error) => {
              console.log(error)
            })
        };

        const handleSubmitHH = (e) => {
          e.preventDefault()
          axios.post(LOGIN_HH_URL, {
            email,
            password
          }, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*', 
                'Content-Type': 'application/json'}
            })
          .then((response) => {
            if(response.status=== 200){
              toast.success("User Logged in");
              localStorage.setItem('user', "HH")
              localStorage.setItem("token",response.data._token)
              localStorage.setItem("user_id",response.data._id)
              localStorage.setItem("post",response.data._post)
              goSearchPage();
            } else {
              toast.error("Invalid credentials");
            }
            return response.status
          })
          .catch((error) => {
            console.log(error)
          })
      };

        const handleEmailChange = (e) => {
          setEmail(e.target.value);
        };
      
        const handlePasswordChange = (e) => {
          setPassword(e.target.value);
        };

        const navigate = useNavigate();
        // eslint-disable-next-line
        const onSignup = () => {
          navigate('/signup')
        }

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
                <h2 className="login-title">Login into CollabHub as a Creator</h2>
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
                   Log-In
                 </button>
                 <p className="signup">New user? <a href='/signup'>Sign-up</a> in collab hub</p>
                </form>
            </div>
        </div>
         : <div className="loginDiv">
         <div className="login-container">
         <img src="./logo.png" alt=""></img>
             <h2 className="login-title">Login into CollabHub as a Sponsor</h2>
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
                   Log-In
                 </button>
                 <p className="signup">New user? <a href='/signup'>Sign-up</a> in collab hub</p>
             </form>
         </div>
     </div>}
          
          </>
        );
      };
      
      export default LoginPage;

