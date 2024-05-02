import React, { ReactNode } from "react";
import NextPrev from "../NextPrev/NextPrev";

interface SubHeadingProps {
  fontClass?: string;
  desc?: ReactNode;
  className?: string;
  isCenter?: boolean;
  hasNextPrev?: boolean;
}

const SubHeading: React.FC<SubHeadingProps> = ({
  desc = "Popular places to stay that Chisfis recommends for you",
  className = "mb-12 lg:mb-16 text-neutral-50 dark:text-neutral-50",
  isCenter = false,
  hasNextPrev = false,
}) => {
  return (
    <div
      className={`nc-Section-Heading hidden md:flex xl:flex relative flex flex-col sm:flex-row items-center justify-center justify-between ${className}`}
    >
      <div
        className={
          isCenter ? "text-center w-full max-w-2xl mx-auto" : "max-w-2xl"
        }
      >
        {desc && (
          <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-400 dark:text-neutral-400">
            {desc}
          </span>
        )}
      </div>
      {hasNextPrev && !isCenter && (
        <div className="mt-4 flex justify-end sm:ml-2 sm:mt-0 flex-shrink-0 hidden md:block xl:block">
          <NextPrev
            onClickNext={() => {}}
            onClickPrev={() => {}}
            id="subHeading-NextPrev"
          />
        </div>
      )}
    </div>
  );
};

export default SubHeading;
