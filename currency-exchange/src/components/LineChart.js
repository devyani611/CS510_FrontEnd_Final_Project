import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

class LineChart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        result: null,
        fromCurrency: "USD",
        toCurrency: "GBP",
        closeRates: [],
        dates: [],
        chartData: []
      };
      const [chartData, setChartData] = useState({});
      
    }
  
componentDidMount() {
axios
.get(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=GBP&apikey=X2DRFB6QVEIV9IXL`)
.then((response) => {
  //console.log(response.data["Time Series FX (60min)"]);
  const seven_dates = [];
  const close_rate = [];
  console.log(response.data["Time Series FX (Daily)"]);
  console.log(Object.keys(response.data["Time Series FX (Daily)"]));
  for(var i=0;i<=7;i++){
    seven_dates.push(Object.keys(response.data["Time Series FX (Daily)"])[i]);
    close_rate.push(Object.values(response.data["Time Series FX (Daily)"])[i]["4. close"]);
    //console.log(Object.keys(response.data["Time Series FX (Daily)"])[i]);
    //console.log(Object.values(response.data["Time Series FX (Daily)"])[i]["4. close"]);
  }
  this.setState({ closeRates: close_rate, dates: seven_dates});

  setChartData({
      type: "Line",
    datasets: [
      {
        data: closeRates,
        backgroundColor: ["rgba(75, 192, 192, 0.6)"],
        borderWidth: 4
      }
    ]
  });
})
.catch(err => {
  console.log(err);
});
//console.log(empSal, empAge);
};

render(){
return (
<div>
<h1>Graph</h1>
<div>
  <Line
    data={chartData}
    options={{
      responsive: true,
      title: { text: "Exchange Rates", display: true },
      scales: {
        yAxes: [
          {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              display: true
            }
          }
        ]
      }
    }}
  />
</div>
</div>
);
}
}



export default LineChart;
