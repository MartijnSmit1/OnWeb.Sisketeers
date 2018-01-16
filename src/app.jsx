import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './components/main/master';
import Admin from './components/admin/master';

class App extends React.Component {

    render() {
        return (
            <div className="app">
              <Router>
                <div>
                  <Route path="/play" component={Main} />
                  <Route path="/admin" component={Admin} />
                </div>
              </Router>
            </div>
        );
    }

}
export default App;
