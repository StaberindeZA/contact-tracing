import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';
import About from './components/About';
import Main from './components/Main';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/landing" component={Landing} />
            <PrivateRoute path="/main" component={Main} />
            <PrivateRoute path="/" component={Main} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
