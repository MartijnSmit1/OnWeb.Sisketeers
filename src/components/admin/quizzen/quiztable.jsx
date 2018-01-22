import React, {Component} from 'react';
import Navbar from '../main/navbar';
import { BrowserRouter as Router, Route, Link, Redirect, NavLink } from 'react-router-dom';

class Quiztable extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
  }

  render() {

    return (
      <div className="column">
        <div className="ui segment">
          <NavLink
            to={{ pathname: "/admin/quizzen/" + this.props.id }}
          >
            <table>
              <thead>
                <tr>
                  <th colSpan="2"><h2>{this.props.titel}</h2></th>
                </tr>
                <tr>
                  <td colSpan="2">{this.props.beschrijving}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="2">&nbsp;</td>
                </tr>
                <tr>
                  <th>Quiz ID: </th>
                  <td>{this.props.id}</td>
                </tr>
                <tr>
                  <th>Aantal vragen: </th>
                  <td>{this.props.aantal}</td>
                </tr>
              </tbody>
            </table>
          </NavLink>
        </div>
      </div>
    );
  }

}
export default Quiztable;