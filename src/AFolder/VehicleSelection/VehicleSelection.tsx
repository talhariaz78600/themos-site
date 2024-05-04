"use client"
import React, { FC, useEffect, useRef, useState } from "react";
import BgGlassmorphism from "../../components/BgGlassmorphism";
import VehicleSelectionSlider from "./VehicleSelectionSlider";
import SelectStepsForm from "./SelectStepsForm";
import * as generalMethods from "../../components/GeneralMethods";
const VehicleSelection: FC<any> = ({ data }) => {
  const scrollAnchor = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<any>();
  const [suggested, setSuggested] = useState<any | null>();
  const [vehicleList, setVehicleList] = useState<any[]>(data);
  const [uniqueId, setUniqueId] = useState<string>("web");
  // console.log(data);
  const routeDetailsAndPrices = generalMethods.getRouteDetailsAndPrice();
  useEffect(() => {
    if (routeDetailsAndPrices) {
      // Only Local Storage Data Logic
      data.forEach((vehicle: any) => {
        const vehicleData =
          routeDetailsAndPrices.fetchedPrices?.priceList?.find(
            (e: any) => e.vehicleCategory?.id === vehicle.EnumId
          );
        if (vehicleData) {
          vehicle.price = vehicleData.price;
          vehicle.uuid = vehicleData.uuid;
        } else {
          vehicle.price = null;
          vehicle.uuid = null;
        }
      });


      setUniqueId("web");
      
      const clonedList = data;
      
      const suggestedVehicle = setSuggestedVehicle(routeDetailsAndPrices.guests)
      console.log(suggestedVehicle);
      const removeSuggested = clonedList.filter((item: any) => item.id !== suggestedVehicle.id);
      console.log(removeSuggested)
      const filtered = removeSuggested.filter((item: any) => item.MaxPeople > routeDetailsAndPrices.guests);
      filtered.unshift(suggestedVehicle)
      setVehicleList(filtered);

      setState(routeDetailsAndPrices);
    }
  }, []);
  const setSuggestedVehicle = (guests:number) => {
    const vehicle = guests <= 4 ? vehicleList[0] :
        guests <= 8 ? vehicleList[3] : vehicleList[5];
    setSuggested(vehicle);

    return vehicle;
}

  return (
    <div className="nc-VehicleSelectionPage  flex flex-col-reverse lg:flex-col relative">
      {/* <BgGlassmorphism /> */}
      {suggested && <div
        ref={scrollAnchor}
        className="container relative space-y-10 mb:space-y-24 mb-6 lg:space-y-32 lg:mb-12"
      >
        {/* SEARCH FORM */}
        <div className="relative z-10 mb-0 md:mb-12 lg:mb-0 lg:mt-20 w-full">
          <div className="nc-HeroSearchForm w-full my-5 lg:py-0">
            {/* <VehicleSearchForm haveDefaultValue={state} btnType={"filter"} /> */}
          </div>
        </div>
        <div className="flex-col items-center w-full relative pt-0 mb:pt-4 pb-16">
          <div className="relative">
            <SelectStepsForm
              className=" lg:-mt-10"
              vehicle={suggested}
              stepNumber={1}
              stepLabel="Vehicle List"
              transferRouteData=""
              errorState=""
              arrFlightNumber=""
              landingTime={null}
              dropAddress=""
              addReturn={false}
              depFilghtNumber=""
              pickUpTime={null}
              returnDate={null}
              pickUpAddress=""
              onArrFlightNumberChange={() => { }}
              onLandingTimeChange={() => { }}
              onDropAddressChange={() => { }}
              onAddReturnChange={() => { }}
              onDepFilghtNumberChange={() => { }}
              onPickUpTimeChange={() => { }}
              onReturnDateChange={() => { }}
              onPickUpAddressChange={() => { }}
            />
          </div>
          <div className="z-10 mb-12 lg:mb-0 mt-6 lg:mt-10 w-full">
            <VehicleSelectionSlider
              uniqueID={uniqueId}
              vehicleList={vehicleList}
              subHeading="Feeling Curious? Here's More"
            />
          </div>
        </div>
      </div>}
    </div>
  );
};

export default VehicleSelection;
