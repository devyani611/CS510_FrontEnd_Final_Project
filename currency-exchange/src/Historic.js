import React from "react";
import { Table } from "reactstrap";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Historic.css";

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

class Historic extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      fromCurrency: "USD",
      currencies: [],
      currency: [],
      currencyrates: [],
      invcurrencies: [],
      date: new Date(),
      from: "USD",
    };
  }

  onChange = (date) => this.setState({ date });

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
    var d = this.state.date.toString().split(" ");
    var month_num;
    var month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    for (var i = 0; i < 12; i++) {
      if (d[1] == month[i]) {
        month_num = i + 1;
      }
    }
    
    var Cdate = d[3] + "-" + month_num + "-" + d[2];
    axios
      .get(
        `https://api.exchangeratesapi.io/${Cdate}?base=${this.state.fromCurrency}`
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
              `https://api.exchangeratesapi.io/${Cdate}?base=${key}`
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
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-xl-12">
            <h4> Historic Lookup Table </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-xl-6">
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
          <div className="col-lg-6 col-xl-6 histo">
            <div className="historic_row">
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
                  <h5>Choose the date</h5>
                  <Calendar
                    weekNumbers={true}
                    onChange={this.onChange}
                    value={this.state.date}
                    maxDate={new Date()}
                  />
                  <br></br>
                  <br></br>
                  <button onClick={this.convertHandler} style={buttonstyle}>Go</button>
                  <br></br>
                </center>
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

export default Historic;