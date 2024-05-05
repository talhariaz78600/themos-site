"use client"
// src/components/GeneralMethods.tsx
import { Moment } from "moment";
// import {useRouter} from "next/navigation"
// const router = useRouter();
export const getRouteDetailsAndPrice = () => {
    if (typeof window !== 'undefined') {
        let routeDetailsAndPrices = JSON.parse(localStorage.getItem('routeDetailsAndPrices') || 'null');

        if (
            !routeDetailsAndPrices ||
            !routeDetailsAndPrices.origin ||
            !routeDetailsAndPrices.destination ||
            !routeDetailsAndPrices.date ||
            !routeDetailsAndPrices.guests ||
            !routeDetailsAndPrices.fetchedPrices
        ) {
            alert('Please Check The Selected Time. It must be at least one hour later.');
            localStorage.removeItem('selectedVehicleData');
            // Redirect to the homepage if necessary
            // import { useRouter } from 'next/router';
            
        }

        return routeDetailsAndPrices;
    }

    return null; // Return default value if localStorage is not available
};

export const getSelectedVehicle = () => {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem('selectedVehicle') || 'null');
    }

    return null;
};

export const getCustomerDataForm = () => {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem('formState') || 'null');
    }

    return null;
};

export const saveStripeClientSecretKey = (response: any, selectedVehicleUuid: string) => {
    if (typeof window !== 'undefined') {
        let saveOnLocal = JSON.stringify({
            clientSecret: response.data,
            vehicleUuid: selectedVehicleUuid,
        });
        localStorage.setItem('clientSecret', saveOnLocal);
    }
};

export const getStripeClientSecretKey = (selectedVehicleUuid: string) => {
    if (typeof window !== 'undefined') {
        let stripeSecretKey = JSON.parse(localStorage.getItem('clientSecret') || 'null');
        if (stripeSecretKey && stripeSecretKey.vehicleUuid === selectedVehicleUuid) {
            return stripeSecretKey;
        }
    }

    return null;
};

export const saveRouteAndPrices = (
    origin: { id: string; title: string; subtitle: string },
    destination: { id: string; title: string; subtitle: string },
    tourTitle: string|null,
    date: Moment,
    guests: number,
    apiResponse: { data: any }
) => {
    if (typeof window !== 'undefined') {
        let saveOnLocal = JSON.stringify({
            origin: {
                id: origin.id,
                title: origin.title,
                subtitle: origin.subtitle,
            },
            destination: {
                id: destination?.id,
                title: destination?.title,
                subtitle: destination?.subtitle,
            },
            tourTitle: tourTitle,
            date: date,
            guests: guests,
            fetchedPrices: apiResponse.data,
        });

        localStorage.setItem('routeDetailsAndPrices', saveOnLocal);
    }
};

export const saveSelectedVehicle = (selectedVehicle: any) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('selectedVehicle', JSON.stringify(selectedVehicle));
    }
};

export const saveBookingConfirmation = (savedTransfer: any) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('bookingConfirmation', savedTransfer);
    }
};

export const fetchBookingConfirmation = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('bookingConfirmation');
    }

    return null;
};

// Add other utility functions as needed...
