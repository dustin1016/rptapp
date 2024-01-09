import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const Datepicker = ({setFormattedDate}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormattedDate(format(date, 'yyyy-MM-dd'));
  };

  return (
    <div className="w-full max-w-xs">
    <h1 className='text-xl mb-4'>Select 'As Of' Date</h1>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        className="w-full border rounded px-3 py-2 outline-none"
        value={format(selectedDate, 'yyyy-MM-dd')}
      />
    </div>
  );
};

export default Datepicker;
