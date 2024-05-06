import React, { useState } from 'react';
import { UserContext } from './UserContext.js';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main.jsx';
import User from './pages/User/User.jsx';
import Video from './pages/Video/Video.jsx';
import Playlist from './pages/Playlist/Playlist.jsx';
import Navbar from './components/Navbar.jsx';
import LogIn from './pages/LogIn/LogIn.jsx';
import SignIn from './pages/SignIn/SignIn.jsx';
import Create from './pages/Create/Create.jsx';
import Search from './pages/Search/search.jsx';
import Terms from './pages/terms/terms.jsx';
import './App.css';

const App = () => {
  const [username1, setUsername1] = useState(null);
  return (
    <UserContext.Provider value={{ username1, setUsername1 }}>
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Create" element={<Create />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/user" element={<User />} />
          <Route path="/video/:video_id" element={<Video />} />
          <Route path="/video" element={<Video />} />
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </div>
    </Router>
    </UserContext.Provider>
  );
};

export default App;
