import React from 'react';

import RegisterContact from './RegisterContact';
import UserData from './UserData';
import ContactInfo from './ContactInfo';

import mainStyles from '../styles/main.module.css';

// Main Page
// After user logs in, this is the first page they'll see.
// Hidden behind PrivateRoute. Can't be viewed unless logged in. (store.auth.isAuthenticated)

const Main = () => (
  <div>
    <h1>Main Page</h1>
    <div className={mainStyles.container}>
      <RegisterContact className={mainStyles.section} />
      <UserData className={mainStyles.section} />
      <ContactInfo className={mainStyles.section} />
    </div>
  </div>
);

export default Main;