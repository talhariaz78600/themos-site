"use client"
import React, { useEffect, useState, ReactElement } from "react";
import LocationInput from "../LocationInput";
import GuestsInput from "../GuestInput";
import ExperiencesDateSingleInput from "../ExperiencesDateSingleInput";
import FetchTransferPricesButton from "../FetchTransferPricesButton";
import ModalDialog from "../ModalDialog/ModalDialog";
import moment, { Moment } from "moment";
import {
  dialogErrorMessage,
  globalSearchPlaceholder,
} from "../constants/apiEndpoints";

interface Location {
  placeId: string;
  id: string;
  title: string;
  subtitle: string;
  icon: ReactElement;
}

interface TransferSearchFormProps {
  haveDefaultValue: {
    date: Moment;
    origin: Location;
    destination: Location;
    guests: number;
    locations: Location[];
    fdprocessedid?: string;
  } | null;
  btnType: string;
  sendToParent: () => void;
  checkUpdates: () => void;
}

const TransferSearchForm: React.FC<TransferSearchFormProps> = ({
  haveDefaultValue,
  btnType,
  sendToParent,
  checkUpdates,
}) => {
  const [dateValue, setdateValue] = useState<Moment | null>(null);
  const [pickUpInputValue, setPickUpInputValue] = useState<Location | null>(
    null
  );
  const [dropOffInputValue, setDropOffInputValue] = useState<Location | null>(
    null
  );
  const [guestValue, setGuestValue] = useState<number>(1);
  const [originFocus, setOriginFocus] = useState<boolean>(false);
  const [dateFocused, setDateFocused] = useState<boolean>(false);
  const [dropOffFocus, setDropOffFocused] = useState<boolean>(false);
  const [switchInput, setSwitchInput] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    checkButton();
    if (btnType === "filter" && haveDefaultValue) {
      setdateValue(moment(haveDefaultValue.date));
      setPickUpInputValue(haveDefaultValue.origin);
      setDropOffInputValue(haveDefaultValue.destination);
      setGuestValue(haveDefaultValue.guests);
    } else if (haveDefaultValue) {
      const tada = globalSearchPlaceholder.reduce(
        (result, item) =>
          haveDefaultValue.locations.some(
            (el) => el.placeId === item.placeId
          )
            ? [...result, item]
            : result,
        [] as Location[]
      );

      setPickUpInputValue(tada[0]);
      setDropOffInputValue(tada[1]);
    }
  }, [haveDefaultValue]);

  useEffect(() => {
    if (haveDefaultValue && haveDefaultValue.fdprocessedid) {
      console.log("fdprocessedid:", haveDefaultValue.fdprocessedid);
    }
  }, [haveDefaultValue]);

  function click() {
    if (!pickUpInputValue) {
      setOriginFocus(true);
    } else if (!dropOffInputValue) {
      setDropOffFocused(true);
    } else if (!dateValue) {
      setDateFocused(true);
    }
  }

  const checkButton = () => {
    if (!haveDefaultValue || !btnType) {
      return (
        <div>
          <FetchTransferPricesButton
            sendDataToParent={click}
            origin={pickUpInputValue}
            destination={dropOffInputValue}
            date={dateValue}
            guests={guestValue}
            onlyGuestsChanged={false}
            checkUpdates={checkUpdates}
            btnType={btnType}
            setIsModalOpen={setIsModalOpen}
            label=""
          />
        </div>
      );
    } else if (
      (haveDefaultValue.guests === guestValue &&
        haveDefaultValue.origin?.id !== pickUpInputValue?.id) ||
      haveDefaultValue.destination?.id !== dropOffInputValue?.id
    ) {
      return (
        <FetchTransferPricesButton
          sendDataToParent={click}
          origin={pickUpInputValue}
          destination={dropOffInputValue}
          date={dateValue}
          guests={guestValue}
          onlyGuestsChanged={false}
          checkUpdates={checkUpdates}
          btnType={btnType}
          setIsModalOpen={setIsModalOpen}
        />
      );
    } else if (haveDefaultValue.guests !== guestValue) {
      return (
        <FetchTransferPricesButton
        sendDataToParent={click}
          label={"Update Route"}
          origin={pickUpInputValue}
          destination={dropOffInputValue}
          date={dateValue}
          guests={guestValue}
          onlyGuestsChanged={true}
          checkUpdates={checkUpdates}
          btnType={btnType}
          setIsModalOpen={setIsModalOpen}
        />
      );
    }
  };

  const switchLocationInput = () => {
    setSwitchInput(!switchInput);
  };

  const renderForm = () => {
    return (
      <form className="w-full text-white relative mt-4 md:mt-8 flex flex-col md:flex-row md:items-center rounded-3xl md:rounded-full shadow-2xl bg-[#111828] divide-y divide-neutral-700  dark:divide-neutral-700  md:divide-y-0">
        <LocationInput
          placeHolder={!switchInput ? "Pick-Up" : "Drop-Off"}
          desc="Athens Airport, Piraeus Port Etc.?"
          autoFocus={!switchInput ? originFocus : dropOffFocus}
          defaultValue={!switchInput ? pickUpInputValue : dropOffInputValue}
          onChange={(e) => {
            !switchInput ? setPickUpInputValue(e) : setDropOffInputValue(e);
          }}
          onInputDone={() => setDropOffFocused(btnType === null)}
          onFocusChange={(e) => {
            !switchInput ? setOriginFocus(e) : setDropOffFocused(e);
          }}
          Id="transfer1"
        />

        <LocationInput
          placeHolder={switchInput ? "Pick-Up" : "Drop-Off"}
          desc="Athens Airport, Piraeus Port Etc.?"
          defaultValue={switchInput ? pickUpInputValue : dropOffInputValue}
          autoFocus={switchInput ? originFocus : dropOffFocus}
          onChange={(e) => {
            switchInput ? setPickUpInputValue(e) : setDropOffInputValue(e);
          }}
          onInputDone={() => setDateFocused(btnType === null)}
          onFocusChange={(e) => {
            switchInput ? setOriginFocus(e) : setDropOffFocused(e);
          }}
          Id="transfer2"
        />

        <ExperiencesDateSingleInput
          defaultValue={dateValue}
          onChange={(date) => setdateValue(date)}
          defaultFocus={dateFocused}
          onFocusChange={(focus) => {
            setDateFocused(focus);
          }}
        />

        <GuestsInput
          defaultValue={guestValue}
          onChange={(data) => {
            setGuestValue(data);
          }}
        />
        <div className="px-4 py-5 lg:py-0 mr-6">{checkButton()}</div>
        <ModalDialog
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          title={dialogErrorMessage.title}
          description={dialogErrorMessage.description}
        />
      </form>
    );
  };

  return renderForm();
};

export default TransferSearchForm;
