import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/user-form-page.scss';
import WelcomeHeader from './WelcomeHeader';
import TokenManager from '../utils/token-manager';
import axios from 'axios';

const style = {
  color: 'red',
  paddingTop: '15px',
  fontWeight: 'bold',
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleLogin = (e) => {
    e.preventDefault();
    axios.post('https://m-bagger.herokuapp.com/login', {
      email: this.state.email,
      password: this.state.password,
    })
      .then((response) => {
        TokenManager.setToken(response.data.token);
        this.props.onLogin();
        this.props.history.push('/home');
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.message });
      });
  };

  render() {
    const { email, password, errorMessage } = this.state;
    return (
      <div className="user-form">
        <WelcomeHeader />
        <form onSubmit={this.handleLogin}>
          <h2>Sign in</h2>
          <label>
            <span>
              Email
            </span>
            <input type="email" name="email" value={email} onChange={this.handleInputChange} required />
          </label>
          <label>
            <span>
              Password
            </span>
            <input type="password" name="password" value={password} onChange={this.handleInputChange} required />
          </label>
          <button value="Submit" className="action">
            Sign in
          </button>
          {
            errorMessage &&
            <div className="error" style={style}><span>{errorMessage}</span></div>
          }
          <p>
            Don't have an account?&nbsp;
            <span className="underlined-link">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </form>
      </div>
    );
  }
}


export default Login;
