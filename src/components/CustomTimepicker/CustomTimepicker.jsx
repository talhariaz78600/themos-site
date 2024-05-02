import * as React from "react";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
export default function CustomTimepicker({ value, handleTimeChange }) {
  return (
    <div>
      <TimePicker onChange={handleTimeChange} value={value} />
    </div>
    );
}
