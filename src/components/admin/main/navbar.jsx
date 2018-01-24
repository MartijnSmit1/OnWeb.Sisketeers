import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, NavLink } from 'react-router-dom';
import { Button, Dropdown, Menu, Modal, Input } from 'semantic-ui-react';
import firebase, { auth } from 'firebase';
import * as f from '../../../functions';

class Navbar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      naam: '',
      auth: true,
      quizModalOpen: false,
      descriptionValQuiz: '',
      titleValQuiz: ''
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

  openQuizModal = () => this.setState({ quizModalOpen: true });
  closeQuizModal = () => this.setState({ quizModalOpen: false });

  handleCreateQuiz = () => {
      f.createQuiz(this.state.titleValQuiz, this.state.descriptionValQuiz, (id) => {
          // return(<Redirect to={'/admin/quizzen/'+id} />);
      });
  }

  render() {
    if(this.state.auth == false){
      return <Redirect to='/admin' />;
    }

    const { activeItem } = this.state

    return (
      <div>
        <Menu size='tiny'>
          <Menu.Item>
            <img src='http://i63.tinypic.com/2db5aon.png' />
          </Menu.Item>
          <NavLink to='/admin/dashboard' className="item" activeClassName="active">Dashboard</NavLink>
          <NavLink to='/admin/quizzen' className="item" activeClassName="active">Quizzen</NavLink>
          {/* <NavLink to='/admin/games' className="item" activeClassName="active">Games</NavLink> */}

          <Menu.Menu position='right'>
            <Menu.Item>
              <Button primary>Quiz starten</Button>
            </Menu.Item>
            <Menu.Item>
              <Button positive onClick={this.openQuizModal}>Quiz aanmaken</Button>
            </Menu.Item>
            <Dropdown item text={this.state.naam}>
              <Dropdown.Menu>
                <a className="item" onClick={this.logout}>Logout</a>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>

        <br />

        <Modal
          size='small'
          closeIcon
          open={this.state.quizModalOpen}
          onClose={this.closeQuizModal}
        >
          <Modal.Header>Quiz aanmaken</Modal.Header>
          <Modal.Content>
<<<<<<< HEAD
            <form className="ui form">
              <div className="field">
                <label>Titel: </label>
                <input type="text" value={this.state.titel} onChange={this.handleTitelChange}/>
              </div>
              <div className="field">
                <label>Beschrijving: </label>
                <input type="text" value={this.state.beschrijving} onChange={this.handleBeschrijvingChange}/>
              </div>
            </form>
=======
            <Modal.Description>
                <p>Title: <p><Input
                    onChange={e => {this.setState({titleValQuiz: e.target.value})}}
                    placeholder='Title'
                /></p></p>
                <p>Description: <p><Input
                    onChange={e => {this.setState({descriptionValQuiz: e.target.value})}}
                    placeholder='Description'
                /></p></p>
            </Modal.Description>
>>>>>>> eadd8a57a621fd30536a781c0dcfec772a81866a
          </Modal.Content>
          <Modal.Actions>
            <Button negative icon='remove' labelPosition='right' content='Annuleren' onClick={this.closeQuizModal}/>
            <Button positive icon='checkmark' labelPosition='right' content='Aanmaken' onClick={this.handleCreateQuiz} />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

}
export default Navbar;
