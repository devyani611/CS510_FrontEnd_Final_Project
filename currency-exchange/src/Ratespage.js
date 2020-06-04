import React from "react";
import { Table } from "reactstrap";
import axios from "axios";
import "./Ratespage.css";

const tableStyle = {
  color: "black",
};

const headStyle = {
  color: "purple",
  fontWeight: "bold",
};

const buttonstyle = {
  backgroundColor: "purple",
  color: "white",
  border: "1px double purple",
};

class Ratespage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromCurrency: "USD",
      currencies: [],
      currency: [],
      currencyrates: [],
      invcurrencies: [],
      cname: null,
      ccountry: null,
      csymbol: null,
      from: "USD",
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://api.exchangeratesapi.io/latest?base=${this.state.fromCurrency}`
      )
      .then((response) => {
        const currencyrates = [];
        const currencycountry = [];
        const currency = [];
        const invcurrency = [];
        
        for (const key in response.data.rates) {
          currency.push(key);
          if (key == this.state.fromCurrency) continue;
          currencycountry.push(key);
          currencyrates.push(response.data.rates[key].toFixed(5));
          axios
            .get(
              `https://api.exchangeratesapi.io/latest?base=${key}`
            )
            .then((response) => {
              if (key != this.state.fromCurrency)
                invcurrency.push(
                  response.data.rates[this.state.fromCurrency].toFixed(5)
                );
              this.setState({ invcurrencies: invcurrency });
            })
            .catch((err) => {
              console.log("oops", err);
            });
        }
        axios
          .get(
            "https://restcountries.eu/rest/v2/all?fields=currencies;name;flag;"
          )
          .then((response) => {
            var cur;
            var cname = null;
            var csymbol = null;
            var countries = [];
            var res = response.data;
            for (var e = 0; e < res.length; e++) {
              cur = res[e].currencies;
              for (var t = 0; t < cur.length; t++) {
                if (cur[t].code == this.state.fromCurrency) {
                  cname = cur[t].name;
                  csymbol = cur[t].symbol;
                  countries.push(res[e].name);
                  countries.push(", ");
                }
              }
            }
            this.setState({ cname: cname });
            this.setState({ csymbol: csymbol });
            this.setState({ ccountry: countries });
          });
        this.setState({ currencies: currencycountry });
        this.setState({ currencyrates: currencyrates });
        this.setState({ currency: currency });
      })
      .catch((err) => {
        console.log("oops", err);
      });
  }

  selectHandler = (event) => {
    if (event.target.name === "from") {
      this.setState({ fromCurrency: event.target.value });
    }
  };

  convertHandler = () => {
    axios
      .get(
        `https://api.exchangeratesapi.io/latest?base=${this.state.fromCurrency}`
      )
      .then((response) => {
        const currencyrates = [];
        const currencycountry = [];
        const invcurrency = [];
        for (const key in response.data.rates) {
          if (key == this.state.fromCurrency) continue;
          currencycountry.push(key);
          currencyrates.push(response.data.rates[key].toFixed(5));
          axios
            .get(
              `https://api.exchangeratesapi.io/latest?base=${key}`
            )
            .then((response) => {
              invcurrency.push(
                response.data.rates[this.state.fromCurrency].toFixed(5)
              );
              this.setState({ invcurrencies: invcurrency });
            })
            .catch((err) => {
              console.log("oops", err);
            });
        }
        axios
          .get(
            "https://restcountries.eu/rest/v2/all?fields=currencies;name;"
          )
          .then((response) => {
            var cur;
            var cname = null;
            var csymbol = null;
            var countries = [];
            var res = response.data;
            for (var e = 0; e < res.length; e++) {
              cur = res[e].currencies;
              for (var t = 0; t < cur.length; t++) {
                if (cur[t].code == this.state.fromCurrency) {
                  cname = cur[t].name;
                  csymbol = cur[t].symbol;
                  countries.push(res[e].name);
                  countries.push(", ");
                }
              }
            }
            this.setState({ cname: cname });
            this.setState({ csymbol: csymbol });
            this.setState({ ccountry: countries });
          });
        this.setState({ currencies: currencycountry });
        this.setState({ currencyrates: currencyrates });
        this.setState({ from: this.state.fromCurrency });
      })
      .catch((err) => {
        console.log("oops", err);
      });
  };

  render() {
    return (
      <div className="container ">
        <div className="row ">
          <div className="col-lg-12 col-xl-12">
            <h4> Rates Exchange Table </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-xl-6 ">
            <Table responsive>
              <thead>
                <tr>
                  <th style={headStyle}>{this.state.from}</th>
                  <th style={headStyle}>1.00 {this.state.from}</th>
                  <th style={headStyle}>inv. 1.00 {this.state.from}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tableStyle}>
                    {this.state.currencies.map((cur) => (
                      <tr>{cur}</tr>
                    ))}
                  </td>
                  <td style={tableStyle}>
                    {this.state.currencyrates.map((cur) => (
                      <tr>{cur}</tr>
                    ))}
                  </td>
                  <td style={tableStyle}>
                    {this.state.invcurrencies.map((cur) => (
                      <tr>{cur}</tr>
                    ))}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="col-lg-6 col-xl-6 ratepag">
            <div className="currency_row">
              <div className="col-lg-12 col-xl-12">
                <br></br>
                <center>
                  <h5><label for="from">Choose the currency</label></h5>
                  <select
                    name="from"
                    id="from"
                    onChange={(event) => this.selectHandler(event)}
                    value={this.state.fromCurrency}
                    aria-required="true"
                  >
                    {this.state.currency.map((cur) => (
                      <option key={cur}>{cur}</option>
                    ))}
                  </select>
                  <br></br>
                  <br></br>
                  
                  <button onClick={this.convertHandler} style={buttonstyle}>Go</button>
                  <br></br>
                </center>
              </div>
            </div>
            <div className="facts_row">
              <div className="col-lg-12 col-xl-12">
                <br></br>
                <center>
                  <h5>Currency Facts</h5>
                </center>
                <br></br>
                <p>
                  <b>Name :</b> {this.state.cname}
                </p>
                <p>
                  <b>Symbol :</b> {this.state.csymbol}
                </p>
                <p>
                  <b>Code :</b> {this.state.fromCurrency}
                </p>
                <p>
                  <b>Users :</b> {this.state.ccountry}
                </p>
                <br></br>
              </div>
            </div>
          </div>
        </div>
        <footer class="page-footer footer font-small">
          © 2020 All rights reserved
        </footer>
      </div>
    );
  }
}

export default Ratespage;