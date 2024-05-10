import React, { useEffect, useMemo, FC } from "react";
import SubHeading from "../../components/Heading/SubHeading";
import Glide from "@glidejs/glide";
import NextPrev from "../../components/NextPrev/NextPrev";
import { CarDataType } from "../../data/types";
import VehicleCarouselCard from "./VehicleCarouselCard";
import { ReactNode } from "react";

interface VehicleSelectionSliderProps {
  className?: string;
  data?: CarDataType[];
  subHeading?: ReactNode;
  uniqueID: string;
  vehicleList: CarDataType[];
  itemPerRow?: number;
  sliderStyle?: "style1" | "style2";
}

const VehicleSelectionSlider: FC<VehicleSelectionSliderProps> = ({
  subHeading,
  uniqueID,
  vehicleList,
  itemPerRow = 4,
  sliderStyle = "style1",
}) => {
  const UNIQUE_CLASS = `gallerySlider__${uniqueID}`;

  const [vehicleData, setVehicleData] = React.useState<CarDataType[]>([]);

  useEffect(() => {
    setVehicleData(vehicleList);
  }, [vehicleList]);

  const MY_GLIDEJS = useMemo(() => {
    return new Glide(`.${UNIQUE_CLASS}`, {
      type: "slider",
      perView: itemPerRow,
      gap: 32,
      bound: true,
      rewind: false,
      animationDuration: 1000,
      dragThreshold: false,
  
      breakpoints: {
        1280: {
          perView: itemPerRow - 1,
        },
        1024: {
          gap: 20,
          perView: itemPerRow - 1,
        },
        768: {
          gap: 20,
          perView: itemPerRow - 2,
        },
        640: {
          gap: 20,
          perView: itemPerRow - 3,
        },
        500: {
          gap: 20,
          perView: 1.3,
        },
      },
    });
  }, [UNIQUE_CLASS, itemPerRow]);

  useEffect(() => {
    setTimeout(() => {
      MY_GLIDEJS.mount();
    }, 100);
  }, [MY_GLIDEJS]);

  return (
    <div className="nc-SectionSliderNewCategories">
      <div className={`${UNIQUE_CLASS} flow-root flex-row items-center`}>
        <SubHeading
          desc={subHeading}
          hasNextPrev={sliderStyle === "style1"}
          isCenter={sliderStyle === "style2"}
        />
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {vehicleData.map((car:any) => (
              <VehicleCarouselCard key={car.EnumId} data={car} />
            ))}
          </ul>
        </div>
        {sliderStyle === "style1" && (
          <NextPrev
            className="justify-center mt-10 block md:hidden xl:hidden"
            id="Vehicle-selction-2-NextPrev"
          />
        )}
      </div>
    </div>
  );
};

export default VehicleSelectionSlider;
