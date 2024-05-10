
import React, { FC } from "react";
import NcImage from "../NcImage/NcImage";
interface SectionHowItWorkProps {
    className?: string;
    isCenter?: boolean;
}

interface HowItWorkItem {
    id: number;
    img: string;
    title: string;
    desc: string;
}

const SectionHowItWork: FC<SectionHowItWorkProps> = ({ className, isCenter }) => {
    const sectionHowItWorkProps: HowItWorkItem[] = [
        {
            id: 1,
            img: "/HIW1.png",
            title: "Transfers Or Tours",
            desc: "Choose the service you need and select pick-up location, date and number of guests",
        },
        {
            id: 2,
            img: "/HIW2.png",
            title: "Select Your Desired Vehicle",
            desc: "From a plethora of vehicle categories choose the one that suits your needs better",
        },
        {
            id: 3,
            img: "/HIW3.png",
            title: "Contact Details & Payment",
            desc: "Fill in your contact details and complete your payment, after that you will receive a confirmation email from us you are all set",
        },
    ];

    return (
        <div className={`nc-SectionHowItWork ${className}  py-8 px-2 rounded-lg`} data-nc-id="SectionHowItWork">
            <div className="max-w-2xl"><h2 className="text-3xl md:text-4xl font-semibold text-white">How To Book With Us</h2><span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl dark:text-neutral-400" style={{color:"rgb(155 163 175)"}}>Keep calm &amp; travel on</span></div>
            <div className="mt-20 relative grid md:grid-cols-3 gap-20">
                <img className="hidden md:block absolute inset-x-0 top-10" src="/VectorHIW.svg" alt="VectorImg" />
                {sectionHowItWorkProps.map((item) => (
                    <div key={item.id} className="relative flex flex-col items-center max-w-xs mx-auto">
                        <NcImage containerClassName="mb-8 max-w-[200px] mx-auto" className="" src={item.img} id={`section-how-it-work-${item.id}`} />
                        <div className="text-center mt-auto">
                            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                            <span className="block mt-5  dark:text-neutral-400" style={{color:"rgb(155 163 175)"}}>
                                {item.desc}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SectionHowItWork;
