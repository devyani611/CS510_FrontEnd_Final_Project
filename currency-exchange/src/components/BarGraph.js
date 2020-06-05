import React from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "./BarGraph.css";

var today = new Date();
var yyyy = today.getFullYear();

class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {},
      years: [],
      foryear: yyyy,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.currencyfrom !== this.props.currencyfrom ||
      prevProps.currencyto !== this.props.currencyto
    ) {
      this.componentDidMount();
      this.setState({ foryear: today.getFullYear()});
    }
  }
  componentDidMount = () => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=${this.props.currencyfrom}&to_symbol=${this.props.currencyto}&apikey=787GW6OSVREOIQAA`
      )
      .then((response) => {
        let close_rates = [];
        let Nyears = [];
        let distinctyears = [];
        var months = Object.keys(response.data["Time Series FX (Monthly)"]);
        for (var i in months) {
          var temp = new Date(months[i]);
          var year = temp.getFullYear();
          Nyears.push(year);
          distinctyears = [...new Set(Nyears)];
        }

        this.setState({ years: distinctyears });
        var date1 = months.filter(function (obj) {
          var temp = new Date(obj);
          var year = temp.getFullYear();
          return year == yyyy;
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
            labels: date1.map(function (obj) {
              var temp = new Date(obj);
              var months = temp.toLocaleString("en-US", { month: "short" });
              return months;
            }),
            datasets: [
              {
                label: `${this.props.currencyto} per 1 ${this.props.currencyfrom}`,
                data: close_rates,
                backgroundColor: "rgba(128,0,128,0.9)",
                hoverBackgroundColor: "rgba(128,0,128,0.6)",
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

  convertHandler = () => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=${this.props.currencyfrom}&to_symbol=${this.props.currencyto}&apikey=787GW6OSVREOIQAA`
      )
      .then((response) => {
        let close_rates = [];
        let cyear = this.state.foryear;
        let object = response.data["Time Series FX (Monthly)"];
        for (const property in object) {
          var temp = new Date(property);
          var year = temp.getFullYear();
          if (year == cyear) {
            close_rates.push(`${object[property]["4. close"]}`);
          }
        }
        console.log(close_rates);
        var months = Object.keys(response.data["Time Series FX (Monthly)"]);
        var date1 = months.filter(function (obj) {
          var temp = new Date(obj);
          var year = temp.getFullYear();
          return year == cyear;
        });

        this.setState({
          Data: {
            labels: date1.map(function (obj) {
              var temp = new Date(obj);
              var months = temp.toLocaleString("en-US", { month: "short" });
              return months;
            }),
            datasets: [
              {
                label: "Closing Rates on monthly basis",
                data: close_rates,
                backgroundColor: "rgba(128,0,128,0.9)",
                hoverBackgroundColor: "rgba(128,0,128,0.6)",
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
        <div className="Barchart_container">
          <div id="heading5">Monthly Closing Rates</div>
          <div id="select_wrapper">
            <span>
              <select
                style={{ width: "80px", height: "35px" }}
                name="year"
                aria-label="Select year"
                onChange={(event) => this.selectHandler(event)}
                value={this.state.foryear}
              >
                {this.state.years.map((cur) => (
                  <option key={cur}>{cur}</option>
                ))}
              </select>
            </span>
            <span>
              <button id="butn1" onClick={this.convertHandler}>
                Go
              </button>
            </span>
          </div>

          <Bar
            data={this.state.Data}
            width={50}
            height={50}
            options={{
              responsive: true,

              scales: {
                xAxes: [
                  {
                    display: true,
                    gridLines: {
                      offsetGridLines: true,
                    },
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
