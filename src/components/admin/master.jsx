import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase, { auth } from 'firebase';
import Login from './login';
import Dashboard from './dashboard';

class Master extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Route path="/admin" component={Login} />
            <Route path="/admin/dashboard" component={Dashboard} />
          </div>
        </Router>
      </div>
    );
  }

}
export default Master;
