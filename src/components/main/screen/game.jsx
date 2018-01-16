import React, {Component} from 'react';


class Game extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log(this.props.match.params.id);
    console.log(this.props.location.state.userid);
  }

  render() {
    return (
      <div>
      </div>
    );
  }

}
export default Game;
