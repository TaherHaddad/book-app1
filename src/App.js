import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import * as Realm from "realm-web";
import LoginPage from './LoginPage';
import HomePage from './HomePage';

// Adding my APP ID
const app = new Realm.App({ id: "books-app-vevfabb" });  //Hide the code in environment variable next time

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {   
    const token = localStorage.getItem('token');
    if (token) {
      // Ensure that the app.currentUser is properly set up
      const loggedInUser = app.currentUser;
      if (loggedInUser) {
        setUser(loggedInUser);
        setIsLoggedIn(true);
      }
    }
  }, []);

  //updates when the user logs in
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    if (user) {
      try {
        await user.logOut();
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
      } catch (err) {
        console.error('Logout failed:', err.message);
      }
    }
  };
 
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



/*
Import Realm functions to handle Login 

Line 15 
UseEffect for login is not necessary because realm function handles the login

*/
