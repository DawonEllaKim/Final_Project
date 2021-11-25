import React, { useState } from "react";
import DatePicker from "react-datepicker";

const AddDate = (props) => {
  const [startDate, setStartDate] = useState();
  // console.log(startDate)

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      timeInputLabel="Time:"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
      inline
    />
  );
};

export default AddDate;
