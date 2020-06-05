import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navigation from "./Navigation";
import Ratespage from "./Ratespage";
import Historic from "./Historic";
import "./Converter.css";
import Home from "./Home";
import { render } from "@testing-library/react";

class App extends Component {
  
  render(){
  return (
    <div>
   
      <Navigation />
        <Route path="/" exact component={Home} />
        <Route path="/Ratespage" component={Ratespage} />
        <Route path="/Historic" component={Historic} />
    </div>
  );
}
}

export default App;
