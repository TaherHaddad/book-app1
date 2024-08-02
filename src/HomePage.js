import React, { useState, useEffect } from 'react';
import './HomePage.css';


function HomePage({ user, onLogout }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        //const response = await fetch('/api/fetchBooks'); 
        //get it to work this this code under to retrieve book
        //app.currentUser.functions.fetchBooks
      
        //const response = await user.functions.fetchBooks();  //this one is wrong but works too

        const response = await user.callFunction('fetchBooks');  //Use This one

      //if (!response.ok) {
      //  throw new Error('Network response was not ok');
      //}
        //const data = await response.json();
        setBooks(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleLogout = async () => {
    try {
      await onLogout();
    } catch (err) {
      console.error('Logout failed:', err.message);
    }
  };

  return (
    <div className="home-page">
      <h3>Logged in with email: {user.profile.email}</h3>
      <h2>Home Page</h2>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <p>Welcome! You are logged in.</p>
      {loading && <p>Loading books...</p>}
      {error && <p>Error: {error}</p>}
      {books.length > 0 && books.map((book) => (
        <div key={book.title} className="book-card">
          <div className="book-content">
            <div className="book-title">
              <h5>{book.title}</h5>
              <h6>{book.author}</h6>
              <p className="book-language">{book.language}</p>
            </div>
            <div className="book-details">
              <p>{book.country}</p>
              <p>Year: {book.year}</p>
              <p>Pages: {book.pages}</p>
              <a href={book.link} target="_blank" rel="noopener noreferrer">More info</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;



/*
import React from 'react';
import './HomePage.css';

const booksToDisplay = [
    {
      "author": "Chinua Achebe",
      "country": "Nigeria",
      "language": "English",
      "link": "https://en.wikipedia.org/wiki/Things_Fall_Apart",
      "pages": 209,
      "title": "Things Fall Apart",
      "year": 1958
    },
    {
      "author": "Hans Christian Andersen",
      "country": "Denmark",
      "language": "Danish",
      "link": "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.",
      "pages": 784,
      "title": "Fairy tales",
      "year": 1836
    }
  ];




function HomePage({ user, onLogout }) {
    const handleLogout = async () => {
      try {
        await onLogout();
      } catch (err) {
        console.error('Logout failed:', err.message);
      }
    };
    
    return (
      <div className="home-page">
        <h3>Logged in with email: {user.profile.email}</h3>
        <h2>Home Page</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        <p>Welcome! You are logged in.</p>
        {booksToDisplay.map((book) => (
          <div key={book.title} className="book-card">
            <div className="book-content">
              <div className="book-title">
                <h5>{book.title}</h5>
                <h6>{book.author}</h6>
                <p className="book-language">{book.language}</p>
              </div>
              <div className="book-details">
                <p>{book.country}</p>
                <p>Year: {book.year}</p>
                <p>Pages: {book.pages}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default HomePage;

*/