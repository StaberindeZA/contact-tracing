import React from 'react';

// Register page
// Used to register a new user to the application.

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }

  handleChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handleSubmit(event) {
    //We want to navigate now.
    console.log("Register triggered");
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" value={this.state.username} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Register"/>
        </form>
      </div>
    )
  }
}

export default Register;