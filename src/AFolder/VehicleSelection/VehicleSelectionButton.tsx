import React, { useState } from "react";
import * as GeneralMethods from "../../components/GeneralMethods";
import {useRouter} from "next/navigation"
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
    Carousel_Images:[];
    price?: number | null; // price can be nullable
  }

interface Props {
  label: string;
  selectedVehicle: Vehicle;
}



const VehicleSelectionButton: React.FC<Props> = ({ label, selectedVehicle }) => {
  const router=useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const buttonClick = (vehicle: Vehicle) => {
    if (vehicle.price == null) {
      // Access $crisp property from window object
    //   (window as CustomWindow).$crisp?.push(['do', 'chat:open']); // Use optional chaining
    } else {
      setLoading(true);
      GeneralMethods.saveSelectedVehicle(vehicle);
      router.push('/customer-data-form');
    }
  };
  return (
    <button
      onClick={() => buttonClick(selectedVehicle)}
      type="button"
      className="h-12 md:h-12 md:px-4 w-full rounded-lg  hover:bg-[#5946e2] flex items-center justify-center text-neutral-50 focus:outline-none text-base font-semibold"
      style={{backgroundColor:"#5246e2"}}
   >
      {!loading ? (
        <span>{label}</span>
      ) : (
        <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span
        >
    </div>
      )}
    </button>
  );
};

export default VehicleSelectionButton;
