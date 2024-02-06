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
import Recommendations from './screens/Recommendations';
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
          <Route path='/recommendation' element={<Recommendations />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
