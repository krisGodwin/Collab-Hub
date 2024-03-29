import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// eslint-disable-next-line
import Homepage from './screens/Homepage';
import LoginPage from './screens/LoginPage';
import Signup from './screens/Signup';
import SearchCreators from './screens/SearchCreators';
import Creator from './screens/Creator';
import Profile from './screens/Profile';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<LoginPage />}></Route>
          <Route path="/navbar" element={<Navbar />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/search' element={<SearchCreators />}></Route>
          <Route path='/search/:id' element={<Creator />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/homepage' element={<Homepage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
