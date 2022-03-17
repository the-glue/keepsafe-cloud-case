const rentCalculations = require('../lib/rentCalculations');

describe(('do these tests actually work, or did we slip in a bug?'), () => {
  it('calculating total rent for 10000 euro in 10 years with a 1% interest rate', () => {
    expect.assertions(1);
    expect(rentCalculations.calculateTotalRent(10000, 120, 1)).toBe(512);
  });

  it.skip('calculating total rent for 20000 euro in 21 years with a 1,64% interest rate', () => {
    expect.assertions(1);
    expect(rentCalculations.calculateTotalRent(20000, 252, 1.64)).toBe(3655.24);
  });

  it('calculating monthly payment for 10000 euro in 10 years with a 1% interest rate', () => {
    expect.assertions(1);
    expect(rentCalculations.calculateMonthlyPayment(10000, 120, 1)).toBe(87.60);
  });

  it('calculating monthly payment for 20000 euro in 20 years with a 1% interest rate', () => {
    expect.assertions(1);
    expect(rentCalculations.calculateMonthlyPayment(20000, 240, 1)).toBe(91.98);
  });
});
