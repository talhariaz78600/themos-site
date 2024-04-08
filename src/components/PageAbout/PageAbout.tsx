// import rightImg from "images/about-hero-right.png";

import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatic";
import SectionSubscribe2 from "../SectionSubscribe2";
import BgGlassmorphism from "../BgGlassmorphism";
// import BackgroundSection from "AFolder/components/BackgroundSection";
import SectionHero from "./SectionHero";
import SectionClientSay from "../SectionClientSay/SectionClientSay";

export interface PageAboutProps {
  className?: string;
}

const PageAbout: FC<PageAboutProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageAbout bg-neutral-900 overflow-hidden mx-4 relative ${className}`}
      data-nc-id="PageAbout"
    >

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={"/images/about-hero-right.png"}
          heading="👋 About Us."
          btnText=""
          subHeading="We’re impartial and independent, and every day we create distinctive, world-class programmes and content which inform, educate and entertain millions of people in the around the world."
        />

        <SectionFounder />
        <div className="relative py-16">
          {/* <BackgroundSection /> */}
          <SectionClientSay />
        </div>

        <SectionStatistic />

        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageAbout;
