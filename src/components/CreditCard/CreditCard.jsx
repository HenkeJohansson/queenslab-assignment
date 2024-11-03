import { useState, useEffect } from "react";
import "./CreditCard.scss"
import { formatCardNumber, getCardManufacturer, validateCardNumber, validateCVV } from "./helpers/helpers";
import MonthPickerInput from "./MonthPickerInput";
import clsx from "clsx";

const CreditCard = () => {
  const [cardName, setCardName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [creditCardMaxLength, setCreditCardMaxLength] = useState(19);
  const [cvvNumber, setCVVNumber] = useState('');
  const [isCardValid, setIsCardValid] = useState(false);
  const [cardManufacturer, setCardManufacturer] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);

  const onSetCreditCardNumber = (value) => {
    const { formattedValue, maxLength } = formatCardNumber(value);
    setCreditCardNumber(formattedValue);
    setCreditCardMaxLength(maxLength);
  };

  useEffect(() => {
    const isCcNumberValid = validateCardNumber(creditCardNumber);
    const isCvvNumberValid = validateCVV(creditCardNumber, cvvNumber);
    setIsCardValid(isCcNumberValid && isCvvNumberValid);

    if (isCcNumberValid) {
      setCardManufacturer(getCardManufacturer(creditCardNumber));
    }
  }, [creditCardNumber, cvvNumber]);

  useEffect(() => {
    if (isCardValid && expirationDate && cardName) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [isCardValid, expirationDate, cardName]);

  return (
    <>
      <div className={clsx('credit-card', {
        'credit-card--mastercard': cardManufacturer === 'mastercard',
        'credit-card--discover': cardManufacturer === 'discover',
        'credit-card--visa': cardManufacturer === 'visa',
        'credit-card--amex': cardManufacturer === 'amex',
      })}>
        <div className="credit-card__bank-name">{cardManufacturer}</div>
        <div className="credit-card__chip"></div>
        <div className="credit-card__input-container">
          <label name="cardNumber">Card number</label>
          <input
            className="credit-card__field card-number"
            type="text"
            name="cardNumber"
            value={creditCardNumber}
            maxLength={creditCardMaxLength}
            placeholder="XXXX XXXX XXXX XXXX"
            onChange={(event) => onSetCreditCardNumber(event.target.value)}
          />
          <div className="small-fields">
            <div className="expiration-date">
              <label name="expirationDate">Expires</label>
              <MonthPickerInput onSelectDate={setExpirationDate} />
            </div>
            <div className="cvv">
              <label name="ccv">CVV</label>
              <input
                className="credit-card__field"
                type="number"
                name="ccv"
                placeholder="CVV"
                value={cvvNumber}
                onChange={(event) => setCVVNumber(event.target.value)}
                contentEditable
              />
            </div>
          </div>
          <label name="cardName">Card name</label>
          <input
            className="credit-card__field card-name"
            type="text"
            name="cardName"
            placeholder=""
            value={cardName}
            onChange={(event) => setCardName(event.target.value)}
          />
        </div>
      </div>

      <button className="submit-btn" disabled={!canSubmit}>Submit</button>
    </>
  );
};

export default CreditCard;
