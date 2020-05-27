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
  },[]);
  
  const getrates=()=>{
    console.log(props.currencyfrom)
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=${props.currencyfrom}`)
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
                  invcurrency.push(response.data.rates[props.currencyfrom].toFixed(5))
                  setinvcurrencies(invcurrency);
                })
                .catch((err) => {
                  console.log("oops", err);
                });   
            }
          }
        }
        setcurrencies(currencycountry);
        setcurrencyrates(currencyrates);
      })
      .catch((err) => {
        console.log("oops", err);
      });
  }


    return (
      <div>
        <h4> Top 10 currencies</h4>
        <h3>{props.currencyfrom}</h3>
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