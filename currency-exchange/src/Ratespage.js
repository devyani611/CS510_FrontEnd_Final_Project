import React from 'react';
import {Table} from "reactstrap";
import axios from "axios";

const tableStyle={
    color:'white',
  };

class Ratespage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      result: null,
      fromCurrency: "USD",
      currencies: [],
      currency:[],
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
        const currency=[];
        const invcurrency=[];
        for (const key in response.data.rates) {
          currency.push(key);
          if(key==this.state.fromCurrency)
            continue;
          currencycountry.push(key);
          currencyrates.push(response.data.rates[key].toFixed(5));
          axios
            .get(`https://api.exchangeratesapi.io/latest?base=${key}`)
            .then((response) =>{
              if(key!=this.state.fromCurrency)
                invcurrency.push(response.data.rates[this.state.fromCurrency].toFixed(5))
              this.setState({invcurrencies:invcurrency});
            })
            .catch((err) => {
              console.log("oops", err);
            });   
        }
        this.setState({ currencies: currencycountry, currencyrates:currencyrates, currency:currency});
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

  convertHandler = () =>axios
      .get(`https://api.exchangeratesapi.io/latest?base=${this.state.fromCurrency}`)
      .then((response) => {
        const currencyrates = [];
        const currencycountry=[];
        const invcurrency=[];
        for (const key in response.data.rates) {
          if(key==this.state.fromCurrency)
            continue;
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
        this.setState({ currencies: currencycountry, currencyrates:currencyrates});
      })
      .catch((err) => {
        console.log("oops", err);
      });
  
  render() {
    return (
    	<div className="app-container container">
    		<div className="row">
    			<div className="col-lg-12 col-xl-12">
    				<h4> Rates Exchange Table </h4>
    			</div>
    		</div>
     		<div className="row">
     			<div className="col-lg-6 col-xl-6">
		    	  <Table borderless >
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
		      <div className="col-lg-6 col-xl-6">
		      	<div className="row">
		      		<div className="col-lg-12 col-xl-12">
		      			<br></br>
                <center>
                <h5>Choose the currency</h5>
                <select
                  name="from"
                  onChange={(event) => this.selectHandler(event)}
                  value={this.state.fromCurrency}
                >
                  {this.state.currency.map((cur) => (
                    <option key={cur}>{cur}</option>
                  ))}
                </select>
                <br></br>
                <br></br>
                <button onClick={this.convertHandler}>Go</button>
                <br></br>
                </center>
		      		</div>
		      	</div>
		      </div>
		    </div>
		  </div>
    );
  }
}

export default Ratespage;