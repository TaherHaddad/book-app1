import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import * as Realm from "realm-web"; 
import LoginPage from './LoginPage';
import HomePage from './HomePage';

// Adding my APP ID
const app = new Realm.App({ id: "books-app-vevfabb" });

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const loggedInUser = app.currentUser;
      if (loggedInUser) {
        setUser(loggedInUser);
        setIsLoggedIn(true);
      }
    }
  }, []);

  //Updates when the user logs in 
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setIsLoggedIn(true);
  };

  //Logs out user and clear user state
  const handleLogout = async () => {
    if (user) {
      try {
        await user.logOut();
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('token');  //remove user token
      } catch (err) {
        console.error('Logout failed:', err.message);
      }
    }
  };


  //Page routing 
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} client={app} />} />
          <Route path="/home" element={isLoggedIn ? <HomePage user={user} onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} client={app} />} /> 
          <Route path="/" element={isLoggedIn ? <HomePage user={user} onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} client={app} />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;



