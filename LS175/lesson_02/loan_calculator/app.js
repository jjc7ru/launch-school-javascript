const HTTP = require('http');
const URL = require('url').URL;
const PORT = 3000;
const HTML_START = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Loan Calculator</title>
    <style type="text/css">
      body {
        background: rgba(250, 250, 250);
        font-family: sans-serif;
        color: rgb(50, 50, 50);
      }

      article {
        width: 100%;
        max-width: 40rem;
        margin: 0 auto;
        padding: 1rem 2rem;
      }

      h1 {
        font-size: 2.5rem;
        text-align: center;
      }

      table {
        font-size: 2rem;
      }

      th {
        text-align: right;
      }
    </style>
  </head>
  <body>
    <article>
      <h1>Loan Calculator</h1>
      <table>
        <tbody>
`;

const HTML_END = `
        </tbody>
      </table>
    </article>
  </body>
</html>`;

function getParams(path) {
  const myURL = new URL(path, `http://localhost:${PORT}`);
  return myURL.searchParams;
};

function calculateLoan(amount, duration, apr) {
  let annualInterestRate = apr / 100;
  let monthlyInterestRate = annualInterestRate / 12;
  let months = Number(duration) * 12;
  let payment = amount *
          (monthlyInterestRate /
          (1 - Math.pow((1 + monthlyInterestRate),(-months))));

  return payment.toFixed(2);
};

function createLoanOffer(params) {
  const APR = 5;
  let amount = Number(params.get('amount'));
  let duration = Number(params.get('duration'));
  let payment = calculateLoan(amount, duration, APR);

  //return `Amount: $${amount}\nDuration: ${duration} years\nAPR: ${APR}%\nMonthly payment: $${payment}\n`;
  return [amount, duration, APR, payment];
};

function addTableRow(rowHead, rowData) {
  let row = `
  <tr>
    <th>${rowHead}</th>
    <td>${rowData}</td>
  </tr>`
  return row;
}

function addTableRowWithControls(rowHead, hrefDec, valueDec, rowData, hrefInc, valueInc) {
  let row = `
  <tr>
    <th>${rowHead}</th>
    <td>
      <a href='${hrefDec}'>${valueDec}</a>
    </td>
    <td>${rowData}</td>
    <td>
    <a href='${hrefInc}'>${valueInc}</a>
    </td>
  </tr>`
  return row; 
}

function createTable(params) {
  let [amount, duration, APR, payment] = createLoanOffer(params);
  let decAmount = `/?amount=${amount - 100}&duration=${duration}`;
  let incAmount = `/?amount=${amount + 100}&duration=${duration}`;
  let decDuration = `/?amount=${amount}&duration=${duration - 1}`;
  let incDuration = `/?amount=${amount}&duration=${duration + 1}`;

  let body = HTML_START + 
    addTableRowWithControls('Amount:', decAmount, '- 100', amount, incAmount, '+ 100') +
    addTableRowWithControls('Duration:', decDuration, '- 1 year', duration, incDuration, '+ 1 year') +
    addTableRow('APR:', `${APR}%`) +
    addTableRow('Monthly payment:', `$${payment}`) +
    HTML_END;
  return body;
}

const SERVER = HTTP.createServer((req, res) => {
  let method = req.method;
  let path = req.url;

  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    //let content = createLoanOffer(getParams(path));
    let content = createTable(getParams(path));

    res.statusCode = 200;
    //res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Type', 'text/html');
    //res.write(`${content}\n`);
    res.write(`${content}\n`);
    res.end();
  }
});

SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});