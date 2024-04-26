import React from 'react'
import SectionHero from './SectionHero';
import SectionHowItWork from '../SectionHowItWork/SectionHowItWork';
import SectionOurFeatures from '../SectionOurFeatures/SectionOurFeatures';
import SectionCarouselFleet from './SectionCarouselFleet';

function PageHome() {
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
                    <div>
                    <div className="nc-BackgroundSection absolute inset-y-0 w-screen xl:max-w-[1340px] 2xl:max-w-screen-2xl left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-0 bg-black bg-opacity-20 " data-nc-id="BackgroundSection"></div>
                    <SectionHowItWork />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PageHome;
