import React from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import 'react-clock/dist/Clock.css';
export default function CustomTimePicker({ value, handleTimeChange }) {

  const formatTimeWithAMPM = (timeString) => {
    // Parse the time string into a Date object (assuming it's in "HH:mm" format)
    const [hours, minutes] = timeString.split(':');
    const time = new Date(0, 0, 0, hours, minutes); // Date object with given hours and minutes
  
    // Create options for formatting the time with AM/PM
    const options = {
      hour: 'numeric',  
       // Display hours as 1-12
      minute: '2-digit',  // Display minutes with leading zero (e.g., "08")
      hour12: true        // Use 12-hour clock with AM/PM
    };
  
    // Format the time using Intl.DateTimeFormat
    const formattedTime = new Intl.DateTimeFormat('en-US', options).format(time);
  
    return formattedTime;
  };
  const handleChange = (time) => {

    const formattedTime = time ? time : "00:00";
    console.log(formatTimeWithAMPM(formattedTime)); // Default to midnight if no time is selected
    handleTimeChange(formatTimeWithAMPM(formattedTime));
  };
  
  return (
    <TimePicker
      onChange={handleChange}
      value={value}
      id={"well"}
      className={"text-white w-48"}
      clearIcon={null}
      format="HH:mm" // Display time in 24-hour format
      hourPlaceholder="hh" // Custom placeholder for hours (ignored when using 24-hour format)
      minutePlaceholder="mm" // Custom placeholder for minutes
    />
  );
}
 
