import React from 'react';

import { connect } from 'react-redux';

import userdataStyles from '../styles/userdata.module.css';

// User Data
// Show data of the currently logged in user.

const UserDataDisplay = (props) => {
  return (
    <div>
        <h2>Your Data</h2>
        <div>
          <label htmlFor="spanUser">
            Username:
            <span id="spanUser">{props.username}</span>
          </label>
        </div>
        <div className={userdataStyles.container}>
          <label htmlFor="userCovidStatus">
            Covid Positive:
          </label>
          <div className={userdataStyles.statusContainer} id="userCovidStatus">
            <div>
              <span style={{display: props.covidStatusDisplay}}>{props.covidStatus}</span>
              <button onClick={props.onShowClick}>{props.showButtonText}</button>
            </div>
            <div>
              <button>Update</button>
            </div>
          </div>
        </div>
      </div>
  )
}


class UserData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.username,
      status: this.props.status,
      covidStatusVisibility: true,
      covidStatusDisplay: "none",
      showButtonText: "Show",
    };
  }

  handleShowClick = () => {
    this.setState({
      covidStatusDisplay: this.state.covidStatusVisibility ? "inline" : "none",
      showButtonText: this.state.covidStatusVisibility ? "Hide" : "Show",
      covidStatusVisibility: !this.state.covidStatusVisibility,
    });
  }

  handleChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  
  render () {
    return (
      <UserDataDisplay 
        username={this.state.username}
        covidStatus={this.state.status}
        covidStatusDisplay={this.state.covidStatusDisplay}
        showButtonText={this.state.showButtonText}
        onShowClick={this.handleShowClick}
      />
    )
  }
}

const mapStateToProps = state => {
  const { username, status } = state.user;

  return username ? { username, status } : { username: "Default", status: "Def" };
}

export default connect(mapStateToProps)(UserData);