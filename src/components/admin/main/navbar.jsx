import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, NavLink } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'semantic-ui-react';
import firebase, { auth } from 'firebase';

class Navbar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      naam: '',
      auth: true
    }

    this.logout = this.logout.bind(this);
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

    var self = this;
    const user = firebase.auth().currentUser;
    console.log(user);
    if (user != null) {
      self.setState({
        naam: user.displayName
      });
    }
  }

  logout(){
    var self = this;
    firebase.auth().signOut().then(function() {
      self.setState({
        auth: false
      });
    }, function(error) {
    });
  }

  render() {
    if(this.state.auth == false){
      return <Redirect to='/admin' />;
    }

    const { activeItem } = this.state

    return (
      <Menu size='tiny'>
        <Menu.Item>
          <img src='http://i63.tinypic.com/2db5aon.png' />
        </Menu.Item>
        <NavLink to='/admin/dashboard' className="item" activeClassName="active">Dashboard</NavLink>
        <NavLink to='/admin/quizzen' className="item" activeClassName="active">Quizzen</NavLink>
        <NavLink to='/admin/games' className="item" activeClassName="active">Games</NavLink>

        <Menu.Menu position='right'>
          <Dropdown item text={this.state.naam}>
            <Dropdown.Menu>
              <a className="item" onClick={this.logout}>Logout</a>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }

}
export default Navbar;
