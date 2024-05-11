import React from 'react';
import TourDetailPage from '@/components/tours/TourDetailPage';

const page = async (context: { params: { day?: string, title?: string } }) => {
    const {day,title}=context.params;
    const fetchData1 = async () => {
        try {
            const res = await fetch("https://endless-primate-great.ngrok-free.app/tours", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
                ,
                cache: 'force-cache'
            });
            const response = await res.json();

            
            return response;
        } catch (error) {
            console.error("Error fetching GraphQL data:", error);
            return [];
        }
    };

    const data1 = await fetchData1();
                const Data = data1.map((vehicle: any) => ({
                address: vehicle.tags,
                title: vehicle.title,
                href: vehicle.href,
                galleryImgs: vehicle.galleryImgs.map((image: any) => image.url),
                prices: vehicle.prices.map((i: any) => i.price),
                id: vehicle.id

            }));
    const tour:any=data1.find((item:any)=>item.href===`${day}/${title}`)
    // console.log(tour);

    return (
        <div>
            <TourDetailPage  tour={tour} suggestedTours={Data} />
        </div>
    );
}

export default page;
