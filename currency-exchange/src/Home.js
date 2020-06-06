import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Rates from "./components/Rates";
import LineChart from "./components/LineChart";
import BarGraph from "./components/BarGraph";
import OpenChart from "./components/OpenChart";
import "./Converter.css";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      fromCurrency: "USD",
      toCurrency: "GBP",
      amount: 1,
      currencies: [],
      from: "USD",
      to: "GBP",
      currency_names: [],
    };
  }
 
  componentDidMount() {
    axios
      .get("https://api.exchangeratesapi.io/latest")
      .then((response) => {
        var amt = 1;
        const currencyAr = ["EUR"];
        var rate;
        var invrate;
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
                invrate = response.data.rates[this.state.fromCurrency].toFixed(5);
                this.setState({ cinvrate: invrate });
              });
            this.setState({ result: amt });
            this.setState({ crate: rate });
          });
        this.setState({ currencies: currencyAr });
      })
      axios
      .get('https://financialmodelingprep.com/api/v3/quotes/forex?apikey=992f0505ea9b957539c47ce38e501c6a')
      .then((response) => { 
        var names =[];
        for (var i=0;i<10;i++){
                names.push(response.data[i]);
        }
        this.setState({ currency_names: names });
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
      <div className="container" role="main">
        <div className="row marqueeEffect">   
       <p>{this.state.currency_names.map((cur) => (
                      <span style={{ marginLeft: '8px' }}>{cur.name}:{cur.changesPercentage}</span>    
                    ))}</p>
        </div>    
        <div className="row">
          <div className="col-lg-4 col-xl-4">
            <div id="Converter">
              <div id="heading">
                Currency Converter
                <span role="img" aria-label="money">
                  &#x1f4b5;
                </span>
              </div>
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
                  aria-label="From Currency"
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
                  aria-label="To Currency"
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
              <div id="heading2">Calculation Results</div>
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
        <footer class="page-footer footer font-small" role="contentinfo">
          © 2020 All rights reserved
        </footer>
      </div>
      
    );
  }
}

export default Home;
