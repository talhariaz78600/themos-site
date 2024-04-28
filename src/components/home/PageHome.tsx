// "use client"
import React from 'react'
import SectionHero from './SectionHero';
import SectionHowItWork from '../SectionHowItWork/SectionHowItWork';
import SectionOurFeatures from '../SectionOurFeatures/SectionOurFeatures';
import SectionCarouselFleet from './SectionCarouselFleet';

function PageHome() {
    // const fetchData = async () => {
    //     try {
    //         const response = await fetch("https://endless-primate-great.ngrok-free.app", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 query: `
    //             query {
    //               allStrapiTransfers(filter: { showOnHomePage: { eq: true } }) {
    //                 nodes {
    //                   name: Title
    //                   strapiId
    //                   href
    //                   transferPrice
    //                   MainImage {
    //                     url
    //                   }
    //                 }
    //               }
    //               allStrapiTours(filter: { showOnHomePage: { eq: true } }) {
    //                 nodes {
    //                   address: tags
    //                   title
    //                   link: href
    //                   id
    //                   galleryImgs {
    //                     url
    //                   }
    //                   prices {
    //                     price
    //                   }
    //                 }
    //               }
    //               allStrapiCarouselFleets(sort: { fields: OrderInCarousel, order: ASC }) {
    //                 nodes {
    //                   title: VehicleCategoryName
    //                   galleryImgs: Images {
    //                     url
    //                   }
    //                   OrderInCarousel
    //                   id: strapiId
    //                 }
    //               }
    //             }
    //           `,
    //             }),
    //         });

    //         // if (!response.ok) {
    //         //     throw new Error(`HTTP error! Status: ${response.status}`);
    //         // }

    //         const responseData = await response.json();
    //         console.log(responseData);
    //     } catch (error) {
    //         console.error("Error fetching GraphQL data:", error);
    //     }
    // };

    // // Call fetchData function when the component is rendered
    // fetchData();

    return (
        <div>
            <div className='nc-PageHome relative overflow-hidden'>
                <div id="transfers" className="container relative space-y-24  mb-24 lg:space-y-32 lg:mb-32">
                    <SectionHero />

                    <div className="relative py-16" id="ourFleet">
                        <div className="nc-BackgroundSection absolute inset-y-0 w-screen xl:max-w-[1340px] 2xl:max-w-screen-2xl left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-0 bg-black bg-opacity-20 " data-nc-id="BackgroundSection"></div>
                        <SectionCarouselFleet
                            stayListings={[]}
                            heading="Our Fleet"
                            subHeading="Find the right vehicle to feet your every need"
                        />
                    </div>

                    <SectionOurFeatures />
                    <div className="relative py-16">
                        <div className="nc-BackgroundSection absolute inset-y-0 w-screen xl:max-w-[1340px] 2xl:max-w-screen-2xl left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-0 bg-black bg-opacity-20 " data-nc-id="BackgroundSection"></div>
                        <SectionHowItWork />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PageHome;
