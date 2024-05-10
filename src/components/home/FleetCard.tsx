
import React, { FC } from "react";
import GallerySlider from "../GallerySlider";
import { DEMO_STAY_LISTINGS } from "../../data/listings"
import { StayDataType } from "../../data/types";
// import { useRouter } from "next/router";
import SaleOffBadge from "../SaleOffBadge/SaleOffBadge";
import Badge from "../Badge/Badge";
import Modal from "../Model";

interface StayCardProps {
  className?: string;
  ratioClass?: string;
  data?: StayDataType;
  size?: "default" | "small";
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];
const FleetCard: FC<StayCardProps> = ({
  size = "default",
  className = "",
  data = DEMO_DATA,
  ratioClass,
}) => {
  //   const router = useRouter();

  const {
    galleryImgs,
    listingCategory,
    address,
    title,
    bedrooms,
    href,
    like,
    saleOff,
    isAds,
    price,
    reviewStart,
    reviewCount,
    id,
  } = data;

  //   const handleCardClickEvent = (e: React.MouseEvent<HTMLElement>) => {
  //     const target = e.target as HTMLElement;
  //     if (target.tagName !== "I") {
  //     //   router.push(href);
  //     }
  //   };
// console.log(galleryImgs)

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`stay-v-${id}`}
          ratioClass={ratioClass}
          galleryImgs={galleryImgs}
        />
        {saleOff && <SaleOffBadge className="absolute left-3 top-3" />}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            {isAds && <Badge name="ADS" color="green" />}
            {/* <h2
              className={` font-medium capitalize ${size === "default" ? "text-lg" : "text-base"
                }`}
            >
              {title}
            </h2> */}
          </div>
          <div className="flex items-center  dark:text-neutral-400 text-sm space-x-2" style={{color:"rgb(155 163 175)"}}>
            {size === "default" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />  
              </svg>
            )}
            <span className="">{title}</span>
          </div>
          <div className="flex items-start">
            <Modal galleryImgs={galleryImgs} key={id} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`cursor-pointer nc-StayCard group relative bg-[#111828]  border border-neutral-800 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
      data-nc-id={`FleetCard${id}`}

    >
      {renderSliderGallery()}
      {renderContent()}
    </div>
  );
};

export default FleetCard;
