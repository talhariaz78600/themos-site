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
                        <SectionCarouselFleet
                            stayListings={[]}
                            heading="Our Fleet"
                            subHeading="Find the right vehicle to feet your every need"
                        />
                    </div>

                    <SectionOurFeatures />
                    <SectionHowItWork />
                </div>
            </div>
        </div>
    )
}
export default PageHome;
