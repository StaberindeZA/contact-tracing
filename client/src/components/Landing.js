import React from 'react';

import RegisterContact from './RegisterContact';
import UserData from './UserData';
import ContactInfo from './ContactInfo';

import landingStyles from '../styles/landing.module.css';

class Landing extends React.Component {


  render() {
    return (
      <div>
        <h1>The Landing</h1>
        <div className={landingStyles.container}>
          <RegisterContact className={landingStyles.section} />
          <UserData className={landingStyles.section} />
          <ContactInfo className={landingStyles.section} />
        </div>
      </div>
    );
  };
}

export default Landing;