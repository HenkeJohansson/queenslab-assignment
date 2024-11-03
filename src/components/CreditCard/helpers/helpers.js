const acceptedCreditCards = {
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  mastercard: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
  amex: /^3[47][0-9]{13}$/,
  discover:
    /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
  dinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  jcb: /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/,
};

export const getCardManufacturer = (ccNumber) => {
  const formattedCcNumber = ccNumber.replace(/\D/g, "");
  for (const [key] of Object.entries(acceptedCreditCards)) {
    const regex = acceptedCreditCards[key];
    if (regex.test(formattedCcNumber)) {
      console.log(key);
      return key;
    }
  }
  return null;
};

export const formatCardNumber = (ccNumber) => {
  const value = ccNumber.replace(/\D/g, "");
  let formattedValue;
  let maxLength;
  // american express 15 digits
  if (/^3[47]\d{0,13}$/.test(value)) {
    formattedValue = value.replace(/(\d{4})/, "$1 ").replace(/(\d{4}) (\d{6})/, "$1 $2 ");
    maxLength = 17;
  } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
    // diner's club 14 digits
    formattedValue = value.replace(/(\d{4})/, "$1 ").replace(/(\d{4}) (\d{6})/, "$1 $2 ");
    maxLength = 16;
  } else if (/^\d{0,16}$/.test(value)) {
    // regular cc number 16 digits
    formattedValue = value
      .replace(/(\d{4})/, "$1 ")
      .replace(/(\d{4}) (\d{4})/, "$1 $2 ")
      .replace(/(\d{4}) (\d{4}) (\d{4})/, "$1 $2 $3 ");
    maxLength = 19;
  }
  formattedValue = formattedValue.trim();

  return { formattedValue, maxLength };
};

export const validateCardNumber = (ccNumber) => {
  if (!ccNumber) return false;
  const value = ccNumber.replace(/\D/g, "");
  let sum = 0;
  let shouldDouble = false;

  // Go through the numbers from the back
  for (let i = value.length - 1; i >= 0; i--) {
    let digit = parseInt(value[i]);

    if (shouldDouble) {
      if ((digit = digit * 2) > 9) {
        digit = digit - 9;
      }
    }

    sum = sum + digit;
    shouldDouble = !shouldDouble;
  }

  const valid = sum % 10 === 0;
  let accepted = false;

  // Check if the number is correct for the cards
  Object.keys(acceptedCreditCards).forEach((key) => {
    const regex = acceptedCreditCards[key];
    if (regex.test(value)) {
      accepted = true;
    }
  });

  return valid && accepted;
};

export const validateCVV = (ccNum, cvv) => {
  if (!ccNum) return false;
  const ccNumber = ccNum.replace(/\D/g, "");

  if (acceptedCreditCards.amex.test(ccNumber)) {
    // Amex has 4 digits cvv
    if (/^\d{4}$/.test(cvv)) {
      return true;
    }
    // other cards have 3 digits cvv
  } else if (/^\d{3}$/.test(cvv)) {
    return true;
    // have no cvv
  } else if (acceptedCreditCards.discover.test(ccNumber)) {
    return true;
  }
  return false;
};
