import React from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {},
    };
  }
  componentDidMount = () => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=${this.props.currencyfrom}&to_symbol=${this.props.currencyto}&apikey=X2DRFB6QVEIV9IXL`
      )
      .then((response) => {
        console.log(response.data);
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");

        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!

        var yyyy = today.getFullYear();

        let close_rates = [];

        var months = Object.keys(response.data["Time Series FX (Monthly)"]);

        var date1 = months.filter(function (obj) {
          var temp = new Date(obj);
          var date2 = temp.getDate();
          var month = temp.getMonth();
          var year = temp.getFullYear();
          return (year == yyyy);
        });
        console.log(date1);
        for (var i = 0; i < date1.length; i++) {
          close_rates.push(
            Object.values(response.data["Time Series FX (Monthly)"])[i][
              "4. close"
            ]
          );
        }
        console.log(close_rates);
        this.setState({
          Data: {
            labels: date1,
            datasets: [
              {
                label: "Closing Rate for the day",
                data: close_rates,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(255, 206, 86, 0.8)',
                  'rgba(75, 192, 192, 0.8)',
                  'rgba(153, 102, 255, 0.8)',
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(255, 206, 86, 0.8)',
                  'rgba(75, 192, 192, 0.8)',
                  'rgba(153, 102, 255, 0.8)',
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(255, 206, 86, 0.8)',
                  'rgba(75, 192, 192, 0.8)',
                  'rgba(153, 102, 255, 0.8)',
                  ],
               
                hoverBackgroundColor:[
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  ],
               
               
                borderWidth: 2,
              },
            ],
          },
        });
      });
  };


  render() {
    return (
      <div>
        <h4>Monthly closing rate for the year</h4>
        <div className="chart_container">
          <Bar data={this.state.Data}
            options={{
              responsive: true,
              scales: {
                xAxes: [
                  {
                    display: true,
                    gridLines: {
                      offsetGridLines: true
                  }
                  },
                
                ],
                yAxes: [
                  {
                    display: true,
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default BarGraph;
