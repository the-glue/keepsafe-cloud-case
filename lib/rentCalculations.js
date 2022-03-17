const rentCalculations = {};

// amount is the total amount lend
// length is the length of the loan in months
// interest is the annual interest agreed upon with the bank
rentCalculations.calculateTotalRent = function ctr(amount, length, interest) {
  const monthlyPayment = rentCalculations.calculateMonthlyPayment(amount, length, interest);
  const totalAmountPayed = monthlyPayment * length;
  const totalRent = (totalAmountPayed - amount);

  return Math.round(totalRent * 10) / 10;
};

// amount is the total amount lend
// length is the length of the loan in months
// interest is the annual interest agreed upon with the bank
rentCalculations.calculateMonthlyPayment = function cmp(amount, length, interest) {
  const mI = interest / 12 / 100;
  const monthlyPayment = (amount * mI) * (((1 + mI) ** length) / (((1 + mI) ** length) - 1));

  return Math.round(100 * monthlyPayment) / 100;
};

module.exports = rentCalculations;
