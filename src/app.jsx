import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/main/master';
import Admin from './components/admin/master';
import * as f from './functions';

class App extends React.Component {

    render() {
        return (
            <div className="app">
              <Router>
                <Switch>
                  <Route path="/play" component={Main} />
                  <Route path="/admin" component={Admin} />
                </Switch>
              </Router>
            </div>
        );
    }

}
export default App;
