"use client"
import React, { ButtonHTMLAttributes } from "react";
import twFocusClass from "@/utails/twFocusClass";
export interface ButtonCircleProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string;
}

const ButtonCircle: React.FC<ButtonCircleProps> = ({
  className = " ",
  size = " w-9 h-9 ",
  ...args
}) => {
  return (
    <button
      className={
        `ttnc-ButtonCircle flex items-center justify-center rounded-full !leading-none disabled:bg-opacity-70 bg-blue-900 hover:bg-blue-700 text-neutral-50  ${className} ${size} ` +
        twFocusClass(true)
      }
      {...args}
    >
        →
    </button>
  );
};

export default ButtonCircle;