import React from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

var today = new Date();
var yyyy = today.getFullYear();

class BarGraph extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      Data: {},
      years :[],
      foryear : yyyy,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currencyfrom !== this.props.currencyfrom || prevProps.currencyto !== this.props.currencyto) {
        this.componentDidMount();
    }
}
  componentDidMount = () => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=${this.props.currencyfrom}&to_symbol=${this.props.currencyto}&apikey=X2DRFB6QVEIV9IXL`
      )
      .then((response) => {
        //console.log(response.data);
        let close_rates = [];
        let Nyears = [];
        let distinctyears = [];
        var months = Object.keys(response.data["Time Series FX (Monthly)"]);
        for(var i in months){
          var temp = new Date(months[i]);
          var year = temp.getFullYear();
          Nyears.push (year);
          distinctyears = [...new Set(Nyears)];
        }

        this.setState({years : distinctyears}); 
        var date1 = months.filter(function (obj) {
          var temp = new Date(obj);
          var year = temp.getFullYear();
          return (year == yyyy);
        });

        for (var i = 0; i < date1.length; i++) {
          close_rates.push(
            Object.values(response.data["Time Series FX (Monthly)"])[i][
              "4. close"
            ]
          );
        }

        this.setState({
          Data: {
            labels: date1,
            datasets: [
              {
                
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

  selectHandler = (event) => {
    if (event.target.name === "year") {
      this.setState({ foryear: event.target.value });
    } 
  };

  convertHandler = () =>{
    axios
    .get(
      `https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=${this.props.currencyfrom}&to_symbol=${this.props.currencyto}&apikey=X2DRFB6QVEIV9IXL`
    )
    .then((response) => {
      let close_rates = [];
      let cyear = this.state.foryear;
      let object = response.data["Time Series FX (Monthly)"];
      for (const property in object) {
        //console.log(`${property}: ${object[property]["4. close"]}`);
        var temp = new Date(property);
        var year = temp.getFullYear();
        if(year==cyear){
          close_rates.push(`${object[property]["4. close"]}`);
        }
      }
      console.log(close_rates);
      var months = Object.keys(response.data["Time Series FX (Monthly)"]);
      var date1 = months.filter(function (obj) {
        var temp = new Date(obj);
        var year = temp.getFullYear();
        return (year==cyear);
      });
      
      this.setState({
        Data: {
          labels: date1,
          datasets: [
            {
              
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
}

  render() {
    return (
      <div>
        <h4>Monthly closing rate for the year</h4>
        <div>
        <span>
        <select
                    style={{ width: "100px"}}
                    name="year"
                    onChange={(event) => this.selectHandler(event)}
                    value={this.state.foryear}
                  >
                    {this.state.years.map((cur) => (
                      <option key={cur}>{cur}</option>
                    ))}
                  </select>
        </span>
        <span><button onClick={this.convertHandler}>Go</button></span>
        </div>
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
