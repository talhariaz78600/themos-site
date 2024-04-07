
import Link from "next/link";
import Logo from "../Logo/Logo";
import SocialsList1 from "../SocialsList/SocialsList";
import React from "react";

export interface CustomLink {
    href: string;
    label: string;
}

export interface WidgetFooterMenu {
    id: string;
    title: string;
    menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
    {
        id: "1",
        title: "Tours In Athens",
        menus: [
            { href: "/tours/half_day/athens_by_night", label: "Athens By Night Tour" },
            { href: "/tours/half_day/temple_of_poseidon_sounio_sunset", label: "Temple Of Poseidon Sunset Tour" },
            {
                href: "/tours/half_day/athens_city_tour",
                label: "Half-Day Athens City Tour",
            },
            {
                href: "/tours/full_day/athens_city",
                label: "Full-Day Athens City Tour",
            },
            {
                href: "/tours/full_day/athens_city_sounio",
                label: "Full-Day Athens City & Sounio",
            },
        ],
    },
    {
        id: "2",
        title: "Day Trips",
        menus: [
            { href: "/tours/full_day/meteora", label: "Meteora Day Trip" },
            { href: "/tours/full_day/delphi", label: "Delphi Day Trip" },
            { href: "/tours/full_day/ancient_olympia", label: "Olympia Day Trip" }, //need fix from backEnd (no data fetched from the backEnd)
            { href: "/tours/full_day/argolida_mycenae_epidauris_nafplio", label: "Argolis, Epidaurus and Mycenae" },
            {
                href: "/tours/full_day/athens_corinth_apostle_paul",
                label: "Athens & Corinth Following Apostle Paul",
            },
        ],
    },
    {
        id: "5",
        title: "Multi-Day Tours",
        menus: [
            { href: "/", label: "2-Days Delphi & Meteora" },
            { href: "/", label: "2-Days Argolida & Olympia" },
            { href: "/", label: "3-Days Argolida  & Olympia & Delphi" },
            { href: "/", label: "4-Days Argolida  & Olympia & Delphi & Meteora" },
        ],
    },
    {
        id: "4",
        title: "Company",
        menus: [
            { href: "/about", label: "About Us" },
            { href: "/#ourFleet", label: "Our Fleet" },
            // {href: "#", label: "Contact Us"},
            // { href: "/privacy", label: "Privacy Policy" },
            { href: "/terms", label: "Privacy Policy" },
            { href: "/terms", label: "Terms & Conditions" },
        ],
    },
];

const Footer: React.FC = () => {
    const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
        return (
            <div key={index} className="text-sm ref-footer px-2">
                <p className="font-semibold text-lg md:text-xl mb-5 text-neutral-200 leading-relaxed">
                    {menu.title}
                </p>
                    {menu.menus.map((item, index) => (
                        <Link key={index} className="space-y-4 text-base text-neutral-300 hover:text-black hover:text-white"  href={item.href}>
                            {item.label}
                        </Link>
                    ))} 
            </div>
        );
    };

    return (
        <div className="nc-Footer relative py-12 lg:py-16 border-t border-neutral-200 dark:border-neutral-700 md:px-1 lg:px-2">
            <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
                <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
                    <div className="col-span-2 md:col-span-1">
                        <Logo />
                    </div>
                    <div className="col-span-2 flex items-center md:col-span-3">
                        <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start" />
                    </div>
                </div>
                {widgetMenus.map(renderWidgetMenuItem)}
            </div>
            <p className="text-center text-white pt-8 font-bold text-lg md:text-xl leading-relaxed">
                Member Of The Greek Tourism Organization
            </p>
            <p className="text-center text-white font-bold text-lg md:text-xl leading-relaxed">Registration Number: O206E81000524201</p>
        </div>
    );
};

export default Footer;
