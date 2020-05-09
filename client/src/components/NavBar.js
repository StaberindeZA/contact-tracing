import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import { setAuth } from '../redux/actions';

const NavBar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  // Navigates to a link using useHistory hook from react-router-dom
  const handleLinkClick = (link) => {
    history.push(link);
    handleClose();
  }

  // Set isAuthenticated to false. (Might need to add more functionality here)
  const handleLogoutClick = () => {
    props.setAuth(false);
    handleClose();
  }

  let loginLogout;  
  if (props.isAuthenticated) {
    loginLogout = (
      <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
    );
  } else {
    loginLogout = (
      <MenuItem onClick={() => handleLinkClick("/login")}>Login</MenuItem>
    );
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleLinkClick("/about")}>About</MenuItem>
        {loginLogout}
      </Menu>
    </div>
  )
}

export default connect(
  (state) => state.auth,
  { setAuth }
)(NavBar);