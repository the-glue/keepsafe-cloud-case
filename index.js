const express = require('express');
const rentCalculations = require('./lib/rentCalculations');

const app = express();
const PORT = process.env.PORT || 3001;

const FixedInterest = process.env.INTEREST || 1.82;

app.get('/', (req, res) => {
  res.json({ success: true, message: 'service up and running' });
});

app.get('/health', (req, res) => {
  res.json({ success: true, message: 'all services healthy' });
});

// http://localhost:3001/monthlyPayment?amount=20000&years=20
app.get('/monthlyPayment', (req, res) => {
  const amount = req.query.amount || 20000;
  const length = (req.query.years || 20) * 12;

  const monthlyPayment = rentCalculations.calculateMonthlyPayment(amount, length, FixedInterest);

  res.json({ success: true, monthlyPayment });
});

// http://localhost:3001/totalRent?amount=20000&years=20
app.get('/totalRent', (req, res) => {
  const amount = req.query.amount || 20000;
  const length = (req.query.years || 20) * 12;

  const totalRent = rentCalculations.calculateTotalRent(amount, length, FixedInterest);

  res.json({ success: true, totalRent });
});

app.listen(PORT, () => {
  console.debug('Node Js Server is Running');
});
