import React, { useState } from "react";
import StartRating from "../../components/StartRating";
import NcImage from "../../components/NcImage/NcImage";
import { FiUser, FiBriefcase } from "react-icons/fi";
import VehicleSelectionButton from "./VehicleSelectionButton";
import Modal from "../../components/Model";
// import { Vehicle } from "../../types"; // Assuming you have a 'Vehicle' type defined

interface Props {
  size?: "default" | "small"; // Define prop types with optional size
  className?: string;
  data: any; // Define the type for 'data' prop as Vehicle
  key: string; // Define the type for 'key' prop as string
}

const VehicleCarouselCard: React.FC<Props> = ({
  size = "default",
  className = "",
  data,
  key,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const renderSliderGallery = () => {
    return (
      <div className="relative py-4 w-full rounded-2xl overflow-hidden">
        <div className="m-4 pb-4">
          <span className="text-sm px-4 py-4  dark:text-neutral-400 font-normal" style={{ color:"rgb(155 163 175)"}}>
            {data.CategoryName}
          </span>
          <div className="relative">
            {data.Carousel_Images.length !== 0 && <Modal galleryImgs={data.Carousel_Images.map((item:any) => item.url)} />}
          </div>
        </div>
        <div className="aspect-w-16 aspect-h-9">
          <NcImage
            containerClassName="flex items-center justify-center"
            className="w-full h-[200px] rounded-2xl"
            src={data.Image.url}
            // setLoading={setLoading}
            id="VehicleCouruselCard"
          />
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-5 space-y-4" : "p-3 space-y-2"}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h2
              className={`capitalize ${
                size === "default" ? "text-xl font-semibold" : "text-base font-medium"
              }`}
            >
              <span className="line-clamp-1">{data.VehicleName}</span>
            </h2>
          </div>
          <StartRating reviewCount={data.reviews} point={data.rating} />
          <div className="flex-col  dark:text-neutral-400 text-sm space-y-2 py-4" style={{ color:"rgb(155 163 175)"}}>
            <div className="flex items-center">
              <FiUser size={18} />
              <span className="px-3">{data.MaxPeople} people</span>
            </div>
            <div className="flex items-center">
              <FiBriefcase size={18} />
              <span className="px-3">{data.MaxLuggage} suitcases</span>
            </div>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-900 dark:border-neutral-800" />
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            {size === "default" && <div className="text-sm  dark:text-neutral-400 font-normal" style={{ color:"rgb(155 163 175)"}}>One way price:</div>}
            {data.price == null ? "Request A Quote" : +data.price + " €"}
          </span>
        </div>
        <div className="flex justify-center items-center">
          <VehicleSelectionButton
            selectedVehicle={data}
            label={data.price == null ? "Contact Us Now" : "Book Now"}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-CarCard group relative border border-neutral-700 dark:border-neutral-700 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow bg-[rgb(17 24 40)] ${className}`}
      data-nc-id="CarCard"
    >
      <div className="flex flex-col">
        {renderSliderGallery()}
        {renderContent()}
      </div>
    </div>
  );
};

export default VehicleCarouselCard;
