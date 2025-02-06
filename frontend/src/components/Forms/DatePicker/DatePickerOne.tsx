import { useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const DatePickerOne = ({ value, onChange }) => {
  const datepickerRef = useRef(null);
  const flatpickrInstance = useRef(null);

  useEffect(() => {
    if (datepickerRef.current) {
      flatpickrInstance.current = flatpickr(datepickerRef.current, {
        dateFormat: 'Y-m-d',
        defaultDate: value,
        onChange: (selectedDates, dateStr) => onChange(dateStr),
      });
    }

    return () => {
      if (flatpickrInstance.current && flatpickrInstance.current.destroy) {
        flatpickrInstance.current.destroy();
      }
    };
  }, [value]);

  return <input ref={datepickerRef} type="text" />;
};

export default DatePickerOne;
