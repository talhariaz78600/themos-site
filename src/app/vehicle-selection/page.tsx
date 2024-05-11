import React from 'react';
import VehicleSelection from '@/AFolder/VehicleSelection/VehicleSelection';
const page =async () => {
    const fetchDa = async () => {
        try {
            const res = await fetch("https://endless-primate-great.ngrok-free.app/vehicle-lists",{
                method: "GET",
                headers: {
                  "Content-Type": "application/json"
                },
                cache: 'force-cache'
              });
              const response=await res.json();
              // console.log(response)
             return response;
        } catch (error) {
            console.error("Error fetching GraphQL data:", error);
            return [];
        }
    };
    const mat= await fetchDa();
    const vehicles = mat.map((item:any) => ({
        EnumId: item.EnumId,
        id: item.id,
        CategoryName: item.CategoryName,
        MaxLuggage: item.MaxLuggage,
        MaxPeople: item.MaxPeople,
        rating: item.rating,
        reviews: item.reviews,
        Image: {
          url: item.Image.url,
          id: item.Image.id
        },
        Carousel_Images: item.Carousel_Images.map((image:any) => ({
          url: image.url,
          id: image.id
        })),
        Order: item.Order,
        VehicleName: item.VehicleName
      }));;
    // console.log(mat);
  return (
    <div>
      <VehicleSelection data={vehicles }/>
    </div>
  );
}

export default page;
