"use client"
import React, { FC, useEffect, useState, useRef, useReducer } from "react";
import { useRouter } from "next/navigation"; // Import next/router for navigation
import BgGlassmorphism from "../../components/BgGlassmorphism";
import SelectStepsForm from "../VehicleSelection/SelectStepsForm";
import SectionSuggestionBox from "../../components/SectionSuggestBox";
import Step2FormSection1 from "../VehicleSelection/Step2FormSection1";
import NameMailAndPhone from "../VehicleSelection/NameMailAndPhone";
import StepsNavigator from "../VehicleSelection/StepsNavigatorSection";
import TransferSearchForm from "../../components/transfer/TransferSearchPage";
import * as generalMethods from "../../components/GeneralMethods";
import ModalDialog from "../../components/ModalDialog/ModalDialog";
import axios from "axios"
import {dialogErrorMessage, REACT_APP_REST_RESOURCE_BASE_END_POINT} from "../../components/constants/apiEndpoints";


interface ExtraItem {
  checked: boolean;
  label: string;
  price?: string;
  count?: number;
  note?: string;
}

interface State {
  fName: string;
  lName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  arrFlightNumber: string;
  landingTime: string;
  dropAddress: string;
  addReturn: boolean;
  depFilghtNumber: string;
  pickUpTime: string;
  returnDate: string;
  pickUpAddress: string;
  extrasArr: ExtraItem[];
  errors: Record<string, string>;
  processing: boolean;
}
type Action =
  | { type: "UPDATE_FIELD"; field: keyof State; value: string }
  | { type: "TOGGLE_RETURN" }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "PROCESSING"; processing: boolean };


const defaultState: State = {
  fName: "",
  lName: "",
  email: "",
  countryCode: "",
  phoneNumber: "",
  arrFlightNumber: "",
  landingTime: "",
  dropAddress: "",
  addReturn: false,
  depFilghtNumber: "",
  pickUpTime: "",
  returnDate: "",
  pickUpAddress: "",
  extrasArr: [
    { checked: false, label: "Child Seat", price: "5.00", count: 0 },
    { checked: false, label: "Skis / Snowboard", price: "2.00", count: 0 },
    { checked: false, label: "Note For Driver", note: "" },
    { checked: false, label: "Infant Seat", price: "5.00", count: 0 },
    { checked: false, label: "Booster Seat", price: "5.00", count: 0 },
    { checked: false, label: "Bicycle", price: "10.00", count: 0 },
    { checked: false, label: "Wheelchair", price: "Free", count: 0 },
  ],
  errors: {
    fName: "",
    lName: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    landingTime: "",
    pickUpTime: "",
    returnDate: "",
    pickUpAddress: "",
  },
  processing: false,
};
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "UPDATE_FIELD":
        return { ...state, [action.field]: action.value };
      case "TOGGLE_RETURN":
        return { ...state, addReturn: !state.addReturn };
      case "SET_ERRORS":
        return { ...state, errors: action.errors };
      case "PROCESSING":
        return { ...state, processing: action.processing };
      
    }
  };
  

