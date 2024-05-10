import React from "react";
import VehicleSelectionSuggestedVehicle from "./VehicleSelectionSuggestedVehicle";
import PickUpAndDropOffWithStatusBar from "./PickUpAndDropOffWithStatusBar";
import SelectSteps3Dock from "./SelectSteps3Dock"

interface SelectStepsFormProps {
  error?: any; // Define the type for error if applicable
  className?: string;
  vehicle: any; // Define the type for vehicle data
  stepNumber: number;
  stepLabel: string;
  transferRouteData: any; // Define the type for transfer route data
  errorState: any; // Define the type for error state
  arrFlightNumber: string;
  landingTime: string| null; // Define the type for landing time
  dropAddress: string;
  addReturn: boolean;
  depFilghtNumber: string;
  pickUpTime: string | null; // Define the type for pick up time
  returnDate: string | null; // Define the type for return date
  pickUpAddress: string;
  onArrFlightNumberChange: (value: string|null) => void;
  onLandingTimeChange: (value: Date | null) => void;
  onDropAddressChange: (value: string|null) => void;
  onAddReturnChange: () => void;
  onDepFilghtNumberChange: (value: string|null) => void;
  onPickUpTimeChange: (value: Date | null) => void;
  onReturnDateChange: (value: Date | null) => void;
  onPickUpAddressChange: (value: string|null) => void;
}

const SelectStepsForm: React.FC<SelectStepsFormProps> = ({
  error,
  className,
  vehicle,
  stepNumber,
  stepLabel,
  transferRouteData,
  errorState,
  arrFlightNumber,
  landingTime,
  dropAddress,
  addReturn,
  depFilghtNumber,
  pickUpTime,
  returnDate,
  pickUpAddress,
  onArrFlightNumberChange,
  onLandingTimeChange,
  onDropAddressChange,
  onAddReturnChange,
  onDepFilghtNumberChange,
  onPickUpTimeChange,
  onReturnDateChange,
  onPickUpAddressChange,
}) => {
  const renderTab = () => {
    return (
      <div className="flex justify-between w-full px-4">
        <span>{stepLabel}</span>
        <span className=" dark:hover:text-neutral-400" style={{ color:"rgb(155 163 175)"}}>
          Step {stepNumber} of 3
        </span>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <>
        {stepNumber === 1 ? <VehicleSelectionSuggestedVehicle vehicle={vehicle} /> : null}
        {stepNumber === 2 ? (
          <PickUpAndDropOffWithStatusBar
            errorState={errorState}
            transferRouteData={transferRouteData}
            arrFlightNumber={arrFlightNumber}
            landingTime={landingTime}
            dropAddress={dropAddress}
            addReturn={addReturn}
            depFilghtNumber={depFilghtNumber}
            pickUpTime={pickUpTime}
            returnDate={returnDate}
            pickUpAddress={pickUpAddress}
            onArrFlightNumberChange={onArrFlightNumberChange}
            onLandingTimeChange={onLandingTimeChange}
            onDropAddressChange={onDropAddressChange}
            onAddReturnChange={onAddReturnChange}
            onDepFilghtNumberChange={onDepFilghtNumberChange}
            onPickUpTimeChange={onPickUpTimeChange}
            onReturnDateChange={onReturnDateChange}
            onPickUpAddressChange={onPickUpAddressChange}
          />
        ) : null}
        {stepNumber === 3 ? <SelectSteps3Dock /> : null}
      </>
    );
  };

  return (
    <div className={`nc-SelectStepsForm w-full ${className}`} data-nc-id="SelectStepsForm">
      {renderTab()}
      {renderForm()}
    </div>
  );
};

export default SelectStepsForm;
