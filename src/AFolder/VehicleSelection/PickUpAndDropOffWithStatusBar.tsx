import React, { useEffect, useState } from "react";
import Input from "../../components/input/Input";
import Label from "../../components/Label/Label";
import { FiClock } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { BsCalendarEvent } from "react-icons/bs";
import CustomTimePicker from "../../components/CustomTimepicker/CustomTimepicker";

const PickUpAndDropOffWithStatusBar = ({
    register,
    errorState,
    transferRouteData,
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
}: any) => {
    const [timeFormat, setTimeFormat] = useState(landingTime);
    const date = new Date(landingTime);

    useEffect(() => {
        const timeFormat = date.getHours() + " : " + date.getMinutes().toString().padStart(2, '0');
        setTimeFormat(timeFormat);
    }, [landingTime]);

    const renderForm = () => {
        return (
            <div className="w-full relative mt-2 px-8 flex flex-col justify-center rounded-lg  shadow-xl dark:shadow-2xl ">
                {/* Progress Bar */}
                <div className="w-full progresvehicalbar-top my-4  bg-white md:h-5 h-3 mb-4 mt-4 rounded-full">
                    <div
                        className="progresvehicalbar-inner to-pink-500 h-3 md:h-5 rounded-full"
                        style={{ width: "66.66%" }}
                    ></div>
                </div>
                {/* Selected Car Area */}
                <div className="flex flex-col justify-between items-start mt-5 pt-4 w-full space-y-2">
                    {/* Transfer Start-End */}
                    <div className="grid grid-cols-1 md:grid-cols-2 md:items-start space-y-8 md:space-y-0 md:py-0 py-4 w-full">
                        <div className="location">
                            <p className="text-sm  text-neutral-500 dark:text-neutral-400 font-normal">
                                Pick Up Location:
                            </p>
                            <p className="text-sm font-semibold">
                                {transferRouteData?.origin.title}
                            </p>
                        </div>
                        <div className="time-input">
                            <div className="w-full relative h-14 flex items-center">
                                <Input
                                    id="a_f_n"
                                    placeholder="arrival flight number"
                                    name="arrFlightNumber"
                                    value={arrFlightNumber}
                                    onChange={onArrFlightNumberChange}
                                />
                                <Label
                                    htmlFor="landingTime"
                                    isError={errorState.landingTime}
                                    className="ml-4 pt-0.5 w-full"

                                    noLabel=""

                                >
                                    <span>Flight Number, Ship Name Etc</span>
                                </Label>
                            </div>
                            <div className="space-y-1 w-full relative">
                                <div className="relative h-14 flex items-center">
                                    <div className="pointer-events-none absolute left-0 px-4 text-gray-400">
                                        {/* <FiClock size={20} className="pointer-events-none" /> */}
                                    </div>
                                    <div className="absolute inset-y-2 left-0 z-20 flex items-center pl-8 w-full">
                                        <CustomTimePicker
                                            value={landingTime}
                                            handleTimeChange={onLandingTimeChange}
                                        />
                                    </div>
                                    {/* <Input
                                        readOnly
                                        id="landingTime"
                                        placeholder="landingTime"
                                        value={landingTime ? timeFormat : ""}
                                        className="px-9 cursor-pointer ml-2"
                                    /> */}
                                    <Label
                                        htmlFor="well"
                                        isError={errorState.landingTime}
                                        className="ml-4 pt-0.5 w-full"
                                        noLabel=""
                                    >
                                       .
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transfer Start-End Input */}
                    <div className="grid grid-cols-1 md:grid-cols-2 md:pt-12 py-4 space-y-8 md:space-y-0 w-full  items-start">
                        <div className="location items-start">
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                                Drop Off Location:
                            </p>
                            <p className="text-sm font-semibold">
                                {transferRouteData?.destination.title ?? transferRouteData?.origin.title}
                            </p>
                        </div>
                        <div className="relative h-14 flex items-center">
                            <Input
                                ref={register}
                                id="drop-address"
                                placeholder="placeholder"
                                name="dropAddress"
                                value={dropAddress}
                                onChange={onDropAddressChange}
                            />
                            <Label htmlFor="drop-address" isError={""}
                                className="ml-4 pt-0.5 w-full"
                                noLabel=""
                            >
                                Drop Of Details
                            </Label>
                        </div>
                    </div>
                </div>

                {/* Return Dock */}
                {
                    addReturn && (
                        <>
                            <div className="relative w-full my-10">
                                <hr className="w-full bg-gray-900" />
                                <span
                                    onClick={onAddReturnChange}
                                    className={`absolute cursor-pointer ${window.innerWidth < 800
                                        ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                        : "top-1/2 right-0 -translate-y-1/2"
                                        } w-max px-2 text-sm font-semibold text-red-500 bg-white dark:bg-neutral-900 flex items-center justify-center space-x-1`}
                                >
                                    <span>Remove Return</span>
                                    <MdClose size={16} style={{ fontWeight: 700 }} />
                                </span>
                            </div>
                            <div className="flex flex-col justify-between items-start py-4 w-full space-y-2">
                                {/* Transfer Start-End */}
                                <div className="grid grid-cols-1 md:grid-cols-2 md:items-start space-y-8 md:space-y-0 md:py-0 py-6 w-full">
                                    <div className="flex flex-row md:flex-col items-start space-x-2 md:space-x-0 space-y-0 md:space-y-2">
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                                            Returning From:
                                        </p>
                                        <p className="text-sm font-semibold">
                                            {transferRouteData?.destination.title}
                                        </p>
                                    </div>
                                    <div className="felx flex-col items-center">
                                        <div className="flex flex-col xl:flex-row justify-between items-end xl:space-x-4 space-y-10 md:space-y-6 xl:space-y-0">
                                            <div className="space-y-1 w-full relative">
                                                <div className="relative h-14 flex items-center">
                                                    <div className="pointer-events-none absolute inset-y-4.5 left-0 px-4 z-20 text-gray-400">
                                                        <BsCalendarEvent
                                                            size={20}
                                                            className="pointer-events-none"
                                                        />
                                                    </div>
                                                    <div className="absolute inset-y-2 left-0 z-20 flex items-center pl-10 w-full">

                                                        <CustomTimePicker
                                                            value={returnDate}
                                                            handleTimeChange={onReturnDateChange}
                                                        />
                                                    </div>
                                                    <Input
                                                        id="returnDate"
                                                        placeholder="returnDate"
                                                        value={
                                                            returnDate
                                                                ? new Date(returnDate).toLocaleDateString()
                                                                : ""
                                                        }
                                                        className="cursor-pointer pl-16"
                                                    />
                                                    <Label
                                                        noLabel={""}
                                                        htmlFor="returnDate"
                                                        isError={errorState.returnDate}
                                                        className="left-10"
                                                    >
                                                        Return Date
                                                    </Label>
                                                </div>
                                            </div>
                                            <div className="space-y-1 w-full relative">
                                                <div className="relative h-14 flex items-center">
                                                    <div className="pointer-events-none absolute inset-y-4.5 left-0 px-4 z-20 text-gray-400">
                                                        <FiClock size={20} className="pointer-events-none" />
                                                    </div>
                                                    <div className="absolute inset-y-2 left-0 z-1 flex items-center pl-8 w-full">
                                                        <CustomTimePicker
                                                            value={pickUpTime}
                                                            handleTimeChange={onPickUpTimeChange}
                                                        />
                                                    </div>
                                                    <Input
                                                        id="pickUpTime"
                                                        placeholder="pickUpTime"
                                                        value={
                                                            pickUpTime
                                                                ? new Date(pickUpTime).toLocaleTimeString([], {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })
                                                                : " "
                                                        }
                                                        className="cursor-pointer pl-16 absolute z-30"
                                                    />
                                                    <Label
                                                        htmlFor="pickUpTime"
                                                        isError={errorState.pickUpTime}
                                                        className="left-10 absolute"
                                                        noLabel={""}
                                                    >
                                                        Pick up time
                                                    </Label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative my-8 h-14 flex items-center">
                                            <Input
                                                id="pickUpAddress"
                                                placeholder="placeholder"
                                                name="pickUpAddress"
                                                value={pickUpAddress}
                                                onChange={onPickUpAddressChange}
                                            />
                                            <Label
                                                htmlFor="pickUpAddress"
                                                isError={errorState.pickUpAddress}
                                                className=""
                                                noLabel=""

                                            >
                                                Pick up address
                                            </Label>
                                        </div>
                                    </div>
                                </div>

                                {/* Transfer Start-End Input */}
                                <div className="grid grid-cols-1 md:grid-cols-2 md:pt-12 py-6 space-y-8 md:space-y-0 w-full  items-start">
                                    <div className="flex flex-row md:flex-col items-start space-x-2 md:space-x-0 space-y-0 md:space-y-2">
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                                            Returning To:
                                        </p>
                                        <p className="text-sm font-semibold">
                                            {transferRouteData?.origin.title}
                                        </p>
                                    </div>
                                    <div className="flex flex-col xl:flex-row justify-between items-end xl:space-x-4 space-y-10 md:space-y-2 xl:space-y-0">
                                        <div className="w-full relative h-14 flex items-center">
                                            <Input
                                                id="depFilghtNumber"
                                                placeholder="Departure flight number"
                                                name="depFilghtNumber"
                                                value={depFilghtNumber}
                                                onChange={onDepFilghtNumberChange}
                                            />
                                            <Label
                                                className="text"
                                                noLabel=""
                                                isError=""
                                                htmlFor="depFilghtNumber">
                                                <span>Departure flight number</span>
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
                <i id="return-toggel"></i>
            </div >
        );
    };

    return renderForm();
};

export default PickUpAndDropOffWithStatusBar;
