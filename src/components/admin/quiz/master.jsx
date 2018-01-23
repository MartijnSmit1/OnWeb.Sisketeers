import React, {Component} from 'react';
import Navbar from '../main/navbar';
import { BrowserRouter as Router, Route, Link, Redirect, NavLink } from 'react-router-dom';
import firebase from 'firebase';
import { Tab } from 'semantic-ui-react';
import Error from '../error';

class Quiz extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id: '',
      quiz: [],
      titel: '',
      beschrijving: '',

      errorStatusInformatie: false,
      errorTitleInformatie: '',
      errorSubTitleInformatie: ''
    }

    this.handleTitelChange = this.handleTitelChange.bind(this);
    this.handleBeschrijvingChange = this.handleBeschrijvingChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitelChange(e){
    this.setState({titel: e.target.value});
  }

  handleBeschrijvingChange(e){
    this.setState({beschrijving: e.target.value});
  }

  handleSubmit(e){
    if(this.state.titel != ''){
      
    } else {
      this.setState({
        errorStatusInformatie: true,
        errorTitleInformatie: 'Titel mag niet leeg zijn.',
        errorSubTitleInformatie: 'Controleer en probeer het opnieuw.'
      });
    }
    e.preventDefault();
  }

  componentDidMount(){
    this.setState({
      id: this.props.match.params.id
    });
    var self = this;
    const rootRef = firebase.database().ref().child('quizzen');
    const ref = rootRef.child(this.props.match.params.id);
    ref.on('value', snap => {
      self.setState({
        quiz: snap.val(),
        titel: snap.val().titel,
        beschrijving: snap.val().beschrijving
      });
    });
  }

  render() {

    const panes = [
      { menuItem: 'Vragen', render: () => <Tab.Pane attached={false}>

      </Tab.Pane> },
      { menuItem: 'Informatie', render: () => <Tab.Pane attached={false}>
        <form onSubmit={this.handleSubmit} className="ui form">
          <Error key='mainError' status={this.state.errorStatusInformatie} title={this.state.errorTitleInformatie} subtitle={this.state.errorSubTitleInformatie}/>
          <h4 className="ui dividing header">Algemene informatie</h4>
          <div className="field">
            <label>Titel: </label>
            <input type="text" value={this.state.titel} onChange={this.handleTitelChange}/>
          </div>
          <div className="field">
            <label>Beschrijving: </label>
            <input type="text" value={this.state.beschrijving} onChange={this.handleBeschrijvingChange}/>
          </div>
          <button className="ui submit positive button" type="submit">Opslaan</button>
        </form>
      </Tab.Pane> }
    ]

    return (
      <div>
        <Navbar />
        <div className="ui container">
          <h2 className="ui header">
            {this.state.quiz.titel}
            <div className="sub header">{this.state.quiz.beschrijving}</div>
          </h2>
          {/* <div className="ui segment">
            <div class="ui form">
              <h4 class="ui dividing header">Quiz informatie</h4>
              <div class="field">
                <label>Titel: </label>
                <input type="text" />
              </div>
              <div class="field">
                <label>Beschrijving: </label>
                <textarea rows="1"></textarea>
              </div>
            </div>
          </div> */}

          <Tab menu={{ pointing: true }} panes={panes} />

        </div>
      </div>
    );
  }

}
export default Quiz;
