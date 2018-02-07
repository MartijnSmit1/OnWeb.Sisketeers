import React from 'react';
import Navbar from '../main/navbar';
// import { BrowserRouter as Router, Route, Link, Redirect, NavLink } from 'react-router-dom';
import firebase from 'firebase';
// import Quiztable from './../quiztable';

class Games extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      quizzen: []
    }

    this.renderQuizzen = this.renderQuizzen.bind(this);
  }

  componentDidMount(){
    console.log("COMPONENT GAMES MOUNTED!");
    var self = this;
    const rootRef = firebase.database().ref().child('quizzen');
    rootRef.on('value', snap => {
      self.setState({
        quizzen: snap.val()
      });
    });
  }

  renderQuizzen(currentQuiz, i){
      if (currentQuiz.vragen == undefined) {
          currentQuiz.vragen = {length: 0};
      }
      console.log(currentQuiz);
       // return (
       //     <Quiztable
       //         key={i}
       //         quiz={currentQuiz}
       //         aantal={currentQuiz.vragen.length}
       //     />
       // );
       return(<div>Gewoon een test</div>);
   }

  render() {

    return (
      <div>
        <Navbar />
        <div className="ui container">
          <div className="ui equal four column grid">
            test
          </div>
        </div>
      </div>
    );
  }

}
export default Games;
