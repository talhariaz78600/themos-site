import React, { FC } from "react";
import ButtonCircle from "./Button/ButtonCircle";

import NcImage from "./NcImage/NcImage";
import Badge from "./Badge/Badge";
import Input from "./input/Input";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionSubscribe2 relative flex flex-col px-2 lg:flex-row lg:items-center ${className}`}
      data-nc-id="SectionSubscribe2"
    >
      <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5">
        <h2 className="font-semibold text-white text-4xl">Join our newsletter 🎉</h2>
        <span className="block mt-5 text-neutral-400 dark:text-neutral-400">
          Read and share new perspectives on just about any topic. Everyone’s
          welcome.
        </span>
        <ul className="space-y-4 mt-10">
          <li className="flex items-center space-x-4">
            <Badge name="01" />
            <span className="font-medium text-neutral-300 dark:text-neutral-300">
              Get more discount
            </span>
          </li>
          <li className="flex items-center space-x-4">
            <Badge color="red" name="02" />
            <span className="font-medium text-neutral-300 dark:text-neutral-300">
              Get premium magazines
            </span>
          </li>
        </ul>
        <form className="mt-10 relative max-w-sm">
          <Input
            required
            aria-required
            placeholder="Enter your email"
            type="email"
          />
          <ButtonCircle
            type="submit"
            className="absolute transform top-1/2 -translate-y-1/2 right-1"
          >
            <em className="las la-arrow-right text-xl"></em>
          </ButtonCircle>
        </form>
      </div>
      <div className="flex-grow">
        <NcImage src={"/images/SVG-subcribe2.png"} className="" id="section sub2" />
      </div>
    </div>
  );
};

export default SectionSubscribe2;