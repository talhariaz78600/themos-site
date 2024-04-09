import React, { useEffect, useState } from "react";
import { SingleDatePicker, AnchorDirectionShape } from "react-dates";
import moment, { Moment } from "moment";
// import { useWindowSize } from 'use-window-size';

interface ExperiencesDateSingleInputProps {
  defaultValue: Moment | null;
  onChange?: (date: Moment | null) => void;
  defaultFocus?: boolean;
  onFocusChange?: (focused: boolean) => void;
  className?: string;
  anchorDirection?: AnchorDirectionShape;
}

const ExperiencesDateSingleInput: React.FC<ExperiencesDateSingleInputProps> = ({
  defaultValue,
  onChange,
  defaultFocus = false,
  onFocusChange,
  anchorDirection,
  className = "",
}) => {
  const [focusedInput, setFocusedInput] = useState<boolean>(defaultFocus);
  const [startDate, setStartDate] = useState<Moment | null>(defaultValue);

//   const windowSize = useWindowSize();

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

  const handleDateFocusChange = ({ focused }: { focused: boolean }) => {
    setFocusedInput(focused);
    onFocusChange && onFocusChange(focused);
  };

  const renderInputCheckInDate = () => {
    const focused = focusedInput;

    return (
      <div
        onClick={handleInputFocus}
        className={`flex w-full relative items-center space-x-3 cursor-pointer ${
          focused ? "nc-hero-field-focused" : ""
        }`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
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
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
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
      className={`ExperiencesDateSingleInput relative flex ${className} ${
        !!focusedInput ? "nc-date-focusedInput" : "nc-date-not-focusedInput"
      }`}
    >
      <div className="flex relative inset-0 items-center">
        <div className="absolute mx-1 px-0 md:mx-6 md:px-2">
          <label htmlFor="date-picker" className="hidden">
            Enter a date:
          </label>
          <input
            type="date"
            id="date-picker"
            className="hidden"
            value={startDate ? startDate.format("YYYY-MM-DD") : ""}
            onChange={(e) => setStartDate(moment(e.target.value, "YYYY-MM-DD"))}
          />
          <label htmlFor="single-date-picker" className="hidden">
            Enter a date:
          </label>
          <SingleDatePicker
            date={startDate}
            onDateChange={(date) => setStartDate(date)}
            focused={focusedInput}
            onFocusChange={handleDateFocusChange}
            id="single-date-picker"
            placeholder="Date Picker"
            numberOfMonths={1}
            showClearDate={false}
            hideKeyboardShortcutsPanel
            noBorder
            ariaLabel="date"
          />
        </div>
        {renderInputCheckInDate()}
      </div>
    </div>
  );
};

export default ExperiencesDateSingleInput;
