import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navigation from "./Navigation";
import Ratespage from "./Ratespage";
import Historic from "./Historic";
import Rates from "./components/Rates";
import LineChart from "./components/LineChart";
import BarGraph from "./components/BarGraph";
import OpenChart from "./components/OpenChart";
import "./Converter.css";

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Ratespage" component={Ratespage} />
        <Route path="/Historic" component={Historic} />
      </Switch>
    </Router>
  );
}

const footerstyle = {
  backgroundColor: "orange",
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      fromCurrency: "USD",
      toCurrency: "GBP",
      amount: 1,
      currencies: [],
      crate: 1,
      cinvrate: 1,
      from: "USD",
      to: "GBP",
    };
  }

  componentDidMount() {
    axios
      .get("https://api.exchangeratesapi.io/latest")
      .then((response) => {
        var amt = 1;
        var rate;
        var invrate;
        const currencyAr = ["EUR"];
        for (const key in response.data.rates) {
          currencyAr.push(key);
        }
        axios
          .get(
            `https://api.exchangeratesapi.io/latest?base=${this.state.fromCurrency}`
          )
          .then((response) => {
            amt = response.data.rates[this.state.toCurrency].toFixed(5);
            rate = response.data.rates[this.state.toCurrency].toFixed(5);
            axios
              .get(
                `https://api.exchangeratesapi.io/latest?base=${this.state.toCurrency}&symbols=${this.state.fromCurrency}`
              )
              .then((response) => {
                invrate = response.data.rates[this.state.fromCurrency].toFixed(
                  5
                );
                this.setState({ cinvrate: invrate });
              });
            this.setState({ result: amt });
            this.setState({ crate: rate });
          });
        this.setState({ currencies: currencyAr });
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
          var rate;
          var invrate;
          rate = response.data.rates[this.state.toCurrency].toFixed(5);
          axios
            .get(
              `https://api.exchangeratesapi.io/latest?base=${this.state.toCurrency}&symbols=${this.state.fromCurrency}`
            )
            .then((response) => {
              invrate = response.data.rates[this.state.fromCurrency].toFixed(5);
              this.setState({ cinvrate: invrate });
            });
          this.setState({ crate: rate });
          this.setState({ from: this.state.fromCurrency });
          this.setState({ to: this.state.toCurrency });
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
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-xl-4">
            <div id="Converter">
              <h4>
                Currency Converter
                <span role="img" aria-label="money">
                  &#x1f4b5;
                </span>
              </h4>
              <div>
                <label for="amount">Amount </label>
                <br></br>
                <input
                  style={{ width: "200px" }}
                  name="amount"
                  id="amount"
                  type="text"
                  value={this.state.amount}
                  onChange={(event) =>
                    this.setState({ amount: event.target.value })
                  }
                />
                <br></br>
              </div>
              <div>
                <br></br>
                <select
                  style={{ width: "200px" }}
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
                <div role="img" aria-label="down-arrow">
                  {" "}
                  &#x21d3;{" "}
                </div>
                <select
                  style={{ width: "200px" }}
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
              <button onClick={this.convertHandler} id="convertbutton">
                Convert
              </button>
            </div>
          </div>
          <div className="col-lg-3 col-xl-3">
            <div id="conversion_results">
              <h4>Calculation Results</h4>
              <br></br>
              <center>
                <div id="result">
                  <span>{this.state.amount} </span>
                  <span>{this.state.from} = </span>
                  <span>{<h3>{this.state.result}</h3>}</span>
                  <span>{this.state.to} </span>
                </div>
                <br></br>
                <br></br>
                <span> 1 {this.state.from} = </span>
                <span> {this.state.crate} </span>
                <span> {this.state.to} </span>
                <br></br>
                <span> 1 {this.state.to} = </span>
                <span> {this.state.cinvrate} </span>
                <span> {this.state.from} </span>
              </center>
            </div>
          </div>
          <div className="col-lg-5 col-xl-5">
            <LineChart
              currencyfrom={this.state.fromCurrency}
              currencyto={this.state.toCurrency}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-xl-4">
            <Rates currencyfrom={this.state.fromCurrency} />
            <br></br>
          </div>
          <div className="col-lg-4 col-xl-4">
            <OpenChart
              currencyfrom={this.state.fromCurrency}
              currencyto={this.state.toCurrency}
            />
          </div>
          <div className="col-lg-4 col-xl-4">
            <BarGraph
              currencyfrom={this.state.fromCurrency}
              currencyto={this.state.toCurrency}
            />
            <br></br>
          </div>
        </div>
        <footer class="page-footer footer font-small">
          © 2020 All rights reserved
        </footer>
      </div>
    );
  }
}

export default App;
