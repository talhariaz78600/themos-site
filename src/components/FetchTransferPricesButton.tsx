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
        console.log(origin,destination,date);
        if (!origin || !destination || !date) {
            sendDataToParent();
            setLoading(false);
        } else if (onlyGuestsChanged) {
            const localTransferData = generalMethod.getRouteDetailsAndPrice();
            generalMethod.saveRouteAndPrices(origin, destination, "", date, guests, localTransferData.fetchedPrices);
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
                    generalMethod.saveRouteAndPrices(origin, destination, "", date, guests, response);
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
            {label!="" ? (
                <button
                    onClick={buttonClick}
                    type="button"
                    className="h-12 md:h-12 md:px-4 w-full rounded-lg bg-blue-6000 mx-5 hover:bg-blue-700 flex items-center justify-center text-neutral-50 focus:outline-none text-base font-semibold"
                >
                    {!loading ? (
                        <span>{label}</span>
                    ) : (
                        <svg
                            role="status"
                            className="w-6 h-6 text-gray-400 animate-spin dark:text-gray-400 fill-primary-6000"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
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
                        <svg
                            role="status"
                            className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-400 fill-primary-6000"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                    )}
                </button>
            )}
        </>
    );
};

export default FetchTransferPricesButton;
