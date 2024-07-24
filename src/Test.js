{/*
import React, { useState, useEffect } from 'react';
import './App.css';
import { Stitch, RemoteMongoClient, UserPasswordCredential, AnonymousCredential } from 'mongodb-stitch-browser-sdk';

const stitchAppId = 'application-0-zpwhzkl'; 
const client = Stitch.initializeDefaultAppClient(stitchAppId);
const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('yourDatabase');

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);

  const handleLogin = async () => {
    try {
      const credential = new UserPasswordCredential(email, password);
      const user = await client.auth.loginWithCredential(credential);
      setLoggedInUser(user);
      setError(null);
      await fetchBooks();
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await client.auth.logout();
      setLoggedInUser(null);
      setBooks([]);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const fetchBooks = async () => {
    try {
      const booksCollection = db.collection('yourCollection');
      const booksData = await booksCollection.find().toArray();
      setBooks(booksData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await client.auth.loginWithCredential(new AnonymousCredential());
      } catch (error) {
        console.error('Error during anonymous login:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login Page</h1>
      </header>
      {loggedInUser ? (
        <div>
          <p>Welcome, {loggedInUser.profile.email}!</p>
          <button onClick={handleLogout}>Logout</button>
          <h2>Book List</h2>
          <ul>
            {books.map((book) => (
              <li key={book._id}>
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Year: {book.year}</p>
                <p>Pages: {book.pages}</p>
                <p>Language: {book.language}</p>
                <p>Country: {book.country}</p>
                <a href={book.link}>More Info</a>
                <img src={book.imageLink} alt={book.title} width="100" />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
}

export default App;

*/}