"use client"
import React, { useEffect, useState } from "react";
// import { graphql, useStaticQuery } from "gatsby";
import TourCardGrid from "../../components/tours/TourCardGrid";
import SectionCarouselFleet from "../home/SectionCarouselFleet";
import SectionHowItWork from "../../components/SectionHowItWork/SectionHowItWork";

interface Title {
  title: string;
  description: string;
}
interface Alldata {
  tourdata?: any,
  fleetdata?: any
}

const TourMainPage: React.FC<Alldata> = ({ tourdata, fleetdata }) => {
  const [title, setTitle] = useState<Title>({
    title: "Select among a vast variety of tours",
    description: "Please Find Below All Of Our Tours"
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const asdas = queryParams.get("pickup");
    if (asdas === "piraeus_port") {
      setTitle({
        title: "Private Tours From Piraeus Port",
        description:
          "We will pick you up from Piraeus and complete the tour and then drop you off to your desired destination."
      });
    }
  }, []);

  return (
    <div className={`nc-ListingExperiencesPage relative overflow-hidden`} data-nc-id="ListingExperiencesPage">
      <div className="container relative">
        <div className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative pt-10 lg:pt-20 pb-16`} data-nc-id="SectionHero">
          <div className="flex flex-col lg:flex-row lg:items-center"></div>
          <TourCardGrid homePage={false} guests="" stayListings={tourdata} heading={title.title} subHeading={title.description} />

          <div className="relative py-16" id="ourFleet">
            <div className="nc-BackgroundSection absolute inset-y-0 w-screen xl:max-w-[1340px] 2xl:max-w-screen-2xl left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-0 bg-black bg-opacity-20 " data-nc-id="BackgroundSection"></div>
            <SectionCarouselFleet
              stayListings={fleetdata}
              heading="Our Fleet"
              subHeading="Find the right vehicle to feet your every need"
            />
          </div>
          <div className="relative py-16">
            <SectionHowItWork isCenter={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourMainPage;
