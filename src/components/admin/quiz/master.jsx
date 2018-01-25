import React, {Component} from 'react';
import Navbar from '../main/navbar';
import { BrowserRouter as Router, Route, Link, Redirect, NavLink } from 'react-router-dom';
import firebase from 'firebase';
import { Tab, Table, Label, Icon, Menu, Modal, Dimmer, Loader, Input, Button } from 'semantic-ui-react';
import Error from '../error';
import Succes from '../succes';

class Quiz extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id: '',
      quiz: [],
      titel: '',
      beschrijving: '',
      vragen: [],

      errorStatusInformatie: false,
      errorTitleInformatie: '',
      errorSubTitleInformatie: '',

      succesStatus: true,
      succesTitle: '',
      succesSubTitle: '',

      vragenModalOpen: false
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
    if(this.state.titel == ''){
      this.setState({
        errorStatusInformatie: true,
        errorTitleInformatie: 'Titel mag niet leeg zijn.',
        errorSubTitleInformatie: 'Controleer en probeer het opnieuw.'
      });
    } else {
      const Data = {
        titel: this.state.titel,
        beschrijving: this.state.beschrijving
      }
      firebase.database().ref().child('quizzen').child(this.state.id).update(Data);
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
        beschrijving: snap.val().beschrijving,
        vragen: snap.val().vragen
      });
    });
  }

  vragenModalClose = () => {
      this.setState({vragenModalOpen: false});
  }

  handleTableClick = (item) => {
      console.log("TABLE CLICKED!");
      this.setState({vragenModalOpen: true});
  }

  renderVragen = (item, i) => {
      return(
        <Table.Row key={i} onClick={() => {this.handleTableClick(item)}}>
          <Table.Cell>{item.vraag}</Table.Cell>
          <Table.Cell>{item.type}</Table.Cell>
          <Table.Cell>{item.score}</Table.Cell>
          <Table.Cell>{item.time}</Table.Cell>
        </Table.Row>
      );
  }

  render() {
      if(this.state.vragen == undefined) {
          this.state.vragen = [];
      }
    const panes = [
      { menuItem: 'Vragen', render: () => <Tab.Pane attached={false}>
          <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Vraag</Table.HeaderCell>
                  <Table.HeaderCell>Type</Table.HeaderCell>
                  <Table.HeaderCell>Score</Table.HeaderCell>
                  <Table.HeaderCell>Tijd</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.state.vragen.map(this.renderVragen)}
              </Table.Body>
          </Table>
      </Tab.Pane> },
      { menuItem: 'Informatie', render: () => <Tab.Pane attached={false}>
        <form onSubmit={this.handleSubmit} className="ui form">
          <Error key='mainError' status={this.state.errorStatusInformatie} title={this.state.errorTitleInformatie} subtitle={this.state.errorSubTitleInformatie}/>
          <Succes key='mainSucces' status={this.state.succesStatus} title={this.state.succesTitle} subtitle={this.state.succesSubTitle}/>
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
        <Modal
          size='small'
          closeIcon
          open={this.state.vragenModalOpen}
          onClose={this.vragenModalClose}
        >
            <Dimmer active={false} inverted>
                <Loader inverted>Loading</Loader>
            </Dimmer>
          <Modal.Header>Quiz aanmaken</Modal.Header>
          <Modal.Content>
            <Modal.Description>
                <p>Title: <p><Input
                    placeholder='Title'
                /></p></p>
                <p>Description: <p><Input
                    placeholder='Description'
                /></p></p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button negative icon='remove' labelPosition='right' content='Annuleren' onClick={this.vragenModalClose}/>
            <Button positive icon='checkmark' labelPosition='right' content='Aanmaken' onClick={() => {this.setState({vragenModalOpen: true})}} />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

}
export default Quiz;
