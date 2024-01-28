// import React, { useCallback } from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios';
import '../css/loginpage.css'

const LoginPage = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const LOGIN_URL = "http://localhost:8000/content/login"

        const navi = useNavigate();

        const goSearchPage = () => {
          navi('/search')
        }
 
      
        const handleSubmit = (e) => {
            e.preventDefault()
            axios.post(LOGIN_URL, {
              email,
              password
            })
            .then((response) => {
              if(response.status=== 200){
                goSearchPage();
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
      

        return (
          <>
            <Navbar />
            <div className="loginDiv">
              <div className="login-container">
                <img src="./logo.png" alt="" />
                <h2 className="login-title">Login into CollabHub</h2>
                <form onSubmit={handleSubmit} className="login-form">
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
                    Login
                  </button>
                </form>
                <p className="signup">
                  New to CollabHub? <a href="/signup">Sign-Up</a>
                </p>
              </div>
            </div>
          </>
        );
      };
      
      export default LoginPage;

