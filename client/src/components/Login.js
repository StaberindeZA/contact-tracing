import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { addUser } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      toLanding: false
    };
  }

  handleChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handleSubmit = (event) => {
    //We want to navigate now.
    console.log("Submit triggered");
    this.props.addUser({
      userId: 987,
      username: "PeterLogin",
      status: "Postive"
    });
    this.setState({ toLanding: true });
    event.preventDefault();
  }

  render() {
    if (this.state.toLanding === true) {
      return <Redirect to="/landing" />;
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" value={this.state.username} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Login"/>
        </form>
        <hr />
        <Link to="/register"><button>Register</button></Link>
      </div>
    )
  }
}

export default connect(
  null,
  { addUser }
)(Login);
// export default Login;