import React from 'react';
import TourMainPage from "../../components/tours/TourMainPage"
import MainNav1 from "../../components/Header/MainNav1"
const page = async () => {
    const fetchData = async () => {
        try {
            const res = await fetch("https://endless-primate-great.ngrok-free.app/carousel-fleets", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: 'force-cache'
            });
            const response = await res.json();
            const fleetData = response.map((vehicle: any) => ({
                title: vehicle.VehicleCategoryName,
                galleryImgs: vehicle.Images.map((image: any) => image.url),
                OrderInCarousel: vehicle.OrderInCarousel,
                id: vehicle.id
            }));
            // console.log(fleetData);
            return fleetData;
        } catch (error) {
            console.error("Error fetching GraphQL data:", error);
            return [];
        }
    };

    const data = await fetchData();

    const fetchData1 = async () => {
        try {
            const res = await fetch("https://endless-primate-great.ngrok-free.app/tours", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: 'force-cache'
            });
            const response = await res.json();
            const fleetData = response.map((vehicle: any) => ({
                address: vehicle.tags,
                title: vehicle.title,
                href: vehicle.href,
                galleryImgs: vehicle.galleryImgs.map((image: any) => image.url),
                prices: vehicle.prices.map((i: any) => i.price),
                id: vehicle.id

            }));
            // console.log(fleetData);
            return fleetData;
        } catch (error) {
            console.error("Error fetching GraphQL data:", error);
            return [];
        }
    };

    const data1 = await fetchData1();
    // console.log(data1);

    return (
        <div>
            {/* <MainNav1 isTop={false} /> */}
            <TourMainPage tourdata={data1} fleetdata={data} />
        </div>
    );
}

export default page;
