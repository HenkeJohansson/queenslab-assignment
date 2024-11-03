const { validateCardNumber, validateCVV, formatCardNumber, getCardManufacturer } = require("./helpers");

// validateCardNumber
test("mastercard number should return true", () => {
  const mastercardNumber = "5125 8600 0000 0006";
  expect(validateCardNumber(mastercardNumber)).toBe(true);
});
test("visa number should return true", () => {
  const visaNumber = "4154 2100 0000 0001";
  expect(validateCardNumber(visaNumber)).toBe(true);
});
test("american express number should return true", () => {
  const americanExpressNumber = "378282246310005";
  expect(validateCardNumber(americanExpressNumber)).toBe(true);
});
test("discover number should return true", () => {
  const discoverNumber = "6011111111111117";
  expect(validateCardNumber(discoverNumber)).toBe(true);
});
test("invalid credit card number should return false", () => {
  const invalidCardNumber = "123456";
  expect(validateCardNumber(invalidCardNumber)).toBe(false);
});

// validateCVV
test("correct mastercard info should return true", () => {
  const mastercardNumber = "5125 8600 0000 0006";
  const cvv = "000";
  expect(validateCVV(mastercardNumber, cvv)).toBe(true);
});
test("correct mastercard number but wrong cvv should return false", () => {
  const mastercardNumber = "5125 8600 0000 0006";
  const cvv = "0";
  expect(validateCVV(mastercardNumber, cvv)).toBe(false);
});
test("correct visa info should return true", () => {
  const visaNumber = "5125 8600 0000 0006";
  const cvv = "000";
  expect(validateCVV(visaNumber, cvv)).toBe(true);
});
test("correct visa number but wrong cvv should return false", () => {
  const visaNumber = "5125 8600 0000 0006";
  const cvv = "0";
  expect(validateCVV(visaNumber, cvv)).toBe(false);
});
test("correct amex info should return true", () => {
  const amexNumber = "378282246310005";
  const cvv = "0000";
  expect(validateCVV(amexNumber, cvv)).toBe(true);
});
test("correct amex number but wrong cvv should return false", () => {
  const amexNumber = "378282246310005";
  const cvv = "000";
  expect(validateCVV(amexNumber, cvv)).toBe(false);
});
test("correct discover info should return true", () => {
  const discoverNumber = "6011111111111117";
  expect(validateCVV(discoverNumber)).toBe(true);
});

// formatCardNumber
test("should format the mastercard number to have spaces in it", () => {
  const inputCardNumber = "5125860000000006";
  const expectedOutput = { formattedValue: "5125 8600 0000 0006", maxLength: 19 };
  expect(formatCardNumber(inputCardNumber)).toStrictEqual(expectedOutput);
});
test("should format the amex number to have spaces in it", () => {
  const inputCardNumber = "378282246310005";
  const expectedOutput = { formattedValue: "3782 822463 10005", maxLength: 17 };
  expect(formatCardNumber(inputCardNumber)).toStrictEqual(expectedOutput);
});

// getCardManufacturer
test("should return mastercard", () => {
  const inputCardNumber = "5125860000000006";
  expect(getCardManufacturer(inputCardNumber)).toBe("mastercard");
});
test("should return discover", () => {
  const inputCardNumber = "6011111111111117";
  expect(getCardManufacturer(inputCardNumber)).toBe("discover");
});
test("should return null", () => {
  const inputCardNumber = "123123";
  expect(getCardManufacturer(inputCardNumber)).toBe(null);
});
