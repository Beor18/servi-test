import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./containers/Home";
import Forecast from "./containers/Forecast";

function App() {
  return (
    <Router>
        <Route exact path="/forecast" component={Forecast} />
        <Route exact path="/" component={Home} />
    </Router>
  );
}

export default App;
