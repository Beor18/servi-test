import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./containers/Home";
import Forecast from "./containers/Forecast";
import Daily from "./containers/Daily";

function App() {
  return (
    <Router>
      <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/forecast/:id" component={Daily} />
        <Route exact path="/forecast" component={Forecast} />
      
    </Router>
  );
}

export default App;
