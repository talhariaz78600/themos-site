import React, { FC, useEffect,useState } from "react";
import { FiUser, FiBriefcase } from "react-icons/fi";
import { BsCalendarX } from "react-icons/bs";
import { FaRegHandshake } from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import StartRating from "../../components/StartRating"
import VehicleSelectionButton from "./VehicleSelectionButton";
import NcImage from "../../components/NcImage/NcImage";
import Modal from "../../components/Model";
 

interface Vehicle {
  VehicleName: string;
  CategoryName: string;
  reviews: number;
  rating: number;
  MaxPeople: number;
  MaxLuggage: number;
  Image: {
    url: string;
  };
  Carousel_Images: [];
  price?: number | null; // price can be nullable
}

interface VehicleSelectionSuggestedVehicleProps {
  vehicle: Vehicle | null;
}

const VehicleSelectionSuggestedVehicle: React.FC<VehicleSelectionSuggestedVehicleProps> = ({
  vehicle,
}) => {
  const renderForm = () => {
    if (!vehicle) return null;
    const [images, setImages] = useState<string[]>([]);

    useEffect(()=>{
          const data=vehicle.Carousel_Images.map((item:any)=>{
              return item.url
          })
          setImages(data);
    },[vehicle])
    // console.log(vehicle.Carousel_Images);

    return (
      <div className="w-full container relative mt-2 px-12 flex flex-col justify-center rounded-lg shadow-2xl bg-[rgb(17 24 40)] divide-y divide-neutral-700 dark:divide-neutral-700 md:divide-y-0 h-full">
        <div  className="w-full h-4   bg-white progresvehicalbar  my-4  rounded-full">
          <div
            className="to-pink-500 h-4  rounded-full"
            style={{ width: "33.33%" }}
          >
          </div>
        </div>
        <div className="hidden md:flex xl:flex flex-col md:flex-row justify-between items-start py-4  space-y-2">
          <div className="w-1/8 h-full">
            <div className="relative">
              {vehicle &&images && <Modal galleryImgs={images} />}
            </div>
            <NcImage
              containerClassName="flex items-center justify-center  w-[300px]"
              className="rounded-2xl w-[50px] h-[50px] md:w-[200px] md:h-[200px]"
              src={vehicle?.Image.url}
              id="select Steps Dock"
            />
          </div>
          <div className="flex-col items-start space-y-3 md:py-0 py-6">
            <h2 className="text-xl font-semibold line-clamp-1 py-2">{vehicle.VehicleName}</h2>
            <h2 className="text-3xl line-clamp-1 py-2">{vehicle.CategoryName}</h2>
            <StartRating reviewCount={vehicle.reviews} point={vehicle.rating} />
            <div className="text-sm text-neutral-500 py-2 dark:text-neutral-400 font-normal flex items-center">
              <FiUser size={18} />
              <span className="px-3">Seats {vehicle.MaxPeople} people</span>
            </div>
            <div className="text-sm  py-2 text-neutral-500 dark:text-neutral-400 font-normal flex items-center">
              <FiBriefcase size={18} />
              <span className="px-3 ">Fits {vehicle.MaxLuggage} suitcases</span>
            </div>
          </div>
          <div className="flex-col items-start space-y-3 w-[250px] md:w-max">
            <div className="text-sm text-neutral-500 dark:text-neutral-400 font-normal flex items-center">
              <BsCalendarX size={18} color="#556CE4" />
              <span className="px-3 py-2">Cancellation up to day before</span>
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400 font-normal flex items-center">
              <FaRegHandshake size={18} color="#556CE4" />
              <span className="px-3 py-2">Meet and greet at the spot</span>
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400 font-normal flex items-center">
              <MdTimer size={18} color="#556CE4" />
              <span className="px-3 py-2">Free Waiting Time</span>
            </div>
            <div className="flex justify-center items-center py-4 w-[50px]">
              <VehicleSelectionButton
                label={
                  vehicle.price == null ? "Contact Us Now" : `Book Now ${vehicle.price} €`
                }
                selectedVehicle={vehicle}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return renderForm();
};

export default VehicleSelectionSuggestedVehicle;
