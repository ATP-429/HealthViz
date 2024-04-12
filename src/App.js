import React, { useState } from 'react';
import './App.css';
import useScript from './hooks/useScript';

function App() {
  useScript('https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    if (username === "ATP" && password === "admin") {
      setIsLoggedIn(true);
      fetchData();
      setErrorMessage(''); // Clear error message upon successful login
    } else {
      setErrorMessage('Username or password is wrong');
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const fetchData = () => {
    fetch('https://ATP429.pythonanywhere.com/get-data', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setData(data);
    })
    .catch(error => console.error('Error fetching data:', error));
  };

  const tableStyle = {
    width: '80%',
    margin: '20px auto',
    borderCollapse: 'collapse'
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left'
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div style={{
          textAlign: 'center',
          maxWidth: '330px',
          margin: 'auto',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#f9f9f9'
        }}>
          <div className="form">
            <form className="login-form">
              <center><h1 className="main-heading">Login Form</h1></center>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              <input
                id="user"
                type="text"
                placeholder="user name"
                value={username}
                onChange={handleUsernameChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  margin: '10px 0',
                  display: 'inline-block',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box'
                }}
              />
              <input
                id="pass"
                type="password"
                placeholder="password"
                value={password}
                onChange={handlePasswordChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  margin: '10px 0',
                  display: 'inline-block',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box'
                }}
              />
              <button onClick={handleLogin} style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '14px 20px',
                margin: '8px 0',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%'
              }}>LOGIN</button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <h2>Hello, {username}</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                {data.length > 0 && Object.keys(data[0]).map((key) => (
                  <th key={key} style={thTdStyle}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((val, idx) => (
                    <td key={idx} style={thTdStyle}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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
