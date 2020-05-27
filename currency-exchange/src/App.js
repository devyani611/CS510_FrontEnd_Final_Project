import { Fragment } from "react";
import React, { Component, useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Rates from "./components/Rates";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Ratespage from "./Ratespage";
import Navigation from "./Navigation";
import Historic from "./Historic";
import LineChart from "./components/LineChart";

function App() {
  return (
    <div className="row">
      <Router>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <Navigation />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Ratespage" component={Ratespage} />
            <Route path="/Historic" component={Historic} />
          </Switch>
        </div>
      </Router>
      
    </div>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      fromCurrency: "INR",
      toCurrency: "GBP",
      amount: 1,
      currencies: [],
      rate_data: [],
    };
  }
  componentDidMount() {

    axios
      .get("https://api.exchangeratesapi.io/latest")
      .then((response) => {
        const currencyAr = ["EUR"];
        var amt=1;
        for (const key in response.data.rates) {
          currencyAr.push(key);
        }
        axios
        	.get(`https://api.exchangeratesapi.io/latest?base=${this.state.fromCurrency}`)
        	.then((response)=>{
        		amt=response.data.rates[this.state.toCurrency].toFixed(5);
        		this.setState({result:amt});
        	})
        this.setState({ currencies: currencyAr});
      })
      .catch((err) => {
        console.log("oops", err);
      });
  }

  convertHandler = () => {
    if (this.state.fromCurrency !== this.state.toCurrency) {
      axios
        .get(
          `https://api.exchangeratesapi.io/latest?base=${this.state.fromCurrency}&symbols=${this.state.toCurrency}`
        )
        .then((response) => {
          const result =
            this.state.amount * response.data.rates[this.state.toCurrency];
          this.setState({ result: result.toFixed(5) });
        })
        .catch((error) => {
          console.log("Oops", error.message);
        });
    } else {
      this.setState({ result: "You cant convert the same currency!" });
    }
  };
  selectHandler = (event) => {
    if (event.target.name === "from") {
      this.setState({ fromCurrency: event.target.value });
    } else {
      if (event.target.name === "to") {
        this.setState({ toCurrency: event.target.value });
      }
    }
  };

  render() {
    return (
        <div className="app-container container">
               <div className="row">
                <div className="col-lg-6 col-xl-6">
                  <div className="Converter">
                    <h4>
                      <span>Currency</span>Converter
                      <span role="img" aria-label="money">
                        &#x1f4b5;
                      </span>
                    </h4>
                    <div className="From">
                      <div>
                        <label>Amount </label>
                        <br></br>
                        <input style={{ width: "200px" }}
                          name="amount"
                          type="text"
                          value={this.state.amount}
                          onChange={(event) =>
                            this.setState({ amount: event.target.value })
                          }
                        />
                        <br></br>
                      
                      </div>
                      <div>
                        <label>From </label>
                        <br></br>
                        <select style={{ width: "200px" }}
                          name="from"
                          onChange={(event) => this.selectHandler(event)}
                          value={this.state.fromCurrency}
                        >
                          {this.state.currencies.map((cur) => (
                            <option key={cur}>{cur}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                   
                        <label>To </label>
                        <br></br>
                        <select style={{ width: "200px" }}
                          name="to"
                          onChange={(event) => this.selectHandler(event)}
                          value={this.state.toCurrency}
                        >
                          {this.state.currencies.map((cur) => (
                            <option key={cur}>{cur}</option>
                          ))}
                        </select>
                        <br></br>
                      </div>
                    
                      <button onClick={this.convertHandler}>Convert</button>
                    </div>
                 </div>
                </div>
                <div className="col-lg-6 col-xl-6">
              <h4>Line chart</h4>
              <LineChart />
        
            </div>
               
              </div>
              <div className="row">
              <div className="col-lg-4 col-xl-4">
                  <h4>Calculation results</h4>
                  <br></br>
                  <div>
                    <span>{this.state.amount} </span>
                    <span>{this.state.fromCurrency} = </span>
                    <span>{<h3>{this.state.result}</h3>}</span>
                    <span>{this.state.toCurrency} </span>
                  </div>
                </div>
            <div className="col-lg-4 col-xl-4"> 
              <h4>Rates Table</h4>
              <Rates currencyfrom={this.state.fromCurrency}/>
              <br></br>
            </div>
            <div className="col-lg-4 col-xl-4">
              <h4>Monthly Average</h4>
              <br></br>
            </div>
          </div>
           
          </div>
     
  
        
    );
  }
}

export default App;
