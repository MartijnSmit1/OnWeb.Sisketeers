import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Navbar from './main/navbar';

class Dashboard extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
  }

  render() {

    return (
      <div>
        <Navbar />
        <div className="ui container">
          <div className="ui equal width grid statistics">
            <div className="column">
              <div className="ui segment">
                <div className="statistic">
                  <div className="value">
                    0
                  </div>
                  <div className="label">
                    Quizzen
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="ui segment">
                <div className="statistic">
                  <div className="value">
                    0
                  </div>
                  <div className="label">
                    Spelers totaal
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="ui segment">
                <div className="statistic">
                  <div className="value">
                    0
                  </div>
                  <div className="label">
                    Actieve games
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="ui segment">
                <div className="statistic">
                  <div className="value">
                    0
                  </div>
                  <div className="label">
                    Totale antwoorden
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ui equal width grid">
            <div className="six wide column">
              <div className="ui segment">

              </div>
            </div>
            <div className="column">
              <div className="ui segment">

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
export default Dashboard;
