import React, { Component } from 'react';
import './App.css';
import 'bootstrap-4-grid/css/grid.min.css';

class App extends Component {
  render() {
    return (
      <div className="bootstrap-wrapper">
        <div className="app-container container">
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <h1>X-ratesDash</h1>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <ul>
                <li>
                  <a href="index.html">Rates Table</a>
                </li>
                <li>
                  <a href="index.html">historic Lookup</a>
                </li>
              </ul>  
            </div>
          </div>
          <div className="row">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <h4>Currency Converter</h4>
              <br></br>
              <form>
                <div class="form-inline">
                  <label for="from">From</label>
                  <input type="text" id="from" name="from"></input>
                </div>
                <br></br>
                <div class="form-inline">
                  <label for="to">To</label>
                  <input type="text" id="to" name="to"></input>
                </div>
                <br></br>
                <div class="form-inline">
                  <label for="amount">Amount</label>
                  <input type="text" id="amount" name="amount"></input>
                </div>
                <br></br>
                <button>Enter</button>
                <br></br>
              </form>
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <h4>Calculation results</h4>
              <br></br>
            </div>  
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <h4>Line chart</h4>
              <button> 1 day</button>
              <button> 1 Week</button>
              <button> 1 Month</button>
              <button> 1 Year</button>
              <br></br>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <h4>Rates Table</h4>
              <br></br>
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <h4>Monthly Average</h4>
              <br></br>
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <h4>Historic Lookup</h4>
              <br></br>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;