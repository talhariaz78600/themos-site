"use clinet"
import React, { FC } from "react";
import twFocusClass from "@/utails/twFocusClass";

export interface NextPrevProps {
  className?: string;
  currentPage?: number;
  totalPage?: number;
  btnClassName?: string;
  onClickNext?: () => void;
  onClickPrev?: () => void;
  onlyNext?: boolean;
  onlyPrev?: boolean;
  id?: any;
}

const NextPrev: FC<NextPrevProps> = ({
  className = "",
  onClickNext = () => {},
  onClickPrev = () => {},
  btnClassName = "w-10 h-10",
  onlyNext = false,
  onlyPrev = false,
  id,
}) => {
  return (
    <div
      className={`nc-NextPrev relative flex items-center text-neutral-300 dark:text-neutral-300 ${className}`}
      data-nc-id={`NextPrev-${id}`}
      data-glide-el="controls"
    >
      {!onlyNext && (
        <button
          className={`${btnClassName} ${
            !onlyPrev ? "mr-[6px]" : ""
          } bg-neutral-900 dark:bg-neutral-900 border border-neutral-200 border-neutral-6000 hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300 ${twFocusClass()}`}
          onClick={onClickPrev}
          title="Prev"
          data-glide-dir="<"
        >
        <i className="fa-solid fa-chevron-left"></i>
        </button>
      )}
      {!onlyPrev && (
        <button
          className={`${btnClassName} bg-neutral-900 dark:bg-neutral-900 border border-neutral-200 border-neutral-6000 hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300 ${twFocusClass()}`}
          onClick={onClickNext}
          title="Next"
          data-glide-dir=">"
        >
         <i className="fa-solid fa-chevron-right"></i>
        </button>
      )}
    </div>
  );
};

export default NextPrev;
