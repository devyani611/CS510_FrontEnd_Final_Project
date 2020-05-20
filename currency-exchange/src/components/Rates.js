import React from 'react';
import {Table} from "reactstrap";
import axios from "axios";

const tableStyle={
    color:'white'
  };
class Rates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      fromCurrency: "USD",
      currencies: [],
      currencyrates:[],
      invcurrencies:[],
    };
  }

  componentDidMount() {
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=${this.state.fromCurrency}`)
      .then((response) => {
        const currencyrates = [];
        const currencycountry=[];
        const invcurrency=[];
        const top10=['INR','USD','EUR','GBP','AUD','CAD','SGD','CHF','MYR','CNY']
        for (const key in response.data.rates) {
          for(var i=0;i<=10;i++){
            if(top10[i]===key){
              currencycountry.push(key);
              currencyrates.push(response.data.rates[key].toFixed(5));
              axios
                .get(`https://api.exchangeratesapi.io/latest?base=${key}`)
                .then((response) =>{
                  invcurrency.push(response.data.rates[this.state.fromCurrency].toFixed(5))
                  this.setState({invcurrencies:invcurrency});
                })
                .catch((err) => {
                  console.log("oops", err);
                });   
            }
          }
        }
        this.setState({ currencies: currencycountry, currencyrates:currencyrates});
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

  render() {
    return (
      <div>
        <h4> Top 10 currencies</h4>
    	  <Table borderless>
  			  <thead>
    			  <tr>
      				<th style={tableStyle}>{this.state.fromCurrency}</th>
      				<th style={tableStyle}>1.00 {this.state.fromCurrency}</th>
      				<th style={tableStyle}>inv. 1.00 {this.state.fromCurrency}</th>
    			  </tr>
  			  </thead>
  			  <tbody>
    			  <tr>
      				<td style={tableStyle}>{this.state.currencies.map((cur) => (
                        <tr>{cur}</tr>
                      ))}</td>
      				<td style={tableStyle}>{this.state.currencyrates.map((cur) => (
                        <tr>{cur}</tr>
                      ))}</td>
      				<td style={tableStyle}>{this.state.invcurrencies.map((cur) => (
                        <tr>{cur}</tr>
                      ))}</td>
    			  </tr>
    		  </tbody>
		    </Table>
      </div>
    );
  }
}

export default Rates;