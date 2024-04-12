import React, { useState } from 'react';
import './App.css';
import useScript from './hooks/useScript';
import styles from './style.css'; // Make sure this CSS import is being used appropriately in your styles

function App() {
  // Hook to manage the script
  useScript('https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1');

  // State to hold the username and login status
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle the login click
  const handleLogin = (event) => {
    event.preventDefault(); // Prevent form submission from reloading the page
    setIsLoggedIn(true); // Update the login status
  };

  // Function to update the username state
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <div className="greeting-box">
          <h2>Hello, {username}</h2>
        </div>
      ) : (
        <div className="form-box">
          <div className="form">
            <form className="login-form">
              <center><h1 className="main-heading">Login Form</h1></center>
              <input
                id="user"
                type="text"
                placeholder="user name"
                value={username}
                onChange={handleUsernameChange} // Update state on input change
              />
              <input id="pass" type="password" placeholder="password"/>
              <button id="login-button" onClick={handleLogin}>LOGIN</button>
              <p className="message">Not Registered? <a href="#">Register</a></p>
            </form>
          </div>
        </div>
      )}
      <df-messenger
        chat-title="HealthViz-1"
        agent-id="b9f0a9b6-d000-41a8-aba7-ae8d78134912"
        language-code="en"
      ></df-messenger>
    </div>
  );
}

export default App;
