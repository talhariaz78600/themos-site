// import {loadStripe} from "@stripe/stripe-js";
import {GiBattleship, GiCommercialAirplane} from "react-icons/gi";
import React, {FC} from "react";


const production = "https://certain-corgi-merely.ngrok-free.app" // "http://localhost:8080"

export const REACT_APP_REST_RESOURCE_BASE_END_POINT = process.env.REACT_APP_REST_RESOURCE_BASE_END_POINT || `${production}/api/crm`;

export const REACT_APP_REST_DOMAIN_NAME = process.env.REACT_APP_REST_DOMAIN_NAME_END_POINT || "http://localhost:8000";

// export const stripePromise = loadStripe("pk_test_okk0TZerRWR9ZCyiLFGJ1OYK002vAhrkeS");


// export const REACT_APP_REST_RESOURCE_BASE_END_POINT = process.env.REACT_APP_REST_RESOURCE_BASE_END_POINT || "https://83d6-85-73-238-167.ngrok.io/api/crm";
// export const REACT_APP_REST_RESOURCE_BASE = process.env.REACT_APP_REST_RESOURCE_BASE_END_POINT || "https://83d6-85-73-238-167.ngrok.io";

export const PHONE_NUMBER = "tel:306947484950";
export const EMAIL = "info@tour-greece.gr";

export const globalSearchPlaceholder = [
    {
        placeId: "Athens_Airport",
        id: "ChIJYVzn2RqQoRQRqrPuCt8Vsjg",
        title: "Athens Airport",
        subtitle: 'Athens International Airport "Eleftherios Venizelos", Greece ',
        icon: <GiCommercialAirplane size={25}/>,
    },
    {
        placeId: "Piraeus_Port",
        id: "ChIJW1zvv-u7oRQRTJEbrpSi9jI",
        title: "Piraeus Port",
        subtitle: "Piraeus Port (All ferries and Cruises)",
        icon: <GiBattleship size={25}/>,
    },
    {
        placeId: "Lavrio_Port",
        id: "ChIJw0OVl3H0oRQRKPRZoqtJ6_I",
        title: "Lavrio Port",
        subtitle: "Lavrio Port (All ferries and Cruises)",
        icon: <GiBattleship size={25}/>,
    },
    {
        placeId: "Rafina_Port",
        id: "ChIJg6dE4ZqDoRQRCovmgvTXaFY",
        title: "Rafina Port",
        subtitle: "Rafina Port (All ferries and Cruises)",
        icon: <GiBattleship size={25}/>,
    },
];

export const dialogErrorMessage = {
    title: "An Error Occurred",
    description: "Connection with the server is not established, " +
        "check your internet connection and try again."
}

