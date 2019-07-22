import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import '../style/App.css';
import Splash from './Splash';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Profile from './Profile';
import AuthRoute from './AuthRoute';
import TokenManager from '../utils/token-manager';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      user: TokenManager.isTokenValid() ? TokenManager.getTokenPayload() : null,
    });
  }

  onLogin = () => {
    this.setState({
      user: TokenManager.getTokenPayload(),
    });
  };

  handleLogout = () => {
    TokenManager.removeToken();
    this.setState({
      user: null,
    });
  };

  isLoggedIn = () => {
    return Boolean(this.state.user) && TokenManager.isTokenValid();
  };

  render() {
    return (
      <Fragment>
        <Switch>
          <Route
            exact
            path="/"
            render={Splash}
          />
          <Route
            exact
            path="/login"
            render={(props) => (this.state.user ? <Redirect to="/home" /> : <Login {...props} handleInputChange={this.handleInputChange} onLogin={this.onLogin} />)}
          />
          />
          <Route
            exact
            path="/register"
            component={Register}
          />
          <AuthRoute
            exact
            path="/home"
            handleLogout={this.handleLogout}
            user={this.state.user}
            component={Home}
            authenticate={this.isLoggedIn}
          />
          <AuthRoute
            exact
            path="/profile"
            component={Profile}
            authenticate={this.isLoggedIn}
            // render={(props) => <Profile {...props} name={this.state.name} id={this.state.id} />}
          />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
