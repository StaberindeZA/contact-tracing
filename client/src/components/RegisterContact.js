import React from 'react';

// Register Contact
// For a logged in user, register a person they've been in contact with.

const RegisterContactDisplay = (props) => {
  return (
    <div>
        <h2>Register Contact</h2>
        <form onSubmit={props.onSubmit}>
          <label>
            Username:
            <input type="text" value={props.username} onChange={props.onChange} />
          </label>
          <input type="submit" value="Register"/>
        </form>
      </div>
  )
}


class RegisterContact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "Peter"
    };
  }

  handleChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handleSubmit(event) {
    //We want to navigate now.
    console.log("Register Contact triggered");
    event.preventDefault();
  }
  
  render () {
    return (
      <RegisterContactDisplay 
        username={this.state.username}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit} 
      />
    )
  }
}

export default RegisterContact;