import logo from './logo.svg';
import './App.css';
import useScript from './hooks/useScript';
import styles from './style.css';

function App() {
  useScript('https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1');

  return (
    <div className="App">
      <div class="form-box">
      <div class="form">
                            <form class="login-form">
                                <center><h1 class="main-heading">Login Form</h1></center>
				                <input id="user" type="text"placeholder="user name"/>
				                <input id="pass" type="password" placeholder="password"/>
				                <button id = "login-button">LOGIN</button>
				                <p class="message">Not Registered? <a href="#">Register</a></p>
				            </form>
                            <form class="register-form">
                                <center><h1 class="main-heading">Register Form</h1></center>
				                <input type="text" placeholder="user name"/>
				                <input type="text" placeholder="email-id"/>
				                <input type="password" placeholder="password"/>
				                <button>REGISTER</button>
				                <p class="message">Already Registered?<a href="#">Login</a>
				                </p>
				            </form>
			             </div>
                   </div>
    <df-messenger
      chat-title="HealthViz-1"
      agent-id="b9f0a9b6-d000-41a8-aba7-ae8d78134912"
      language-code="en"
    ></df-messenger>
    </div>
  );
}

export default App;
