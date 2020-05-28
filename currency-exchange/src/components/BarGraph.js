import React from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

class BarGraph extends React.Component {
  componentDidMount = () => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=INR&apikey=X2DRFB6QVEIV9IXL`
      )
      .then((response) => {
        console.log(response.data);
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
      });
  };

  render() {
    return (
      <div>
        <h4>Monthly Average</h4>
        <div className="chart_container">
          <Bar />
        </div>
      </div>
    );
  }
}

export default BarGraph;
