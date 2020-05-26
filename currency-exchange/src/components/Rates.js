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
      currencies: [],
      currencyrates:[],
      invcurrencies:[],
    };
  }

  
  componentDidMount() {
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=${this.props.currencyfrom}`)
      .then((response) => {
        const currencyrates = [];
        const currencycountry=[];
        const invcurrency=[];
        const top10=['INR','USD','EUR','GBP','AUD','CAD','SGD','CHF','MYR','CNY']
        console.log(response.data)
        for (const key in response.data.rates) {
          for(var i=0;i<=10;i++){
            if(top10[i]===key){
              currencycountry.push(key);
              currencyrates.push(response.data.rates[key].toFixed(5));
              axios
                .get(`https://api.exchangeratesapi.io/latest?base=${key}`)
                .then((response) =>{
                  invcurrency.push(response.data.rates[this.props.currencyfrom].toFixed(5))
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


  render() {
    return (
      <div>
        <h4> Top 10 currencies</h4>
        <h3>{this.props.currencyfrom}</h3>
    	  <Table borderless>
  			  <thead>
    			  <tr>
      				<th style={tableStyle}>{this.props.currencyfrom}</th>
      				<th style={tableStyle}>1.00 {this.props.currencyfrom}</th>
      				<th style={tableStyle}>inv. 1.00 {this.props.currencyfrom}</th>
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