const CustomerDataForm: FC = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const scrollAnchor = useRef<HTMLDivElement>(null);
  const [routeData, setRoutData] = useState<any>(null); // Define proper type for routeData
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null); // Define proper type for selectedVehicle
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter(); // Next.js router

  const handleSubmit = () => {
    console.log(state)
    dispatch({ type: "PROCESSING", processing: true });
    const errors: Record<string, string> = {};
    if (!state.landingTime) errors.landingTime = "missing";
    if (!state.landingTime) errors.pickUpAddress = "missing";
    if (state.addReturn && !state.pickUpTime) errors.pickUpTime = "missing";
    if (state.addReturn && !state.returnDate) errors.returnDate = "missing";
    if (state.addReturn && !state.pickUpAddress)
      errors.pickUpAddress = "missing";
    if (!state.fName.trim()) errors.fName = "missing";
    if (!state.lName.trim()) errors.lName = "missing";
    if (!state.email) errors.email = "missing";
    if (!state.countryCode) errors.countryCode = "missing";
    if (!state.phoneNumber) errors.phoneNumber = "missing";

    dispatch({ type: "SET_ERRORS", errors });

    if (Object.keys(errors).length === 0) {
      setLoading(true);

      const data = { ...state };
      localStorage.setItem("formState", JSON.stringify(data));
      setTimeout(() => {
        router.push("/checkout"); // Navigate to checkout page
        dispatch({ type: "PROCESSING", processing: false });
      }, 2000);
    } else {
      dispatch({ type: "PROCESSING", processing: false });
      if (scrollAnchor.current) {
        scrollAnchor.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  const fetchForPaymentIntent = (uuid: string, tourTitle: string|null) => {
    let stripeSecret = generalMethods.getStripeClientSecretKey(uuid);
    if (!stripeSecret) {
        let data = JSON.stringify({
            uuid: uuid,
            tourTitle: tourTitle,
        });

        axios
            .post(
                `${REACT_APP_REST_RESOURCE_BASE_END_POINT}/create-payment-intent`,
                data,
                {
                    headers: {"Content-Type": "application/json"},
                }
            )
            .then((res) => {
                generalMethods.saveStripeClientSecretKey(res, uuid)
            })
            .catch((error) => {
                setIsModalOpen(true)
            });
    }
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    router.push("/"); // Navigate to home page
  };

  useEffect(() => {
    const routeDetailsAndPrices = generalMethods.getRouteDetailsAndPrice();
    const vehicleDetail = generalMethods.getSelectedVehicle();
    const customerData = generalMethods.getCustomerDataForm();

    fetchForPaymentIntent(vehicleDetail.uuid, routeDetailsAndPrices?.tourTitle);

    // if (customerData) {
    //   dispatch({ type: "SET_PREVIOUS_DATA", previousData: customerData });
    // }

    setRoutData(routeDetailsAndPrices);
    setSelectedVehicle(vehicleDetail);

    if (scrollAnchor.current && window.innerWidth < 640) {
      scrollAnchor.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  }, []);

  const checkUpdates = () => {
      const routeDetailsAndPrices = generalMethods.getRouteDetailsAndPrice();
      const vehicleDetail = generalMethods.getSelectedVehicle();
      setRoutData(routeDetailsAndPrices);
      setSelectedVehicle(vehicleDetail);
      router.push('/');
  };

  const customContactDetails = () => {
    return (
      <NameMailAndPhone
        errorState={state.errors}
        fName={state.fName}
        lName={state.lName}
        email={state.email}
        countryCode={state.countryCode}
        phoneNumber={state.phoneNumber}
        onFirstNameChange={(e) =>
          dispatch({ type: "UPDATE_FIELD", field: "fName", value: e.target.value })
        }
        onLastNameChange={(e) =>
          dispatch({ type: "UPDATE_FIELD", field: "lName", value: e.target.value })
        }
        onEmailChange={(e) =>
          dispatch({ type: "UPDATE_FIELD", field: "email", value: e.target.value })
        }
        onCountryCodeChange={(e) =>
          dispatch({ type: "UPDATE_FIELD", field: "countryCode", value: e.target.value })
        }
        onPhoneNumberChange={(e) =>
          dispatch({ type: "UPDATE_FIELD", field: "phoneNumber", value: e.target.value })
        }
      />
    );
  };

  const routDataAndProgressBar = () => {
    return (
      <div className="relative">
        <div ref={scrollAnchor} className="absolute -top-24" />
        <SelectStepsForm
        vehicle={null}
          transferRouteData={routeData}
          className="lg:-mt-10"
          stepNumber={2}
          stepLabel={routeData?.tourTitle ?? "Client Details"}
          errorState={state.errors}
          arrFlightNumber={state.arrFlightNumber}
          landingTime={state.landingTime}
          dropAddress={state.dropAddress}
          addReturn={state.addReturn}
          depFilghtNumber={state.depFilghtNumber}
          pickUpTime={state.pickUpTime}
          returnDate={state.returnDate}
          pickUpAddress={state.pickUpAddress}
          onArrFlightNumberChange={(e:any) =>
            dispatch({ type: "UPDATE_FIELD", field: "arrFlightNumber", value: e.target.value })
          }
          onLandingTimeChange={(value:any) =>
            dispatch({ type: "UPDATE_FIELD", field: "landingTime", value })
          }
          onDropAddressChange={(e:any) =>
            dispatch({ type: "UPDATE_FIELD", field: "dropAddress", value: e.target.value })
          }
          onAddReturnChange={() =>
            dispatch({ type: "TOGGLE_RETURN" })
          }
          onDepFilghtNumberChange={(e:any) =>
            dispatch({ type: "UPDATE_FIELD", field: "depFilghtNumber", value: e.target.value })
          }
          onPickUpTimeChange={(value:any) =>
            dispatch({ type: "UPDATE_FIELD", field: "pickUpTime", value })
          }
          onReturnDateChange={(value:any) =>
            dispatch({ type: "UPDATE_FIELD", field: "returnDate", value })
          }
          onPickUpAddressChange={(e:any) =>
            dispatch({ type: "UPDATE_FIELD", field: "pickUpAddress", value: e.target.value })
          }
        />
      </div>
    );
  };

  const bookingBottomBar = () => {
    return (
      <div className="mt-6 md:mt-16 relative flex flex-col">
        <div className="w-full custom-bottom-nav-styles transition-all duration-200 ease-in-out">
          <StepsNavigator
            vehicleSelected={selectedVehicle}
            processing={loading}
            onNavigateBack={() => {
              router.push(`/vehicle-selection`);
            console.log("how are you")
            }}
            onBookNowClick={handleSubmit}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-CustomerDataFormPage flex flex-col-reverse lg:flex-col relative`} data-nc-id="CustomerDataFormPage">
      <BgGlassmorphism />
      <div className="container relative space-y-10 mb:space-y-24 mb-4 lg:space-y-32 min-h-screen">
        <div className="relative z-10 mb-0 md:mb-12 lg:mb-0 lg:mt-20 w-full">
          {!routeData?.tourTitle ? (
           
            <TransferSearchForm sendToParent={()=>{}} haveDefaultValue={routeData} btnType={"filter"} checkUpdates={checkUpdates} />
          ) : (
            <div></div>
          )}
        </div>
        <div className="flex-col items-center w-full relative pt-0 mb:pt-4 pb-4">
          {routDataAndProgressBar()}
          <div className="relative pb-6 pt-6">
            <div className="w-full relative mt-2 py-16 px-8 flex flex-col justify-center rounded-lg shadow-xl dark:shadow-2xl bg-[rgb(17 24 41)] divide-y divide-[rgb(17 24 41)] md:divide-y-0">
              <div className="flex-col items-start justify-between space-y-12">
                {customContactDetails()}
              </div>
            </div>
          </div>
          {bookingBottomBar()}
        </div>
      </div>
      <ModalDialog isOpen={isModalOpen} setIsOpen={setIsModalOpen} title="" description={""} pareCloseModal={onModalClose} />
    </div>
  );
};

export default CustomerDataForm;
