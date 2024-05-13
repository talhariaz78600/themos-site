"use client"
import React, { useState } from "react";
import axios from "axios";
import { REACT_APP_REST_RESOURCE_BASE_END_POINT } from "../components/constants/apiEndpoints";
import * as generalMethod from "./GeneralMethods";
import { useRouter } from 'next/navigation'
import moment, { Moment } from "moment";
interface FetchTransferPricesButtonProps {
    sendDataToParent: () => void;
    origin: { id: string; title: string; subtitle: string } | null;
    destination: { id: string; title: string; subtitle: string } | null;
    date: Moment | null;
    guests: number;
    onlyGuestsChanged: boolean;
    label?: string;
    checkUpdates: () => void;
    btnType: string;
    setIsModalOpen: (isOpen: boolean) => void;
}

const FetchTransferPricesButton: React.FC<FetchTransferPricesButtonProps> = ({
    sendDataToParent,
    origin,
    destination,
    date,
    guests,
    onlyGuestsChanged,
    label,
    checkUpdates,
    btnType,
    setIsModalOpen,
}) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const buttonClick = () => {
        setLoading(true);
        console.log(origin, destination, date);
        if (!origin || !destination || !date) {
            sendDataToParent();
            setLoading(false);
        } else if (onlyGuestsChanged) {
            const localTransferData = generalMethod.getRouteDetailsAndPrice();
            // generalMethod.saveRouteAndPrices(origin, destination, null, date, guests, localTransferData.fetchedPrices);
            if (btnType) {
                checkUpdates();
            }
            setLoading(false);
        } else {
            let data = JSON.stringify({
                transferDateTime: date,
                originPlaceId: origin.id,
                destinationPlaceId: destination.id,
                adultGuests: guests,
            });
            axios
                .post(`${REACT_APP_REST_RESOURCE_BASE_END_POINT}/prices/placeId`, data, {
                    headers: { "Content-Type": "application/json" },
                })
                .then((response) => {
                    console.log(response);
                    generalMethod.saveRouteAndPrices(origin, destination, null, date, guests, response);
                    console.log("this is working")
                    if (btnType) {
                        checkUpdates();
                    }
                    setLoading(false);
                    router.push('/vehicle-selection')

                })
                .catch((err) => {
                    setLoading(false);
                    setIsModalOpen(true);
                });
        }
    };

    return (
        <>
            {label != "" ? (
                <button
                    onClick={buttonClick}
                    type="button"
                    className="h-12 md:h-12 md:px-4 w-full rounded-lg bg-blue-500 mx-5 hover:bg-blue-700 flex items-center justify-center text-neutral-50 focus:outline-none text-base font-semibold"
                >
                    {!loading ? (
                        <span>{label}</span>
                    ) : (
                        <div
                            className="inline-block h-6 w-6 animate-spin rounded-full border-3 border-solid border-current border-e-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status">
                            <span
                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            >Loading...</span
                            >
                        </div>
                    )}
                </button>
            ) : (
                <button
                    onClick={buttonClick}
                    type="button"
                    className="h-14 mx-3 md:h-16 w-full md:w-16 rounded-full bg-blue-700 hover:bg-blue-900 flex items-center justify-center text-neutral-50 focus:outline-none"
                >
                    <span className="mr-3 md:hidden">Search</span>
                    {!loading ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    ) : (
                        <div
                            className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status">
                            <span
                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            >Loading...</span>
                        </div>
                    )}
                </button>
            )}
        </>
    );
};

export default FetchTransferPricesButton;
