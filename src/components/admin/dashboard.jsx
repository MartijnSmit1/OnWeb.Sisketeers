import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import firebase, { auth } from 'firebase';

class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      auth: true,
    };
  }

  componentDidMount(){
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.setState({
          auth: true
        });
      } else {
        self.setState({
          auth: false
        });
      }
    });
  }

  render() {
    if(this.state.auth == false){
      return <Redirect to='/admin' />;
    }

    return (
      <div className="outer play_body">
        <div className="inner max">
          Dashboard
        </div>
      </div>
    );
  }

}
export default Login;
