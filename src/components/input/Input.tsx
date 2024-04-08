"use client"
import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  isError?:string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      sizeClass = "h-12 px-4 py-2",
      fontClass = "text-sm font-normal",
      rounded = "rounded-2xl",
      children,
      isError,
      type = "text",
      ...args
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        className={`block w-full 
          peer
          placeholder-transparent                      
          bg-white             
          dark:bg-neutral-900 ${rounded} ${fontClass} ${sizeClass} ${className}
           
           ${
             isError
               ? "border-red-500"
               : "dark:border-neutral-700 border-neutral-200"
           }
          `}
        {...args}
      />
    );
  }
);

export default Input;