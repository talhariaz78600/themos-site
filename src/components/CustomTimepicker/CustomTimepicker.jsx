import * as React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

export default function CustomTimepicker({ value, handleTimeChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DemoContainer components={["MobileTimePicker"]}>
        <MobileTimePicker
          ampm={false}
          openTo="hours"
          views={["hours", "minutes"]}
          inputFormat="HH:mm"
          mask="__:__"
          value={value}
          onChange={(newValue) => handleTimeChange(newValue)}
          sx={{
            [`.MuiOutlinedInput-input`]: {
              backgroundColor: "transparent !important",
              border: "transparent !important",
              outline: "transparent !important",
              boxShadow: "unset !important",
              color: "transparent",
              paddingX: "12px",
              marginBottom: "10px",
            },
            [`.MuiOutlinedInput-notchedOutline`]: {
              border: "transparent !important",
              outline: "transparent !important",
              borderColor: "transparent",
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
