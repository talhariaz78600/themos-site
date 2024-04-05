import React from 'react'
import SectionHero from './SectionHero'
function PageHome() {
    return (
        <div>
            <div className='nc-PageHome relative overflow-hidden'>
                <div id="transfers" className="container relative space-y-24 mb-24 lg:space-y-32 lg:mb-32">
                    <SectionHero />
                </div>
            </div>
        </div>
    )
}
export default PageHome;
