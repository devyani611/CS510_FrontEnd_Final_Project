import React from 'react';
import {Table} from "reactstrap";
import axios from "axios";

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
              currencyrates.push(response.data.rates[key]);
              axios
                .get(`https://api.exchangeratesapi.io/latest?base=${key}`)
                .then((response) =>{
                  invcurrency.push(response.data.rates[this.state.fromCurrency])
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
      				<th>{this.state.fromCurrency}</th>
      				<th>1.00 {this.state.fromCurrency}</th>
      				<th>inv. 1.00 {this.state.fromCurrency}</th>
    			  </tr>
  			  </thead>
  			  <tbody>
    			  <tr>
      				<td>{this.state.currencies.map((cur) => (
                        <tr>{cur}</tr>
                      ))}</td>
      				<td>{this.state.currencyrates.map((cur) => (
                        <tr>{cur}</tr>
                      ))}</td>
      				<td>{this.state.invcurrencies.map((cur) => (
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