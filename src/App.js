import React, { useState, useEffect, useMemo} from 'react';
import './App.css';
import useScript from './hooks/useScript';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

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
      setData(data);
    })
    .catch(error => console.error('Error fetching data:', error));
  };



  const Home = () => <div>Home Page: Welcome to our site!</div>;

  const About = () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      padding: '20px',
      boxSizing: 'border-box',
      backgroundColor: 'rgba(240, 240, 240, 0.85)'  // Semi-transparent background
    }}>
      <div style={{
        maxWidth: '600px',
        background: '#fff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#333' }}>About Us</h1>
        <p style={{
          fontSize: '16px',
          color: '#666',
          lineHeight: '1.5'
        }}>
          Welcome to our website! We are dedicated to bringing you the best service.
          Our team consists of talented individuals who are passionate about providing
          innovative solutions. We believe in quality, commitment, and customer satisfaction.
        </p>
      </div>
    </div>
  );
  
  const Contact = () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      padding: '20px',
      boxSizing: 'border-box',
      backgroundColor: 'rgba(240, 240, 240, 0.85)'  // Semi-transparent background
    }}>
      <div style={{
        maxWidth: '600px',
        background: '#fff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#333' }}>Contact Us</h1>
        <p style={{
          fontSize: '16px',
          color: '#666',
          lineHeight: '1.5'
        }}>
          Have any questions? We would love to hear from you! Please contact us at:
        </p>
        <p style={{ margin: '20px 0', fontWeight: 'bold', fontSize: '18px' }}>
          Email: <a href="mailto:info@example.com" style={{ color: '#007BFF' }}>healthviz123@gmail.com</a>
        </p>
        <p style={{ fontSize: '16px' }}>
          Phone: <a href="tel:+1234567890" style={{ color: '#007BFF' }}>+91 9619294642</a>
        </p>
      </div>
    </div>
  );

  const Data = ({ username }) => {
    const [formData, setFormData] = useState({
      name: username,
      age: '',
      gender: '',
      weight: '',
      height: '',
      goal: ''
    });
  
    const [bmi, setBMI] = useState('');
    const [loading, setLoading] = useState(true);  // State to track loading process

  
    useEffect(() => {
      if (username) {
        fetch(`https://ATP429.pythonanywhere.com/get-user/${username}`)
          .then(response => {
            if (response.ok) return response.json();
            else throw new Error('User not found');
          })
          .then(data => {
            setFormData(data);
            setLoading(false)
            updateBMI(data.weight, data.height);
          })
          .catch(error => {
            console.error('Error fetching user:', error);
            setFormData({
              name: username,
              age: '',
              gender: '',
              weight: '',
              height: '',
              goal: ''
            });
            setLoading(false)
          });
      }
    }, [username]);
  
    useEffect(() => {
      updateBMI(formData.weight, formData.height);
    }, [formData.weight, formData.height]);
  
    const updateBMI = (weight, height) => {
      if (weight && height) {
        const heightInMeters = height / 100;
        const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
        setBMI(bmiValue);
      } else {
        setBMI('');
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch('https://ATP429.pythonanywhere.com/store-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        alert('Data Updated Successfully!');
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        alert('Failed to submit data');
      });
    };
  
    const handleClear = () => {
      setFormData({
        name: username,
        age: '',
        gender: '',
        weight: '',
        height: '',
        goal: ''
      });
      setBMI('');
    };
  
    return (
      loading ? <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
        backgroundColor: 'rgba(240, 240, 240, 0.85)'  // Semi-transparent background
      }}> Loading ... </div>
      :
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
        backgroundColor: 'rgba(240, 240, 240, 0.85)'  // Semi-transparent background
      }}>
        <div style={{
          maxWidth: '600px',
          background: '#fff',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          borderRadius: '10px',
          padding: '30px',
          textAlign: 'left'
        }}>
          <h1 style={{ color: '#333', marginBottom: '20px' }}>User Data Form</h1>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <label style={{ flexBasis: '45%', marginBottom: '10px' }}>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
              </label>
              <label style={{ flexBasis: '45%', marginBottom: '10px' }}>
                Age:
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
              </label>
            </div>
            <label style={{ marginBottom: '10px' }}>
              Gender:
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'white' }}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <label style={{ flexBasis: '45%', marginBottom: '10px' }}>
                Weight (kg):
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
              </label>
              <label style={{ flexBasis: '45%', marginBottom: '10px' }}>
                Height (cm):
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              BMI: {bmi || "Not available"}
            </div>
            <label style={{ marginBottom: '10px' }}>
              Goal:
              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'white' }}
              >
                <option value="">Select Goal</option>
                <option value="muscle_building">Muscle Building</option>
                <option value="fitness">Weight Loss</option>
                <option value="strength_training">Health</option>
              </select>
            </label>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="submit" style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '12px 20px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                flexBasis: '48%'
              }}>
                Update
              </button>
              <button onClick={handleClear} type="button" style={{
                backgroundColor: 'gray',
                color: 'white',
                padding: '12px 20px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                flexBasis: '48%'
              }}>
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    );
    
  };

  const PaginatedTable = ({ data, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [currentFilter, setCurrentFilter] = useState('all');
  
    const tableStyle = {
      width: '80%',
      margin: '50px auto', // More margin for better spacing
      borderCollapse: 'collapse',
      backgroundColor: 'white',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)' // Add shadow for depth
    };
  
    const thTdStyle = {
      border: '1px solid #ddd',
      padding: '10px', // Increased padding for a better look
      textAlign: 'left',
      fontSize: '16px' // Larger font size for better readability
    };

    const paginationStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '20px 0', // Spacing around pagination controls
      fontSize: '18px', // Larger font size for page numbers
      fontFamily: 'Arial, sans-serif' // More professional font family
    };

    const buttonStyle = {
      padding: '8px 16px', // Padding around text
      margin: '0 5px', // Space between buttons
      background: '#007BFF', // A nice blue
      color: 'white', // White text color
      border: 'none', // No border
      borderRadius: '5px', // Rounded corners
      cursor: 'pointer', // Cursor indicates clickable
      fontSize: '16px'
    };

    // Calculate the number of pages
    const pageCount = Math.ceil(data.length / itemsPerPage);
  
    // Get current items
    const currentData = useMemo(() => {
      const start = currentPage * itemsPerPage;
      return data.slice(start, start + itemsPerPage);
    }, [currentPage, itemsPerPage, data]);
  
    // Handle changing pages
    const nextPage = () => setCurrentPage((prev) => (prev + 1) % pageCount);
    const prevPage = () => setCurrentPage((prev) => (prev > 0 ? prev - 1 : pageCount - 1));
  
    // Handle filtering data by year or month if applicable
    const filterData = (filterType) => {
      setCurrentFilter(filterType);
      // Implement logic based on filterType to modify `data`
    };
  
    return (
      <div>
        <div style={paginationStyle}>
          <button style={buttonStyle} onClick={prevPage} disabled={currentPage === 0}>Prev</button>
          <h3 style={{
            color: 'white',
            textShadow: '2px 2px 4px black'  // White text with black border
          }}> Page {currentPage + 1} of {pageCount} </h3>
          <button style={buttonStyle} onClick={nextPage} disabled={currentPage === pageCount - 1}>Next</button>
        </div>
        <table style={tableStyle}>
          <thead>
            <tr>
              {data.length > 0 && Object.keys(data[0]).map((key) => (
                <th key={key} style={thTdStyle}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((val, idx) => (
                  <td key={idx} style={thTdStyle}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};
  
  return (
    <Router>
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

        <nav style={{
          backgroundColor: '#333',
          color: 'white',
          padding: '10px 0',
          textAlign: 'center',
          position: 'absolute',
          width: '100%',
          top: 0,
          zIndex: 2
        }}>
          <ul style={{
            listStyleType: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            justifyContent: 'center'
          }}>
            <li style={{ display: 'inline', marginRight: '20px' }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            </li>
            <li style={{ display: 'inline', marginRight: '20px' }}>
              <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</Link>
            </li>
            <li style={{ display: 'inline', marginRight: '20px' }}>
              <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</Link>
            </li>
            {isLoggedIn && (
              <li style={{ display: 'inline', marginRight: '20px' }}>
                <Link to="/data" style={{ color: 'white', textDecoration: 'none' }}>Data</Link>
              </li>
            )}
          </ul>
        </nav>


        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/data" element={<Data username={username}/>} />
          <Route path="/" element={!isLoggedIn ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh'
            }}>
              <div style={{
                textAlign: 'center',
                maxWidth: '330px',
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
            textShadow: '2px 2px 4px black'  // White text with black border
          }}>Hello, {username}</h2>
          
          <PaginatedTable data={data} itemsPerPage={5}></PaginatedTable>
            </div>
          )} />
        </Routes>

        <df-messenger
          chat-title="HealthViz-1"
          agent-id="b9f0a9b6-d000-41a8-aba7-ae8d78134912"
          language-code="en"
        ></df-messenger>
      </div>
    </Router>
  );
}


export default App;
