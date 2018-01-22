import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Error from '../error';
import firebase from 'firebase';

class GameID extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      gameid: '',
      quizid: '',
      geschiedenisid: '',

      redirect: false,

      errorStatus: false,
      errorTitle: '',
      errorSubTitle: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({gameid: e.target.value});
  }

  handleSubmit(e) {
    if(this.state.gameid !== ''){
      const rootRef = firebase.database().ref().child('gameid');
      const ref = rootRef.child(this.state.gameid);
      var self = this;
      ref.on('value', snap => {
        if(snap.val() !== null){
          if(snap.val().status === true){
            self.setState({
              quizid: snap.val().quizid,
              geschiedenisid: snap.val().id,
              redirect: true
            });
          } else {
            self.setState({
              errorStatus: true,
              errorTitle: 'Helaas is deze Game niet actief.',
              errorSubTitle: 'Controleer en probeer het opnieuw.'
            });
          }
        } else {
          self.setState({
            errorStatus: true,
            errorTitle: 'We hebben die Game PIN niet herkend.',
            errorSubTitle: 'Controleer en probeer het opnieuw.'
          });
        }
      });
    } else {
      this.setState({
        errorStatus: true,
        errorTitle: 'We hebben die Game PIN niet herkend.',
        errorSubTitle: 'Controleer en probeer het opnieuw.'
      });
    }
    e.preventDefault();
  }

  render() {
    if(this.state.redirect === true){
      return (
        <Redirect push to={{
          pathname: "/play/" + this.state.gameid,
          state: {
            quizid: this.state.quizid,
            geschiedenisid: this.state.geschiedenisid
          }
        }}/>
      );
    }

    return (
      <div className="outer play_body">
        <div className="inner">
          <Error key='mainError' status={this.state.errorStatus} title={this.state.errorTitle} subtitle={this.state.errorSubTitle}/>
          <form onSubmit={this.handleSubmit} className="ui form">
            <div className="field">
              <input type="text" name="name" placeholder="Game PIN" value={this.state.gameid} onChange={this.handleChange} className="placeholder max" />
            </div>
            <button className="ui button" type="submit">Enter</button>
          </form>
        </div>
      </div>
    );
  }

}
export default GameID;
