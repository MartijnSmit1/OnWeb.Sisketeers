import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/main/master';
import Admin from './components/admin/master';
import * as f from './functions';

class App extends React.Component {

    render() {
        var q =  {
            "keuzes" : [ {
                "goed" : true,
                "text" : "A"
            }, {
                "goed" : false,
                "text" : "B"
            }, {
                "goed" : false,
                "text" : "C"
            }, {
                "goed" : false,
                "text" : "D"
            } ],
            "score" : 10,
            "time" : 60,
            "type" : "meerkeuze",
            "vraag" : "De vraag?"
        }


        console.log(f.test());
        // f.createQuiz("Naam", "Beschrijving");
        f.updateQuizQuestions(0, q);
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
