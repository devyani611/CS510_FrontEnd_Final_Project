import React, {useEffect, useState} from 'react';
import {Table} from "reactstrap";
import axios from "axios";

const tableStyle={
    color:'white'
  };

const Rates =(props)=> {
  
  const [currencies,setcurrencies]=useState([]);
  const [currencyrates,setcurrencyrates]=useState([]);
  const [invcurrencies,setinvcurrencies]=useState([]);
  
  useEffect(()=>{
    getrates();
  },[props.currencyfrom]);
  
  const getrates=(prop)=>{
    const top10=['CAD','GBP','INR','CHF','EUR','MYR','CNY','USD','SGD','AUD']
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=${props.currencyfrom}`)
      .then((response) => {
        const currencyrates = [];
        const currencycountry=[];
        for (const key in response.data.rates) {
          for(var i=0;i<=10;i++){
            if(top10[i]===key){
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
      const invcurrency=[];
      for(var i=0;i<=9;i++){
        var r=top10[i]
        axios
          .get(`https://api.exchangeratesapi.io/latest?base=${r}`)
          .then((response) => {
            invcurrency.push(response.data.rates[props.currencyfrom].toFixed(5)) 
          })
          .catch((err) => {
            console.log("oops", err);
          });
      }
      setinvcurrencies(invcurrency);  
  }

    return (
      <div>
        <h4> Top 10 currencies</h4>
    	  <Table borderless>
  			  <thead>
    			  <tr>
      				<th style={tableStyle}>{props.currencyfrom}</th>
      				<th style={tableStyle}>1.00 {props.currencyfrom}</th>
      				<th style={tableStyle}>inv. 1.00 {props.currencyfrom}</th>
    			  </tr>
  			  </thead>
  			  <tbody>
    			  <tr>
      				<td style={tableStyle}>{currencies.map((cur) => (
                        <tr>{cur}</tr>
                      ))}</td>
      				<td style={tableStyle}>{currencyrates.map((cur) => (
                        <tr>{cur}</tr>
                      ))}</td>
      				<td style={tableStyle}>{invcurrencies.map((cur) => (
                        <tr>{cur}</tr>
                      ))}</td>
    			  </tr>
    		  </tbody>
		    </Table>
      </div>
    );
}

export default Rates;