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
      setErrorMessage('');
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
      // Assuming "date" key exists in the data, sort it to make 'date' last
      if (data.length > 0) {
        const columns = Object.keys(data[0]);
        const dateIndex = columns.indexOf('date');
        if (dateIndex > -1) {
          columns.push(columns.splice(dateIndex, 1)[0]);
        }
        setData(data.map(item => {
          return columns.reduce((obj, key) => ({ ...obj, [key]: item[key] }), {});
        }));
      }
    })
    .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <div className="App" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <video autoPlay loop muted style={{
        position: 'absolute',
        width: '100%',
        left: '50%',
        top: '50%',
        height: '100%',
        objectFit: 'cover',
        transform: 'translate(-50%, -50%)',
        zIndex: '-1'
      }}>
        <source src="video1.mp4" type="video/mp4" />
      </video>

      {!isLoggedIn ? (
  <div style={{
    display: 'flex', // Use flexbox to align children
    alignItems: 'center', // Center align vertically
    justifyContent: 'center', // Center align horizontally
    height: '100vh', // Full screen height
    padding: '20px', // Padding for aesthetic spacing
  }}>
    <div style={{
      textAlign: 'center',
      maxWidth: '330px',
      width: '100%', // Responsive width
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // Optional: adds shadow for better focus
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
  </div>
) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}>
          <h2 style={{
            color: 'white',
            textShadow: '2px 2px 4px black' // White text with black border
          }}>Hello, {username}</h2>
          <table style={{
            width: '80%',
            margin: '20px auto',
            borderCollapse: 'collapse',
            backgroundColor: 'white', // Table background to white
            border: '2px solid black' // Black border for the table
          }}>
            <thead>
              <tr>
                {data.length > 0 && Object.keys(data[0]).map((key) => (
                  <th key={key} style={{
                    border: '1px solid #ddd',
                    padding: '8px',
                    textAlign: 'left',
                    textTransform: 'capitalize' // Capitalize headings
                  }}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((val, idx) => (
                    <td key={idx} style={{
                      border: '1px solid #ddd',
                      padding: '8px',
                      textAlign: 'left'
                    }}>{val}</td>
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
