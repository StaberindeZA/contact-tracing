import React from 'react';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { addUser, setAuth } from '../redux/actions';
import { callLogin, callUser } from '../helpers/client';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginDisplay = ( props ) => {

  const classes = useStyles();

  // If isAuthenticated is true, redirectToPage should be true.
  if (props.redirectToPage) {
    return <Redirect to="/main" />;
  }
  
  // Else return the Login page.
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={props.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={props.username}
            onChange={props.handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              {/* <Link href="#" variant="body2"> */}
                <RouterLink to="/register">
                {"Don't have an account? Sign Up"}
                </RouterLink>
              {/* </Link> */}
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
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