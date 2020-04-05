import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { browserHistory } from './utils/history';
import routes from './Routes';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={browserHistory}>
          <Switch>
            {
              routes && routes.map((route, index) => {
                return <Route exact={route.exact} name={route.name} path={route.path} component={route.component} key={index} />
              })
            }
          </Switch>
        </Router>
      </div>
    ); 
  }
}

export default App;
