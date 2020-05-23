import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

export default class BarChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {},
    };
  }
  componentDidMount() {
    axios
      .get(
        `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=GBP&apikey=X2DRFB6QVEIV9IXL`
      )
      .then((response) => {
        const data = response.data["Time Series FX (Daily)"];
        let dates = [];
        let close_rate = [];
        for (var i = 0; i <= 7; i++) {
          dates.push(Object.keys(response.data["Time Series FX (Daily)"])[i]);
          //console.log(dates);
          close_rate.push(
            Object.values(response.data["Time Series FX (Daily)"])[i][
              "4. close"
            ]
          );
          //console.log(close_rate);
        }
        this.setState({
          Data: {
            labels: dates,
            datasets: [
              {
                label: "Closing Rate for the week",
                data: close_rate,
                backgroundColor: [
                  "rgba(255,105,145,0.6)",
                  "rgba(155,100,210,0.6)",
                  "rgba(90,178,255,0.6)",
                  "rgba(240,134,67,0.6)",
                  "rgba(120,120,120,0.6)",
                  "rgba(250,55,197,0.6)",
                ],
                borderColor: [
                  "rgba((34,139,34 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(255, 99, 132, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(159, 159, 159, 1)",
                ],
              },
            ],
          },
        
        });
      });
  }
  render() {
    return (
      <div>
        <Line data={this.state.Data} options={{ maintainAspectRatio: false }} />
      </div>
    );
  }
}
