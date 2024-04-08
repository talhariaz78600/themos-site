import React, { FC } from "react";
import NcImage from "../NcImage/NcImage";
import Badge from "../Badge/Badge";

export interface SectionOurFeaturesProps {
  className?: string;
  type?: "type1" | "type2";
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "lg:py-14",
  type = "type1",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col items-center mx-2 ${
        type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
      } ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <NcImage src={"/images/our-features.png"} className="" id="section-our-feature" />
      </div>
      <div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${
          type === "type1" ? "lg:pl-16" : "lg:pr-16"
        }`}
      >
        <span className="uppercase text-sm text-gray-400 tracking-widest">
          {/*BENnefits*/}
        </span>
        <h2 className="font-semibold text-4xl mt-5 text-white">Why To Book With Us </h2>

        <ul className="space-y-10 mt-16">
          <li className="space-y-4">
            <Badge name="Experience" />
            <span className="block text-xl text-white font-semibold">
              In Travel Industry Since 1983
            </span>
            <span className="block mt-5 text-neutral-400 dark:text-neutral-400">
              With a free listing, you can advertise your rental with no upfront
              costs
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="green" name="Fleet " />
            <span className="block text-white text-xl font-semibold">
              Top Of The Line Fleet
            </span>
            <span className="block mt-5 text-neutral-400 dark:text-neutral-400">
              Millions of people are searching for unique places to stay around
              the world
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="red" name="Secure" />
            <span className="block text-white text-xl font-semibold">
              Secure and simple
            </span>
            <span className="block mt-5 text-neutral-400 dark:text-neutral-400">
              A Holiday Lettings listing gives you a secure and easy way to take
              bookings and payments online
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeatures;
