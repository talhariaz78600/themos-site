"use client"
import { Tab } from "@headlessui/react";
import React, { Fragment, useState, useEffect } from "react";
// import { navigate } from "gatsby";
import { useRouter } from "next/navigation"
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import NcImage from "../../../components/NcImage/NcImage";
import StartRating from "../../../components/StartRating";
import SelectStepsForm from "../../VehicleSelection/SelectStepsForm";
import { Dialog, Transition } from "@headlessui/react";
import { FiUser, FiBriefcase } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
// import ButtonClose from "../../../components/Button/";
import { Elements } from "@stripe/react-stripe-js";
import PaymentsPage from "./PaymentsPage";
// import BgGlassmorphism from "AFolder/components/BgGlassmorphism";
import * as generalMethods from "../../../components/GeneralMethods";
import { RiHandCoinLine } from "react-icons/ri";
import { stripePromise } from "../../../components/constants/apiEndpoints";

const CheckOutPage = ({ className = "min-h-screen relative" }) => {
    const [open, setOpen] = useState(false);
    const [showSpinner, setShowSpinner] = useState<any|null>();
    const [activeTab, setActiveTab] = useState('tab1');
    const navigate = useRouter();
    const [totalPayable, setTotalPayable] = useState<any | null>(null);


    const [routeData, setRoutData] = useState<any | null>(null);
    const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
    const [formState, setFormState] = useState<any | null>();
    const [clientSecret, setClientSecret] = useState<any | null>();

    useEffect(() => {
        const routeDetailsAndPrices = generalMethods.getRouteDetailsAndPrice();
        console.log(routeDetailsAndPrices)
        const vehicleDetail = generalMethods.getSelectedVehicle();
        const formData = generalMethods.getCustomerDataForm();
        const secret = generalMethods.getStripeClientSecretKey(vehicleDetail.uuid)

        setRoutData(routeDetailsAndPrices);
        setSelectedVehicle(vehicleDetail);
        setFormState(formData);
        setClientSecret(secret);
    }, []);


    const handleOpenModal = () => {
        setOpen((prev) => !prev);
    };
    let options: any = { weekday: "short", month: "long", day: "numeric" };

    useEffect(() => {
        if (formState) {
            handleTotalPayable();
        }
    }, [formState]);

    const handleTotalPayable = () => {
        let totalExtras = 0;
        formState.extrasArr.map((item: any) => {
            if (!isNaN(item.price)) {
                totalExtras += item.price * item.count;
                return;
            }
        });

        if (selectedVehicle) {
            let pricesObject: any = {
                "oneWayPrice": selectedVehicle.price.toFixed(2),
                "oneWayPrice_card_fee": (selectedVehicle.price * 0.035).toFixed(2),
                "oneWayTotal": (selectedVehicle.price * 1.035).toFixed(2),

                "twoWayPrice": (selectedVehicle.price * 2).toFixed(2),
                "twoWayPrice_card_fee": (selectedVehicle.price * 2 * 0.035).toFixed(2),
                "twoWayTotal": (selectedVehicle.price * 2 * 1.035).toFixed(2),
            }

            setTotalPayable(pricesObject)
        }
    };

    const transferDetails = () => {
        if (routeData.tourTitle == null) {
            return (
                <div className="relative pt-5">
                    <div
                        onClick={() => {
                            navigate.push(`/vehicle-selection`);
                        }}
                        className="absolute cursor-pointer text-neutral-400 dark:text-neutral-400 flex items-center right-0"
                    >
                        <span className="text-xs">Edit</span>
                        <AiOutlineEdit size={18} />
                    </div>
                    {/*Transfer date*/}
                    <div className="w-full text-center text-xs text-neutral-500 space-x-3">
                        <span> {new Date(routeData.date).toLocaleDateString("default", options)} </span>
                        <span>{formState.landingTime}</span>
                    </div>

                    {/* Transfer Locations */}
                    <div className="w-full mx-auto mt-2">
                        <div className="flex pb-3 w-full justify-between">
                            <div className="flex-1">
                                <div
                                    className="w-2 h-2 bg-green-300 mx-auto rounded-full text-lg text-white flex items-center">
                                    <span className="text-white text-center w-full">
                                        <em className="fa fa-check w-full fill-current white"></em>
                                    </span>
                                </div>
                            </div>

                            <div className="w-full align-center items-center align-middle content-center flex">
                                <div
                                    className="w-full bg-green-300 rounded items-center align-middle align-center flex-1">
                                    <div
                                        className="bg-green-light text-xs leading-none text-center text-grey-darkest rounded "
                                        style={{ width: "100%", padding: "0.2% 0%" }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex-1">
                                <div
                                    className="w-2 h-2 bg-green-300 mx-auto rounded-full text-lg text-white flex items-center">
                                    <span className="text-white text-center w-full">
                                        <em className="fa fa-check w-full fill-current white"></em>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex content-center justify-between w-full">
                            <div className="text-sm text-start">{routeData.origin.title}</div>
                            <div className="text-sm text-end">
                                {routeData.destination.title ?? routeData.origin.title}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="relative pt-5">
                    <div className="text-sm text-center pb-6">{routeData.tourTitle}</div>

                    {/*Transfer date*/}
                    <div className="w-full text-center text-xs text-neutral-500 space-x-3">
                        <span>
                            {new Date(routeData.date).toLocaleDateString("default", options)}
                        </span>
                        <span>
                            {new Date(formState.landingTime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    </div>

                    {/* Transfer Locations */}
                    <div className="w-full mx-auto mt-2">
                        <div className="flex pb-3 w-full justify-between">
                            <div className="flex-1">
                                <div
                                    className="w-2 h-2 bg-green-300 mx-auto rounded-full text-lg text-white flex items-center">
                                    <span className="text-white text-center w-full">
                                        <em className="fa fa-check w-full fill-current white"></em>
                                    </span>
                                </div>
                            </div>

                            <div className="w-full align-center items-center align-middle content-center flex">
                                <div
                                    className="w-full bg-green-300 rounded items-center align-middle align-center flex-1">
                                    <div
                                        className="bg-green-light text-xs leading-none text-center text-grey-darkest rounded "
                                        style={{ width: "100%", padding: "0.2% 0%" }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex-1">
                                <div
                                    className="w-2 h-2 bg-green-300 mx-auto rounded-full text-lg text-white flex items-center">
                                    <span className="text-white text-center w-full">
                                        <em className="fa fa-check w-full fill-current white"></em>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex content-center justify-between w-full pb-6 sm:pb-0">
                            <div className="text-sm text-start pl-2 sm:pl-0">
                                {routeData.origin.title}
                            </div>


                            <div className="text-sm text-end pr-2 sm:pr-0">
                                {routeData.destination.title ?? routeData.origin.title}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    const renderSidebar = () => {
        return (
            <div
                className="w-full flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-8 mt-5  px-4">
                {/* vehicle details */}
                <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="flex-shrink-0 w-40">
                        <div className="object-contain image-paypage mt-5">
                            <NcImage src={selectedVehicle.Image.url} className="pl-1 w-3 h-3" id="checkout page" />
                        </div>
                    </div>
                    <div className="py-5 px-5 space-y-3">
                        <div>
                            <span className="text-sm text-neutral-400 dark:text-neutral-400 line-clamp-1">
                                {selectedVehicle.category}
                            </span>
                            <span className="text-base font-medium mt-1 block">
                                {selectedVehicle.name}
                            </span>
                        </div>
                        <span className="text-sm text-neutral-400 dark:text-neutral-400 flex items-center">
                            <FiUser size={18} />
                            <span className="px-3">
                                Seats {selectedVehicle.MaxPeople} people
                            </span>
                        </span>
                        <span className="text-sm text-neutral-400 dark:text-neutral-400 flex items-center">
                            <FiBriefcase size={18} />
                            <span className="px-3">
                                Fits {selectedVehicle.MaxLuggage} suitcases
                            </span>
                        </span>
                        <div className="w-10 border-b border-neutral-700  dark:border-neutral-700"></div>
                        <StartRating reviewCount={selectedVehicle.reviews} point={selectedVehicle.rating} /></div>
                </div>

                {transferDetails()}

                {formState.pickUpTime && (
                    <div className="relative pb-5">
                        <div
                            className="cursor-pointer text-neutral-600 dark:text-neutral-400 flex justify-center right-0">
                            <span className="text-md pb-2">Return</span>
                        </div>
                        {/*Transfer date*/}
                        <div className="w-full text-center text-xs text-neutral-500 space-x-3">
                            <span>
                                {new Date(formState.returnDate).toLocaleDateString(
                                    "default",
                                    options
                                )}
                            </span>
                            <span>
                                {new Date(formState.pickUpTime).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>

                        {/* Transfer Locations */}
                        <div className="w-full mx-auto mt-2 mb-4 pb-4">
                            <div className="flex pb-3 w-full justify-between">
                                <div className="flex-1">
                                    <div
                                        className="w-2 h-2 bg-green-300 mx-auto rounded-full text-lg text-white flex items-center">
                                        <span className="text-white text-center w-full">
                                            <em className="fa fa-check w-full fill-current white"></em>
                                        </span>
                                    </div>
                                </div>

                                <div className="w-full align-center items-center align-middle content-center flex">
                                    <div
                                        className="w-full bg-green-300 rounded items-center align-middle align-center flex-1">
                                        <div
                                            className="bg-green-light text-xs leading-none text-center text-grey-darkest rounded "
                                            style={{ width: "100%", padding: "0.2% 0%" }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div
                                        className="w-2 h-2 bg-green-300 mx-auto rounded-full text-lg text-white flex items-center">
                                        <span className="text-white text-center w-full">
                                            <em className="fa fa-check w-full fill-current white"></em>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex content-center justify-between w-full">
                                <div className="text-sm text-start">
                                    {routeData.destination.title ?? routeData.origin.title}
                                </div>

                                <div className="text-sm text-end">{routeData.origin.title} </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

                <div className="space-y-1">
                    {/* Customer Detail */}
                    <div className="flex w-full justify-between items-start mb-4 pb-2">
                        <div className="flex flex-col items-start space-y-1">
                            <span>{formState.fName} {formState.lName}</span>

                            <span
                                className="text-neutral-600 dark:text-neutral-400 text-sm">{formState.email}</span>
                            <span
                                className="text-neutral-600 dark:text-neutral-400 text-sm">+{formState.countryCode}-{formState.phoneNumber}</span>
                        </div>
                        <div
                            className="cursor-pointer text-neutral-600 dark:text-neutral-400 flex items-center right-0"
                            onClick={() => navigate.push(`/customer-data-form`)}
                        >
                            <span className="text-xs">Edit</span>
                            <AiOutlineEdit size={18} />
                        </div>
                    </div>
                    <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400 text-sm w-full pt-4">
                        <span className="flex-1">Total Passengers:</span>
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">
                            {routeData.guests}
                        </span>
                    </div>
                    <div className="text-neutral-600 dark:text-neutral-400 text-sm">
                        <span className="flex-1">
                            {formState.extrasArr.map((item: any, index: any) => (
                                <div className={item.checked ? "pb-1" : "pb-0"} key={index}>
                                    {item.checked && (
                                        <div className="flex items-center justify-between space-x-3">
                                            <span className="flex-1">{item.label}: </span>
                                            {index !== 2 && item.count && (
                                                <span className="text-neutral-900 dark:text-neutral-100">
                                                    {item.count}
                                                </span>
                                            )}
                                            {item.note && (
                                                <span className="text-neutral-900 dark:text-neutral-100">
                                                    {item.note}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </span>
                    </div>
                </div>

                {/* Price Detail */}
                <div className="flex flex-col space-y-4">
                    <h3 className="text-2xl font-semibold">Price detail</h3>
                    <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                        <span>Service charge</span>
                        <span>€ {getPrice("netPrice")}</span>
                    </div>
                    <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                        <span>Credit Card Fees</span>
                        <span> € {getPrice("fees")}</span>
                    </div>
                    <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                    <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>€ {getPrice("totalPrice")}</span>
                    </div>
                </div>
            </div>
        );
    };

    const getPrice = (type: any) => {
        if (type === "totalPrice") {
            if (formState.addReturn) {
                return activeTab !== "tab1" ? totalPayable?.twoWayPrice : totalPayable?.twoWayTotal;
            } else {
                return activeTab !== "tab1" ? totalPayable?.oneWayPrice : totalPayable?.oneWayTotal
            }

        } else if (type === "fees") {
            if (activeTab !== "tab1") {
                return 0;
            } else {
                if (formState.addReturn) {
                    return totalPayable?.twoWayPrice_card_fee
                } else {
                    return totalPayable?.oneWayPrice_card_fee
                }
            }

        } else if (type === "netPrice") {
            if (formState.addReturn) {
                return totalPayable?.twoWayPrice
            } else {
                return totalPayable?.oneWayPrice
            }
        }
    }

    const renderModal = () => {
        return (
            <Transition appear show={open} as={Fragment}>
                <Dialog
                    as="div"
                    onClose={() => handleOpenModal()}
                    className=" fixed inset-0 z-50"
                >
                    <div className="min-h-screen overflow-y-scroll px-1 text-center md:mx-8">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-75"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-75"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-10 dark:bg-opacity-40" />
                        </Transition.Child>
                        <span className="inline-block h-screen align-middle" aria-hidden="true"> &#8203; </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-75"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-75"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div
                                className={`w-full md:w-5/12 inline-block mt-2 mb-14 text-left align-middle transition-all transform bg-white border border-black border-opacity-5 shadow-xl rounded-2xl sm:my-8 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-900 dark:text-neutral-300`}
                            >
                                <div className="py-2 flex flex-col items-start relative">
                                    <Dialog.Title className="flex justify-end w-full">
                                        {/*<h2 className="text-md font-semibold">About this category</h2>*/}
                                        {/* <ButtonClose onClick={() => handleOpenModal()}>
                                            Close
                                        </ButtonClose> */}
                                    </Dialog.Title>
                                    <Dialog.Description
                                        className="w-full overflow-y-scroll customScrollbar"
                                        style={{ height: "80vh" }}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center mx-3 ">
                                            <div className="flex-shrink-0 w-full sm:w-40">
                                                <div
                                                    className="object-contain aspect-w-2.2 aspect-h-1 sm:aspect-h-4 rounded-2xl overflow-hidden">
                                                    <NcImage
                                                        src={selectedVehicle.Image.url}
                                                        className="pl-1"
                                                        id="checkout Page 2 "
                                                    />
                                                </div>
                                            </div>
                                            <div className="pt-4 pb-5 sm:px-5 space-y-3">
                                                <div>
                                                    <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                                                        {selectedVehicle.CategoryName}
                                                    </span>
                                                    <span className="text-base font-medium mt-1 block">
                                                        {selectedVehicle.VehicleName}
                                                    </span>
                                                </div>
                                                <span
                                                    className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center">
                                                    <FiUser size={18} />
                                                    <span className="px-3">
                                                        Seats {selectedVehicle.MaxPeople} people
                                                    </span>
                                                </span>
                                                <span
                                                    className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center">
                                                    <FiBriefcase size={18} />
                                                    <span className="px-3">
                                                        Fits {selectedVehicle.MaxLuggage} suitcases
                                                    </span>
                                                </span>
                                                <div
                                                    className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
                                                <StartRating />
                                            </div>
                                        </div>
                                        {/* Transfer Detail */}
                                        {transferDetails()}
                                        {/**/}
                                        {formState.pickUpTime && (
                                            <div className="relative pb-5 mb-2">
                                                <div
                                                    className="cursor-pointer text-neutral-600 dark:text-neutral-400 flex justify-center right-0">
                                                    <span className="text-md pb-2">Return</span>
                                                </div>
                                                {/*Transfer date*/}
                                                <div className="w-full text-center text-xs text-neutral-500 space-x-3">
                                                    <span>
                                                        {new Date(formState.returnDate).toLocaleDateString(
                                                            "default",
                                                            options
                                                        )}
                                                    </span>
                                                    <span>
                                                        {new Date(formState.pickUpTime).toLocaleTimeString(
                                                            [],
                                                            {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            }
                                                        )}
                                                    </span>
                                                </div>

                                                {/* Transfer Locations */}
                                                <div className="w-full mx-auto mt-2 mb-4 pb-4">
                                                    <div className="flex pb-3 w-full justify-between">
                                                        <div className="flex-1">
                                                            <div
                                                                className="w-2 h-2 bg-green-300 mx-auto rounded-full text-lg text-white flex items-center">
                                                                <span className="text-white text-center w-full">
                                                                    <em className="fa fa-check w-full fill-current white"></em>
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="w-full align-center items-center align-middle content-center flex">
                                                            <div
                                                                className="w-full bg-green-300 rounded items-center align-middle align-center flex-1">
                                                                <div
                                                                    className="bg-green-light text-xs leading-none text-center text-grey-darkest rounded "
                                                                    style={{ width: "100%", padding: "0.2% 0%" }}
                                                                ></div>
                                                            </div>
                                                        </div>

                                                        <div className="flex-1">
                                                            <div
                                                                className="w-2 h-2 bg-green-300 mx-auto rounded-full text-lg text-white flex items-center">
                                                                <span className="text-white text-center w-full">
                                                                    <em className="fa fa-check w-full fill-current white"></em>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex content-center justify-between w-full">
                                                        <div className="text-sm text-start">
                                                            {routeData.destination.title}
                                                        </div>

                                                        <div className="text-sm text-end">
                                                            {routeData.origin.title}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {/**/}
                                        <div className="border-b border-neutral-200 dark:border-neutral-700 mx-3"></div>

                                        <div className="space-y-1 py-4 mx-3">
                                            {/* Customer Detail */}
                                            <div className="flex w-full justify-between items-start py-2">
                                                <div className="flex flex-col items-start space-y-1">
                                                    <span>
                                                        {formState.fName} {formState.lName}
                                                    </span>
                                                    <span className="text-neutral-400 dark:text-neutral-400 text-sm">
                                                        {formState.email}
                                                    </span>
                                                    <span className="text-neutral-400 dark:text-neutral-400 text-sm">
                                                        +{formState.countryCode}-{formState.phoneNumber}
                                                    </span>
                                                </div>
                                                <div
                                                    className="cursor-pointer text-neutral-400 dark:text-neutral-400 flex items-center right-0"
                                                    onClick={() => navigate.push(`/customer-data-form`)}
                                                >
                                                    <span className="text-xs">Edit</span>
                                                    <AiOutlineEdit size={18} />
                                                </div>
                                            </div>
                                            <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

                                            <div
                                                className="flex justify-between text-sm w-full pt-2">
                                                <span className="flex-1">Total Passengers:</span>
                                                <p className="text-white passengers">
                                                    {routeData.guests}
                                                </p>
                                            </div>
                                            <div className="text-neutral-600 dark:text-neutral-400 text-sm">
                                                <span className="flex-1">
                                                    {formState.extrasArr.map((item: any, index: any) => (
                                                        <div
                                                            className={item.checked ? "pb-1" : "pb-0"}
                                                            key={index}
                                                        >
                                                            {item.checked && (
                                                                <div className="flex items-center justify-between space-x-3">
                                                                    <span className="flex-1">{item.label}: </span>
                                                                    {index !== 2 && item.count && (
                                                                        <span className="text-neutral-900 dark:text-neutral-100">
                                                                            {item.count}
                                                                        </span>
                                                                    )}
                                                                    {item.note && (
                                                                        <span className="text-neutral-900 dark:text-neutral-100">
                                                                            {item.note}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Price Detail */}
                                        <div className="flex flex-col py-4 space-y-4 mx-3">
                                            <h3 className="text-2xl font-semibold">Price detail</h3>
                                            <div
                                                className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                                                <span>Service charge</span>
                                                <span>€ {getPrice("netPrice")}</span>
                                            </div>
                                            <div
                                                className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                                                <span>Credit Card Fees</span>
                                                € {getPrice("fees")}
                                            </div>
                                            <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                                            <div className="flex justify-between font-semibold">
                                                <span>Total</span>
                                                <span>€ {getPrice("totalPrice")}</span>
                                            </div>
                                        </div>
                                    </Dialog.Description>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        );
    };

    const renderMain = () => {
        return (
            <>
                <div
                    className="w-full flex mt-4 flex-col sm:rounded-2xl border border-neutral-700 dark:border-neutral-700 space-y-4 px-2 sm:p-6 xl:p-8 shadow-2xl bg-[#101726] dark:bg-neutral-900">
                    <div className="relative">
                        <span
                            onClick={() => handleOpenModal()}
                            className="block viewmodalbutton underline  mt-4 cursor-pointer"
                        >
                            View booking details
                        </span>
                    </div>
                    <div className="space-y-8">
                        <h3 className="text-2xl font-semibold">Pay with</h3>
                        <div>{renderTabs()}</div>
                    </div>
                </div>
            </>
        );
    };

    const renderTabs = () => {
        return (
            <Tab.Group>
                <Tab.List className="flex">
                    <Tab as="button" onClick={() => setActiveTab("tab1")} >
                        {({ selected }) => (
                            <button
                                className={`px-4 py-2.5 rounded-full focus:outline-none ${selected
                                    ? "bg-[#101726] text-white"
                                    : "text-neutral-400"
                                    }`}
                            >
                                Card
                            </button>
                        )
                        }
                    </Tab>
                    <Tab as="button" onClick={() => setActiveTab("tab2")} >
                        {({ selected }) => (
                            <button
                                className={`px-4 py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${selected
                                    ? "bg-[#101726] text-white"
                                    : " text-neutral-400"
                                    }`}
                            >
                                Cash
                            </button>
                        )
                        }
                    </Tab>
                </Tab.List>

                <div className="w-14 border-b border-neutral-200 my-5"></div>
                <Tab.Panels className="border-transparent focus:border-transparent focus:ring-0 noFocus">
                    <Tab.Panel className="space-y-5 border-transparent focus:border-transparent focus:ring-0 noFocus">
                        {renderStripeTab()}
                    </Tab.Panel>
                    <Tab.Panel className="space-y-5 border-transparent focus:border-transparent focus:ring-0 noFocus">
                        {renderCashTab()}
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        );
    };

    const cashBookNowButton = () => {
        navigate.push(`/pay-done`)
    }

    const renderCashTab = () => {
        return (<div>
            <div className="w-full flex flex-col items-center justify-between">
                <span className="text-lg text-neutral-500 block pb-10">
                    Complete your reservation now and pay cash to your driver at your pick-up.
                </span>
                <div className="pt-4">
                    <ButtonPrimary onClick={() => cashBookNowButton()}>Confirm and book for
                        € {getPrice("totalPrice")}</ButtonPrimary>
                </div>
                <div
                    className="flex items-center justify-between shadow-2xl dark:shadow-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mt-10 mb-2 px-4 py-2 space-x-2 font-light text-sm text-white">
                    <RiHandCoinLine size={18} />
                    <span>Cancel 24 hours prior the service and get full refund.</span>
                    {/*<a className="border-b border-white cursor-pointer">Details</a>*/}
                </div>
            </div>
        </div>

        )
    }

    const renderStripeTab = () => {
        const options: any = {
            clientSecret: clientSecret.clientSecret,
            appearance: {
                theme: "night",
            },
        };
        return (
            <>
     
                {options.clientSecret && (
                    <Elements stripe={stripePromise} options={options}>
                        <PaymentsPage
                            setShowSpinner={(e) => setShowSpinner(true)}
                            price={getPrice("totalPrice")}
                            clientSecret={clientSecret.clientSecret}
                        />
                    </Elements>
                )}
            </>
        );
    };

    return (
        <>
            <div className={`nc-CheckOutPage ${className}`} data-nc-id="CheckOutPage">
                {/* <BgGlassmorphism /> */}
                {/* Progress Bar */}
                <div className="relative sm:container">
                    <SelectStepsForm
                        className="pt-4"
                        stepNumber={3}
                        stepLabel="Payment"
                       
                        errorState={{}}
                        arrFlightNumber=""
                        landingTime=""
                        dropAddress=""
                        addReturn={false}
                        depFilghtNumber=""
                        pickUpTime=""
                        returnDate=""
                        pickUpAddress=""
                        onArrFlightNumberChange={() =>{}
                            
                        }
                        onLandingTimeChange={() =>{}
                            
                        }
                        onDropAddressChange={() =>{}
                            
                        }
                        onAddReturnChange={() =>{}
                           
                        }
                        onDepFilghtNumberChange={() =>{}
                            
                        }
                        onPickUpTimeChange={() =>{}
                            
                        }
                        onReturnDateChange={() =>{}
                           
                        }
                        onPickUpAddressChange={() =>{}
                            
                        }
                        vehicle={""}
                        transferRouteData={""}
                    />
                </div>
                <main className="container pay-main pt-11 pb-24 lg:pb-32 flex flex-col-reverse lg:flex-row relative">
                    {clientSecret && (
                        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">
                            {renderMain()}
                        </div>
                    )}
                    {selectedVehicle && formState && (
                        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
                    )}
                </main>
            </div>
            {selectedVehicle && formState && (
                <div className="flex justify-center">{renderModal()}</div>
            )}
        </>
    );
}
    ;

export default CheckOutPage;
