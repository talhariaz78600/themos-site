"use client"
import React from "react";
import Link from "next/link";
interface HeroSearchFormProps {
    className?: string;
    currentTab: string;
    currentPage: string;
}
import TransferSearchForm from "../transfer/TransferSearchPage";
const HeroSearchForm: React.FC<HeroSearchFormProps> = ({ className, currentTab, currentPage }) => {
    const tabs: string[] = ["Transfers", "Tours"];
    const initialTab: string = currentTab;

    const renderTab = () => (
        <ul className="ml-2 sm:ml-6 md:ml-12 flex text-white space-x-5 sm:space-x-8 lg:space-x-11 overflow-x-auto hiddenScrollbar">
            {tabs.map((tab) => (
                <li
                    key={tab}
                    className={`flex-shrink-0 flex items-center cursor-pointer text-sm lg:text-base font-medium ${tab === "Transfers"
                            ? ""
                            : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400"
                        } `}
                >
                    <Link href={tab === "Tours" ? "/tours" : "#"} passHref>
                        <span className="flex"><span className={`${tab === "Transfers"
                            ? "bg-neutral-200 block mt-2 w-2.5 h-2.5 rounded-full"
                            : "bg-neutral-600"
                        } dark:bg-neutral-100 mr-2`} />{tab}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );

    const renderForm = () => {
        switch (initialTab) {
            case "Transfers":
                // return <TransferSearchForm haveDefaultValue={null} sendToParent={()=>{}} checkUpdates={()=>{}} btnType=""/>;
                break;
            case "Tours":
                // Return ExperiencesSearchForm component or null
                break;
            default:
                return null;
        }
    };

    return (
        <div className={`nc-HeroSearchForm w-full max-w-6xl pb-5 lg:py-0 ${className}`} data-nc-id="HeroSearchForm">
            {renderTab()}
            {renderForm()}
        </div>
    );
};

export default HeroSearchForm;
