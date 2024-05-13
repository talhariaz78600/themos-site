
import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import Datetime from 'react-datetime';
// import "react-datetime/css/react-datetime.css";
// import { useWindowSize } from 'use-window-size';

interface ExperiencesDateSingleInputProps {
  defaultValue: Moment | null;
  onChange?: (date: Moment | null) => void;
  defaultFocus?: boolean;
  onFocusChange?: (focused: boolean) => void;
  className?: string;

}
const isValidDate = (current:any) => {
  const minDate = new Date(); 
  return current.isSameOrAfter(minDate, 'day');
}

const ExperiencesDateSingleInput: React.FC<ExperiencesDateSingleInputProps> = ({
  defaultValue,
  onChange,
  defaultFocus = false,
  onFocusChange,
  // anchorDirection,
  className = "",
}) => {
  const [focusedInput, setFocusedInput] = useState<boolean>(defaultFocus);
  const [startDate, setStartDate] = useState<Moment | null>(defaultValue);

  //   const windowSize = useWindowSize();
  const handleDateChange = (dat: any) => {
    console.log(dat)
    const date=dat._d;
    console.log(date);
    if (date instanceof Array && date.length === 2) {
      // Handle range selection if necessary
      const [start, end] = date;
      // Convert to Moment objects if necessary
      const momentStart = moment(start);
      const momentEnd = moment(end);
      // Proceed with your logic
      setStartDate(momentStart);
      // If you also need to handle end date:
      // setEndDate(momentEnd);
    } else if (date instanceof Date) {
      // Convert to Moment object if necessary
      const momentDate = moment(date);
      // Proceed with your logic
      setStartDate(momentDate);
    } else {
      const [start, end] = date;
      const momentStart = moment(start);

      // Proceed with your logic
      setStartDate(momentStart);
    }
    if(date){
      handleDateFocusChange(false)
    }
  };
  useEffect(() => {
    setStartDate(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setFocusedInput(defaultFocus);
  }, [defaultFocus]);

  useEffect(() => {
    if (onChange) {
      onChange(startDate);
    }
  }, [startDate]);

  const handleDateFocusChange = (  focused: boolean ) => {
    setFocusedInput(focused);
    onFocusChange && onFocusChange(focused);
  };
  const shouldCloseCalendar = () => {
  
    return  focusedInput===true;
  };

  const renderInputCheckInDate = () => {
    const focused = focusedInput;

    return (
      <div
        onClick={handleInputFocus}
        className={`flex cursor-pointer ${focused ? "nc-hero-field-focused" : ""
          }`}
      >
        <div className="  " style={{  color:"rgb(155 163 175)"}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="nc-icon-field"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="flex-grow">
          <span className="block xl:text-lg font-semibold">
            {startDate ? startDate.format("DD MMM") : "Date"}
          </span>
          <span className="block mt-1 text-sm  leading-none font-light" style={{  color:"rgb(155 163 175)"}}>
            {startDate ? "Date" : `Add date`}
          </span>
        </div>
      </div>
    );
  };

  const handleInputFocus = () => {
    setFocusedInput((prev) => !prev);
    document.getElementById("scroll-anc")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div
      className={`ExperiencesDateSingleInput py-5 lg:mx-5  flex ${className} ${!!focusedInput ? "nc-date-focusedInput" : "nc-date-not-focusedInput"
        }`}
    >
      <div className="flex">
        <div className=" mt-2 mx-2"> 
          <label htmlFor="single-date-picker" className="hidden">
            Enter a date:
          </label>

          <div>
            
            <Datetime  dateFormat="YYYY-MM-DD" open={focusedInput}    onChange={handleDateChange}  isValidDate={isValidDate}  timeFormat={false} />
            <i className="fa-solid fa-calendar-days  text-xl px-2 cursor-pointer"  style={{ color:"rgb(155 163 175)"}} onClick={handleInputFocus}></i>

          </div>


        </div>
        {renderInputCheckInDate()}
      </div>
    </div>
  );
};


export default ExperiencesDateSingleInput;
