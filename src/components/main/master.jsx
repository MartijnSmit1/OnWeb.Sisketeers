import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GameID from './screen/gameid';
import Nickname from './screen/nickname';
import Game from './screen/game';

class Master extends React.Component {

  constructor(props) {
    super(props);
    this.hideDeveloper_area = this.hideDeveloper_area.bind(this);
    this.showDeveloper_area = this.showDeveloper_area.bind(this);

    this.state = {
      show: 'block',
      close: 'none',
      gameid: ''
    }
  }

  hideDeveloper_area(){
    this.setState({
      show: 'none',
      close: 'block'
    });
  }

  showDeveloper_area(){
    this.setState({
      show: 'block',
      close: 'none'
    });
  }



  render() {

    return (
      <div className="container">
        <Router>
          <div>
            <Route path="/play" component={GameID} />
            <Route path="/play/:id" component={Nickname} />
            <Route path="/play/:id/join" component={Game} />
          </div>
        </Router>
      </div>
    );
  }

}
export default Master;
