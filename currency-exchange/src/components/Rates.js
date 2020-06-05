import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import "./Rates.css";

const tableStyle = {
  color: "black",
};

const Rates = (props) => {
  const [currencies, setcurrencies] = useState([]);
  const [currencyrates, setcurrencyrates] = useState([]);

  useEffect(() => {

    const getrates = (prop) => {
      const top10 = [
        "CAD",
        "GBP",
        "INR",
        "CHF",
        "EUR",
        "MYR",
        "CNY",
        "USD",
        "SGD",
        "AUD",
      ];
      
      axios
        .get(`https://api.exchangeratesapi.io/latest?base=${props.currencyfrom}`)
        .then((response) => {
          const currencyrates = [];
          const currencycountry = [];
          for (const key in response.data.rates) {
            for (var i = 0; i <= 10; i++) {
              if (top10[i] === key) {
                currencycountry.push(key);
                currencyrates.push(response.data.rates[key].toFixed(5));
              }
            }
          }
          setcurrencies(currencycountry);
          setcurrencyrates(currencyrates);
        })
        .catch((err) => {
          console.log("oops", err);
        });
    };

    getrates();
  }, [props.currencyfrom]);


  return (
    <div id="rates_container">
      <div id="heading6">Rates Table</div>
      <center>
        <br></br>
        <div id="heading7">Top 10 currencies</div>
      </center>
      <Table responsive>
        <center>
          <thead>
            <tr>
              <th style={tableStyle}>{props.currencyfrom}</th>
              <th style={tableStyle}>1.00 {props.currencyfrom}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tableStyle}>
                {currencies.map((cur) => (
                  <tr>{cur}</tr>
                ))}
              </td>
              <td style={tableStyle}>
                {currencyrates.map((cur) => (
                  <tr>{cur}</tr>
                ))}
              </td>
            </tr>
          </tbody>
        </center>
      </Table>
    </div>
  );
};

export default Rates;