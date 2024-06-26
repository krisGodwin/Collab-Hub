import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// eslint-disable-next-line
import Homepage from './screens/Homepage';
import LoginPage from './screens/LoginPage';
import Signup from './screens/Signup';
import SearchCreators from './screens/SearchCreators';
import Creator from './screens/Creator';
import Profile from './screens/Profile';
import Post from './screens/Post';
import { ToastContainer } from "react-toastify";
import Recommendations from './screens/Recommendations';
import PersonalChat from './screens/PersonalChat';
import UpdateProfile from './screens/UpdateProfile';
import SingleChat from './screens/SingleChat';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          <Route path="/navbar" element={<Navbar/>}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/search' element={<SearchCreators />}></Route>
          <Route path='/search/:id' element={<Creator />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/post' element={<Post />}></Route>
          <Route path="/personal-chat" element={<PersonalChat />}></Route>
          <Route path="/update-profile" element={<UpdateProfile />}></Route>
          <Route path="/singlechat/:id" element={<SingleChat />}></Route>
          <Route path='/recommendation' element={<Recommendations />}></Route>
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
