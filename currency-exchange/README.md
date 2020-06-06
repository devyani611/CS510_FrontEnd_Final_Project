
## X-rates Dash

Deployed Website:  https://devyani611.github.io/CS510_FrontEnd_Final_Project/#/

### A React Foreign Currency Exchange Rates Dashboard Application

#### Application Features

* Amount Conversion from one currency to another using latest exchange rates.
* Displays closing rates graph between the selected currencies for 1day , 1week, 1month and 1year.
* Displays rates table for top 10 currencies on the homepage.
* Displays Monthly Opening rates for the selected currencies for the selected year.
* Displays Closing Opening rates for the selected currencies for the selected year.
* Two separate pages for displaying latest rates table and historic lookup.
* Rates Table Page: Displays latest exchange rates with respect to the selected currency.
* Historic Lookup Page: Displays exchange rates with respect to the selected currency for the selected date.

### Technologies Used
* React
* Javascript
* HTML
* CSS
* Bootstrap

### npm packages used

* react-chartjs-2 for Bar and line Chart
* reactstrap
* react-calender
* react-chartjs-2
* axios
* react-router-dom


### APIs used

* https://api.exchangeratesapi.io/latest
* https://restcountries.eu/rest/v2/all?fields=currencies;name;
* https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=USD&to_symbol=INR&apikey=xxxxx
* https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=INR&outputsize=full&apikey=xxxxx
* https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=USD&to_symbol=INR&interval=30min&apikey=xxxxx
* https://api.exchangeratesapi.io/latest?base=${CURRENCY_NAME}&symbols=${CURRENCY_NAME}
* https://api.exchangeratesapi.io/${date}?base=${this.state.fromCurrency}
* https://financialmodelingprep.com/api/v3/quotes/forex?apikey=xxxxxxxxx


### To run the project `npm start`
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.


