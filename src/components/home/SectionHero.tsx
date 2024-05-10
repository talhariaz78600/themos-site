import React, { FC } from "react";
import Image from "next/image";
import HeroSearchForm from "./HeroSearchForm";

export interface SectionHeroProps {
  className?: string;
}

const SectionHero: FC<SectionHeroProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionHero flex-col lg:flex-col relative ${className} px-2`} data-nc-id="SectionHero">
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-medium text-3xl md:text-4xl xl:text-5xl leading-[114%]" style={{ color:"rgb(229 231 233)"}}>
            Private Transfers & Tours
          </h2>
          <h2 className="font-medium text-2xl md:text-2xl xl:text-3xl !leading-[114%]" style={{ color:"rgb(229 231 233)"}}>
            Book Now With Us
          </h2>
          <span className="hidden lg:block text-base md:text-lg  dark:text-neutral-400" style={{ color:"rgb(155 163 175)"}}>
            With Tour-Greece you will have a trip full of experiences, book with us now your private transfer or tour in Greece.
          </span>
        </div>
        <div className="hidden lg:block flex-grow">
          <Image
            className="w-full"
            src="/hero-right.png"
            alt="MyImage"
            priority={true}
            width={500} 
            height={500}
            
          />
        </div>
      </div>

      <div className="z-10 lg:-mt-40 w-full">
        <HeroSearchForm currentTab={"Transfers"} className={""} currentPage={""} />
      </div>
    </div>
  );
};

export default SectionHero;