import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MonthPickerInput = ({ onSelectDate }) => {
  const [startDate, setStartDate] = useState(null);

  const onChangeDate = (date) => {
    setStartDate(date);
    onSelectDate(date);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => onChangeDate(date)}
      dateFormat="MM/YYYY"
      showMonthYearPicker
    />
  );
};

export default MonthPickerInput;
