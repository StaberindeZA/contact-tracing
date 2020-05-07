import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { addUser, setAuth } from '../redux/actions';

import { callLogin, callUser } from '../helpers/client';

const LoginDisplay = ( props ) => {
  // If isAuthenticated is true, redirectToPage should be true.
  if (props.redirectToPage) {
    return <Redirect to="/main" />;
  }
  
  // Else return the Login page.
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label>
          Username:
          <input type="text" value={props.username} onChange={props.handleChange} />
        </label>
        <input type="submit" value="Login"/>
      </form>
      <hr />
      <Link to="/register"><button>Register</button></Link>
      <button onClick={props.authTest}>Auth Test</button>
    </div>
  )
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Test User',
      redirectToPage: false
    };
  }

  handleChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    //We want to navigate now.
    
    try {
      const loginResults = await callLogin(this.state.username);
      const { userObj, userResults } = await callUser(this.state.username);
      
      
      if (loginResults.statusCode === 200 && userResults.statusCode === 200) {
        this.props.addUser({
          ...userObj
        });

        this.props.setAuth(true);
      }
    } catch (error) {
      console.log("An error ocurred\n", error)
    }
  }

  render() {
    return (
      <LoginDisplay
        redirectToPage={this.props.isAuthenticated}
        username={this.state.username}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        authTest={this.authTest}
      />
    );
  }
}

export default connect(
  (state) => state.auth,
  { addUser, setAuth }
)(Login);
// export default Login;