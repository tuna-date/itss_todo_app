import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { browserHistory } from './utils/history';
import routes from './Routes';
import './App.scss';
import Login from './components/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  autoClose: 2000,
  draggable: false,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    }
  }

  requireAuth(nextState, replace, next) {
    console.log('outer');
    if (!this.state.authenticated) {
      console.log('helo');
      replace({
        pathname: "/login",
        state: { nextPathname: nextState.location.pathname }
      })
    }
    next();
  }


  render() {
    return (
      <div className="App">
        <Router history={browserHistory}>
          <Switch>
            {
              routes && routes.map((route, index) => {
                return <Route exact={route.exact} name={route.name} path={route.path} component={route.component}
                  key={index}/>
              })
            }
          </Switch>
          {/* <Redirect from="/" to="/login"/> */}
        </Router>

        <ToastContainer autoClose={2000}/>
      </div>
    );
  }
}

export default App;
