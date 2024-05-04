import React from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import 'react-clock/dist/Clock.css';
export default function CustomTimePicker({ value, handleTimeChange }) {
  const handleChange = (time) => {

    const formattedTime = time ? time : "00:00"; // Default to midnight if no time is selected
    handleTimeChange(formattedTime);
  };

  return (
    <TimePicker
      onChange={handleChange}
      value={value}
      
      className={"text-white w-48"}
      clearIcon={null}
      format="HH:mm" // Display time in 24-hour format
      hourPlaceholder="hh" // Custom placeholder for hours (ignored when using 24-hour format)
      minutePlaceholder="mm" // Custom placeholder for minutes
    />
  );
}
 
