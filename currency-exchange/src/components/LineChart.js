import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
} from "reactstrap";
import "./LineChart.css";

export default class BarChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {},
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.currencyfrom !== this.props.currencyfrom || prevProps.currencyto !== this.props.currencyto) {
        this.componentDidMount();
    }
}

  OneYearClose = () => {
    console.log("one year data");
    axios
      .get(
        `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${this.props.currencyfrom}&to_symbol=${this.props.currencyto}&outputsize=full&apikey=X2DRFB6QVEIV9IXL`
      )
      .then((response) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();

        let close_rates = [];

        var OneYear = Object.keys(response.data["Time Series FX (Daily)"]);
        var date1 = OneYear.filter(function (obj) {
          var temp = new Date(obj);
          var date2 = temp.getDate();
          var month = temp.getMonth();
          var year = temp.getFullYear();
          return (
            (date2 <= dd && month <= mm && year == yyyy) ||
            (date2 >= dd && month >= mm && year == yyyy - 1)
          );
        });
        //console.log(date1);

        for (var i = 0; i < date1.length; i++) {
          close_rates.push(
            Object.values(response.data["Time Series FX (Daily)"])[i][
              "4. close"
            ]
          );
        }
        this.setState({
          Data: {
            labels: date1,
            datasets: [
              {
                label: "Closing Rates for the year",
                data: close_rates,
                backgroundColor: ["rgba(255,105,145,0.6)"],
                borderColor: ["rgba((34,139,34 1)"],
                borderWidth: "2px",
                fill: true,
                lineTension: 0.5,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
              },
            ],
          },
        });
      });
  };

  OneMonthClose = () => {
    console.log("one month data");
    axios
      .get(
        `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${this.props.currencyfrom}&to_symbol=${this.props.currencyto}&apikey=X2DRFB6QVEIV9IXL`
      )
      .then((response) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");

        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!

        var yyyy = today.getFullYear();

        let close_rates = [];

        var OneMonth = Object.keys(response.data["Time Series FX (Daily)"]);

        var date1 = OneMonth.filter(function (obj) {
          var temp = new Date(obj);
          var date2 = temp.getDate();
          var month = temp.getMonth();
          var year = temp.getFullYear();
          return (
            (date2 <= dd && month == mm && year == yyyy) ||
            (month == mm - 1 && year == yyyy)
          );
        });
        //console.log(date1);
        for (var i = 0; i < date1.length; i++) {
          close_rates.push(
            Object.values(response.data["Time Series FX (Daily)"])[i][
              "4. close"
            ]
          );
        }
        this.setState({
          Data: {
            labels: date1,
            datasets: [
              {
                label: "Closing Rates for the Month",
                data: close_rates,
                backgroundColor: ["rgba(255,105,145,0.6)"],
                borderColor: ["rgba((34,139,34 1)"],
                borderWidth: "2px",
                fill: true,
                lineTension: 0.5,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
              },
            ],
          },
        });
      });
  };

  OneWeekClose = () => {
    console.log("1 week close data");
    axios
      .get(
        `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${this.props.currencyfrom}&to_symbol=${this.props.currencyto}&apikey=X2DRFB6QVEIV9IXL`
      )
      .then((response) => {
        const data = response.data["Time Series FX (Daily)"];
        let dates = [];
        let close_rate = [];
        for (var i = 0; i <= 5; i++) {
          dates.push(Object.keys(response.data["Time Series FX (Daily)"])[i]);
          close_rate.push(
            Object.values(response.data["Time Series FX (Daily)"])[i][
              "4. close"
            ]
          );
        }
        this.setState({
          Data: {
            labels: dates,
            datasets: [
              {
                label: "Closing Rate for the week",
                data: close_rate,
                backgroundColor: ["rgba(255,105,145,0.6)"],
                borderColor: ["rgba((34,139,34 1)"],
                borderWidth: "2px",
                fill: true,
                lineTension: 0.5,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
              },
            ],
          },
        });
      });
  };
  componentDidMount = () => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${this.props.currencyfrom}&to_symbol=${this.props.currencyto}&interval=30min&apikey=X2DRFB6QVEIV9IXL`
      )
      .then((response) => {
        var close_rates = [];
        var dates = [];
        console.log("load data for the day");
        const data = response.data["Time Series FX (30min)"];
        //console.log(response.data["Time Series FX (30min)"]);

        const Oneday_date = Object.keys(
          response.data["Time Series FX (30min)"]
        );

        var date1 = Oneday_date.filter(function (obj) {
          var temp = new Date(obj);

          var date2 = temp.getDate();

          var today = new Date().getDate();

          return date2 == today;
        });
        //console.log(date1);
        for (var i = 0; i < date1.length; i++) {
          close_rates.push(
            Object.values(response.data["Time Series FX (30min)"])[i][
              "4. close"
            ]
          );
        }
        //console.log(close_rates);
        this.setState({
          Data: {
            labels: date1,
            datasets: [
              {
                label: "Closing Rate for the day",
                data: close_rates,
                backgroundColor: ["rgba(255,105,145,0.6)"],
                borderColor: ["rgba((34,139,34 1)"],
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
              },
            ],
          },
        });
      });
  };

  render() {
    return (
      <div>
        <h4>
          Time Series Graph for {this.props.currencyfrom} to{" "}
          {this.props.currencyto}
        </h4>
        <div className="chart_container">
          <Line
            data={this.state.Data}
            options={{
              responsive: true,
              scales: {
                xAxes: [
                  {
                    display: false,
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
        <div>
          <Container fluid>
            <Row class="row1">
              <Col sm={3} md={3}>
                <Button
                  variant="5day"
                  className="button"
                  //onClick={this.OneDayClose}
                  onClick={this.componentDidMount}
                  id="oned"
                >
                  1 D
                </Button>
              </Col>
              <Col sm={3} md={3}>
                <Button
                  variant="1month"
                  className="button"
                  onClick={this.OneWeekClose}
                  id="onew"
                >
                  1 W
                </Button>
              </Col>
              <Col sm={3} md={3}>
                <Button
                  variant="6months"
                  className="button"
                  onClick={this.OneMonthClose}
                  id="onem"
                >
                  1 M
                </Button>
              </Col>
              <Col sm={3} md={3}>
                <Button
                  variant="ytd"
                  className="button"
                  onClick={this.OneYearClose}
                  id="oney"
                >
                  1 Y
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
