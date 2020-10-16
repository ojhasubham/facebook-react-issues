import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/home";
import Issues from "./components/issues";
import Issue from "./components/issue";
import "./App.css";

function App() {
  return (
    <div className="App container">
      <Router>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/issues" component={Issues} />
          <Route path="/issue/:number" component={Issue} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
