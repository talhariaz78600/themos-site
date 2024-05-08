"use client"
import React, { useEffect, useState } from "react";
import GuestsInput from "../../components/GuestInput";
import StartRating from "../../components/StartRating";
import ButtonPrimary from "./TourBookNowButton";
import NcImage from "../../components/NcImage/NcImage";
import ModalPhotos from "../../components/Modelphoto";
// import BackgroundSection from "../components/BackgroundSection";
import ExperiencesDateSingleInput from "../../components/ExperiencesDateSingleInput";
import TourCardGrid from "./TourCardGrid";
import ReactMarkdown from "react-markdown";
// import LocationInput from "../../components/TourLocationInput";
import Checkbox from "../../components/Checkbox/Checkbox";
import ModalDialog from "../../components/ModalDialog/ModalDialog";
import moment, { Moment } from "moment";
interface TourDetailPageProps {
   
        tour: any;
        suggestedTours: any;
    
}

const included = [
    { name: "Gas Fess" },
    { name: "Tax & Vat" },
    { name: "Pick-Up & Drop-Off From Hotels In Athens" },
    { name: "Photo Stop At Athenian Riviera" },
    { name: "Mineral Water, Wet & Dry Tissues" },
];

const notIncluded = [
    { name: "Entry/Admission Tickets On Sights/Museums" },
    { name: "Meals & Personal Expenses" },
    { name: "Gratuities (optional)" },
];

const TourDetailPage: React.FC<TourDetailPageProps> = ({ tour, suggestedTours }) => {
    // console.log(tour);
    
    const filteredSuggestedTours = suggestedTours.filter(
        (item:any) => item.id !== tour.id
    );

    const [isOpen, setIsOpen] = useState(false);
    const [openFocusIndex, setOpenFocusIndex] = useState(0);

    const [dateValue, setdateValue] = useState<Moment | null>(null);
    const [pickUpInputValue, setPickUpInputValue] = useState<string | null>(null);
    const [dropOffInputValue, setDropOffInputValue] = useState<string | null>(null);
    const [guests, setGuests] = useState<number>(1);

    const [originFocus, setOriginFocus] = useState<boolean>(false);
    const [dateFocused, setDateFocused] = useState<boolean>(false);
    const [diffrentDropOff, setDiffrentDropOff] = useState<boolean>(false);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Add types for windowSize state
    // interface WindowSize {
    //     windowHeight: number;
    //     windowWidth: number;
    // }

    // const [windowSize, setWindowSize] = useState<WindowSize>({
    //     windowHeight: typeof window !== `undefined` ? window.innerHeight : 0,
    //     windowWidth: typeof window !== `undefined` ? window.innerWidth : 0,
    // });

    // useEffect(() => {
    //     const handleResize = () => {
    //         setWindowSize({
    //             windowHeight: window.innerHeight,
    //             windowWidth: window.innerWidth,
    //         });
    //     };

    //     window.addEventListener("resize", handleResize);

    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }, []);

    // const getDaySize = (): number | undefined => {
    //     if (windowSize.windowWidth <= 375) {
    //         return 34;
    //     }
    //     if (windowSize.windowWidth <= 500) {
    //         return undefined;
    //     }
    //     if (windowSize.windowWidth <= 1280) {
    //         return 56;
    //     }
    //     return 48;
    // };

    const handleOpenModal = (index: number) => {
        setIsOpen(true);
        setOpenFocusIndex(index);
    };

    const handleCloseModal = () => setIsOpen(false);
    const renderSection1 = () => {
        return (
            <div className="listingSection__wrap border border-white">
                {/* 1 */}
                {/*<div className="flex justify-between items-center">*/}
                {/*  <Badge color="red" name="Specific Tour" />*/}
                {/*  <LikeSaveBtns />*/}
                {/*</div>*/}

                {/* 2 */}
                <h2 className="text-2xl my-4 font-semibold">
                    {tour.title}
                </h2>

                {/* 3 */}
                <div className="flex my-4 items-center space-x-4">
                    <StartRating
                        point={tour.reviewStart}
                        reviewCount={tour.reviewCount}
                    />
                    <span>·</span>
                    <span>
                    <i className="fa-solid fa-location-dot"></i>
                        <span className="ml-1"> {tour.tags}</span>
                    </span>
                </div>

                {/* 4 HOSTED BY*/}
                {/*      <div className="flex items-center">*/}
                {/*          <Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full"/>*/}
                {/*          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">*/}
                {/*  Hosted by{" "}*/}
                {/*              <span className="text-neutral-900 dark:text-neutral-200 font-medium">*/}
                {/*    Kevin Francis*/}
                {/*  </span>*/}
                {/*</span>*/}
                {/*      </div>*/}

                {/* 5 */}
                <div className="w-full border border-neutral-700 dark:border-neutral-700 my-2" />

                {/* 6 */}
                <div className="flex items-center justify-between xl:justify-start space-x-12 text-sm text-neutral-300 dark:text-neutral-300">
                    <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
                    <i className="fa-regular fa-clock"></i>
                        <span className="">{tour.tourDuration}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
                        <i className="fa-solid fa-user-group"></i>
                        <span className="">{tour.privateShared?.privateShared}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
                    <i className="fa-solid text-xl fa-language"></i>
                        <span className="">{tour.languages[0]?.OfferedLanguage}</span>
                    </div>
                </div>
            </div>
        );
    };

    const renderSection3 = () => {
        return (
            <div className="listingSection__wrap">
                <div>
                    <h2 className="text-2xl my-2 font-semibold">Include </h2>
                    <span className="block mt-2 text-neutral-400 dark:text-neutral-400">
                        Included in the price
                    </span>
                </div>
                <div className="w-14 border-b my-4 border-neutral-400 dark:border-neutral-700" />
                {/* 6 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-neutral-400 dark:text-neutral-300 ">
                    {included
                        .filter((_, i) => i < 12)
                        .map((item) => (
                            <div key={item.name} className="flex items-center space-x-3">
                                <i className="fa-regular fa-circle-check text-2xl"></i>
                                <span>{item.name}</span>
                            </div>
                        ))}
                </div>
                <div className="w-14 border-b my-4 border-neutral-400 dark:border-neutral-700" />
                <div>
                    <h2 className="text-2xl my-4 font-semibold">Not Included</h2>
                    <span className="block mt-2 text-neutral-400 dark:text-neutral-400">
                        Not Included in the price
                    </span>
                </div>
                <div className="w-14 border-b my-4 border-neutral-400 dark:border-neutral-700" />
                {/* 6 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-neutral-400 dark:text-neutral-300 ">
                    {notIncluded
                        .filter((_, i) => i < 12)
                        .map((item) => (
                            <div key={item.name} className="flex items-center space-x-3">
                                <i className="fa-regular fa-circle-check text-2xl"></i>
                                <span>{item.name}</span>
                            </div>
                        ))}
                </div>
            </div>
        );
    };

    const tourStepDescription = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <h2 className="text-2xl font-semibold my-4">Sight Description</h2>
                <div className="w-14 border-b border-neutral-400 dark:border-neutral-700" />
                {tour.stopDescription.map((item:any) =>
                    tourStepsComponent(item.title, item.description)
                )}
            </div>
        );
    };

    const tourDescription = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <h2 className="text-2xl font-semibold">Tour Description</h2>
                <div>
                    <span className="mt-3 text-neutral-400 dark:text-neutral-400 prose">
                        {/*{tour.tourDescription}*/}
                        <ReactMarkdown children={tour.tourDescription} />
                    </span>
                </div>
            </div>
        );
    };

    const tourGeneralDescription = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <h2 className="text-2xl my-2 font-semibold">General Information</h2>
                <div>
                    <span className="mt-3 text-neutral-400 dark:text-neutral-400 prose">
                        {/*{tour.tourDescription}*/}
                        <ReactMarkdown children={tour.generalDescription} />
                    </span>
                </div>
            </div>
        );
    };

    const tourStepsComponent = (title:string, description:string) => {
        return (
            <div>
                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold my-4">{title}</h4>
                    <span className="block mt-3 text-neutral-400 dark:text-neutral-400">
                        {description}
                    </span>
                </div>
            </div>
        );
    };

    // Things To Know
    const renderSection8 = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <h2 className="text-2xl font-semibold my-4">Things to know</h2>
                <div className="w-14 border-b my-4 border-neutral-400 dark:border-neutral-700" />

                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold my-4">Drivers</h4>
                    <span className="block mt-3 text-neutral-400 dark:text-neutral-400">
                        All our drivers are professional with high experience and good
                        knowledge of the sights & museums that you are going to visit, they
                        can provide you general information and suggest restaurants and
                        activities during your stay in Greece.
                    </span>
                </div>

                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold my-4">How To Book With Us</h4>
                    <div className="prose sm:prose">
                        <ol className="mt-3 text-neutral-400 dark:text-neutral-400 space-y-2">
                            <li>
                                Select the date and the number of guests and click the Book Now
                                button.
                            </li>
                            <li>
                                Fill in the form with the required information (Name, pick-up
                                location and time etc).
                            </li>
                            <li>
                                You have the option to select among a wide range of vehicles the
                                one that fits your needs.
                            </li>
                            <li>
                                Choose the desired payment solution (card or cash to the driver)
                                & complete the booking.
                            </li>
                            <li>
                                You will receive a confirmation e-mail from us with a reference
                                number and the details of your booking & 24/7 contact detail.
                            </li>
                        </ol>
                    </div>
                </div>

                {/* CONTENT */}
                <div>
                    <h4 className="text-lg my-4 font-semibold">Drivers</h4>
                    <span className="block mt-3 text-neutral-400 dark:text-neutral-400">
                        All our drivers are professional with high experience and good
                        knowledge of the sights & museums that you are going to visit, they
                        can provide you general information and suggest restaurants and
                        activities during your stay in Greece.
                    </span>
                </div>

                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold my-4">Tour Guides</h4>
                    <span className="block mt-3 my-4 text-neutral-400 dark:text-neutral-400">
                        As Tour Guides are referred the licenced guides from the Greek
                        Ministry of Tourism with a deep knowledge to our History, Mythology
                        & Culture. Is important for you to know that only Licensed Guides
                        are allowed to escort you inside Sights & Museums and give you
                        insights regarding anything you are interested in. You can
                        distinguish licensed guides from non by the card they wearing around
                        their necks.
                    </span>
                </div>

                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold my-4">Cancellation policy</h4>
                    <span className="block mt-3 text-neutral-400 dark:text-neutral-400">
                        Any tour can be canceled and fully refunded at least 24 hours prior
                        the pick-up time.
                    </span>
                </div>
                <div className="w-14  my-4 border-b border-neutral-400 dark:border-neutral-700" />

                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold my-4">Guest requirements</h4>
                    <span className="block mt-3 text-neutral-400 dark:text-neutral-400">
                        Up to 10 guests ages 4 and up can attend. Parents may also bring
                        children under 2 years of age.
                    </span>
                </div>
                <div className="w-14 border-b my-4 border-neutral-200 dark:border-neutral-700" />

                {/* CONTENT */}
                <div>
                    <h4 className="text-lg my-4 font-semibold">What to bring</h4>
                    <div className="prose mt-3 sm:prose">
                        <ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
                            <li>
                                Formal Wear To Visit Bai Dinh Pagoda Be ready before 7.30 Am.
                            </li>
                            <li>We will pick up from 07.30 to 08.00 AM</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    const renderPrice = () => {
        if (guests <= 4) {
            return tour.prices[0].price;
        } else if (guests <= 8) {
            return tour.prices[1].price;
        } else if (guests <= 16) {
            return tour.prices[2].price;
        }
        return null;
    };


    const renderSidebar = () => {
        return (
            <div className="listingSection__wrap shadow-xl">
                {/* PRICE */}
                <div className="flex justify-between">
                    <span className="text-3xl font-semibold">
                        €{renderPrice()}
                        <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                            / All Included
                        </span>
                    </span>
                    <StartRating
                        point={tour.reviewStart}
                        reviewCount={tour.reviewCount}
                    />
                </div>
                {/* FORM */}
                <form>
                    <div
                        className="flex flex-col sm:flex-row border divide-y sm:divide-y-0 sm:divide-x divide-neutral-200
                        dark:divide-neutral-700 border-neutral-200 dark:border-neutral-700 rounded-3xl "
                    >
                        <div className="flex-1">
                            <ExperiencesDateSingleInput
                                // anchorDirection={windowSize.width > 1400 ? "left" : "right"}
                                className="h-full p-5"
                                // fieldClassName="p-5"
                                defaultValue={null}
                                onChange={(date:any) => setdateValue(date)}
                                defaultFocus={dateFocused}
                            onFocusChange={(focus) => setDateFocused(focus)}
                            />
                        </div>
                        <div className="flex-1">
                            <GuestsInput
                                fieldClassName="p-5"
                                onChange={(data) => setGuests(data)}
                                defaultValue={guests}
                            />
                        </div>
                    </div>
                    <div className="pt-6">
                        {/* <div className="border dark:border-neutral-700 rounded-3xl">
                            <LocationInput
                                placeHolder={diffrentDropOff ? "Pick-Up" : "Pick-Up & Drop-Off"}
                                desc="Athens Airport, Piraeus Port Etc.?"
                                defaultValue={pickUpInputValue}
                                onChange={(e:any) => setPickUpInputValue(e)}
                                onInputDone={""}
                                autoFocus={originFocus}
                                onFocusChange={(e:any) => setOriginFocus(e)}
                                className="h-20"
                                setIsModalOpen={setIsModalOpen}
                                // Id="tour1"
                            />
                        </div> */}
                    </div>
                    {diffrentDropOff && (
                        <div className="pt-6">
                            <div className="border dark:border-neutral-700 rounded-3xl">
                                {/* <LocationInput
                                    placeHolder="Drop-Off"
                                    desc="Athens Airport, Piraeus Port Etc.?"
                                    defaultValue={dropOffInputValue}
                                    onChange={(e:any) => setDropOffInputValue(e)}
                                    onInputDone={null}
                                    autoFocus={originFocus}
                                    onFocusChange={(e:any) => setOriginFocus(e)}
                                    className="h-20"
                                    setIsModalOpen={setIsModalOpen}
                                    // Id="tour2"
                                /> */}
                            </div>
                        </div>
                    )}
                    <div className="pt-6 pl-4">
                        <Checkbox
                            name=""
                            label="Diffrent Drop-Off Location"
                            defaultChecked={diffrentDropOff}
                            onChange={(checked:any) => setDiffrentDropOff(checked)}
                        />
                    </div>
                </form>

                {/* SUM */}
                <div className="flex flex-col space-y-4">
                    {/* <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                            <span>Service charge</span>
                            <span>€{Math.round((renderPrice() / 1.13) * 100) / 100}</span>
                        </div>
                        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                            <span>Vat</span>
                            <span>€{Math.round((renderPrice() * 0.13) * 100) / 100}</span>
                        </div> */}
                    <div className="border-b border-neutral-200 dark:border-neutral-700" />
                    <div className="flex justify-between font-semibold">
                        <span>Total Price (All included)</span>
                        <span>€{renderPrice()}</span>
                    </div>
                </div>

                {/* SUBMIT */}
                {renderPrice() == null ? (
                    <ButtonPrimary
                        // onClick={(e:any) => {}}
                        sendDataToParent={(e:any) => bookNowButtonClicked()}
                        origin={pickUpInputValue}
                        destination={dropOffInputValue}
                        date={dateValue}
                        guests={guests}
                        tourId={tour.backEndTourId}
                        tourTitle={tour.title}
                        setIsModalOpen={setIsModalOpen}
                    >
                        
                    </ButtonPrimary>
                ) : (
                    <ButtonPrimary
                        sendDataToParent={(e:any) => bookNowButtonClicked()}
                        origin={pickUpInputValue}
                        destination={dropOffInputValue}
                        date={dateValue}
                        guests={guests}
                        tourId={tour.backEndTourId}
                        tourTitle={tour.title}
                        setIsModalOpen={setIsModalOpen}
                    />
                )}
                <ModalDialog
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    title={"An Error Occurred"}
                    description={
                        "Connection with the server is not established, " +
                        "check your internet connection and try again."
                    }
                />
            </div>
        );
    };

    const bookNowButtonClicked = () => {
        // document.getElementById("scroll-anc")
        //     .scrollIntoView({ behavior: "smooth", block: "center" });
        if (dateValue === null) {
            setDateFocused(true);
        } else if (pickUpInputValue === null) {
            setOriginFocus(true);
        }
    };

    const stepLocations = (location:any, time:any) => {
        return (
            <div className="flex flex-col space-y-2">
                <span className=" text-neutral-500 dark:text-neutral-400">
                    {location}
                </span>
                <span className=" font-semibold">{time}</span>
            </div>
        );
    };

    const renderSidebarDetail = () => {
        return (
            <div className="listingSection__wrap shadow-xl">
                <span className="text-2xl font-semibold block">Suggested Route</span>
                <div className="mt-8 flex">
                    <div className="flex-shrink-0 flex flex-col items-center py-2">
                        <span className="block w-6 h-6 rounded-full border border-neutral-400" />
                        <span className="block flex-grow border-l border-neutral-400 border-dashed my-1" />
                        <span className="block w-6 h-6 rounded-full border border-neutral-400" />
                    </div>

                    <div className="ml-4 space-y-14 text-sm">
                        {tour.stopDescription.map((item:any) =>
                            stepLocations("Approx: " + item.duration, item.title)
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const bookingWidget = (webOrMobile:any) => {
        return (
            <div className={`${webOrMobile} lg:block flex-grow`}>
                {renderSidebarDetail()}
                <div className="mt-10 sticky top-24">{renderSidebar()}</div>
            </div>
        );
    };

    return (
        <div
            className={`nc-ListingExperiencesDetailPage  €{className}`}
            data-nc-id="TourTemplate"
        >
            {/* SINGLE HEADER */}
            <>
                <header className="container 2xl:px-14 rounded-md sm:rounded-xl">
                    <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
                        <div
                            className="col-span-3 row-span-3 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                            onClick={() => handleOpenModal(0)}
                        >
                            <NcImage
                                containerClassName="absolute inset-0"
                                className="object-cover w-full h-full rounded-md sm:rounded-xl"
                                src={tour.galleryImgs[0].url}
                                // prevImageHorizontal
                                id="tours-1"
                            />
                            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity" />
                        </div>
                        {tour.galleryImgs
                            .filter((_:any, i:any) => i >= 1 && i < 4)
                            .map((item:any, index:any) => (
                                <div
                                    key={index}
                                    className={`relative rounded-md sm:rounded-xl overflow-hidden €{
                                        index >= 2 ? "block" : ""
                                    }`}
                                >
                                    <NcImage
                                        containerClassName="aspect-w-4 aspect-h-3"
                                        className="object-cover w-full h-[250px] rounded-md sm:rounded-xl "
                                        src={item.url || ""}
                                        // prevImageHorizontal
                                        id="tours-2"
                                    />

                                    {/* OVERLAY */}
                                    <div
                                        className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                                        onClick={() => handleOpenModal(index + 1)}
                                    />
                                </div>
                            ))}

                        <div
                            className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
                            onClick={() => handleOpenModal(0)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                />
                            </svg>
                            <span className="ml-2 text-neutral-800 text-sm font-medium">
                                Show all photos
                            </span>
                        </div>
                    </div>
                </header>
                {/* MODAL PHOTOS */}
            </>
                <ModalPhotos
                    imgs={tour.galleryImgs.map((item:any)=>item.url)}
                    isOpen={isOpen}
                    onClose={handleCloseModal}
                    initFocus={openFocusIndex}
                />

            {/* MAIn */}
            <main className="container mt-11 flex ">
                {/* CONTENT */}
                <div className="w-full content-container">
                    {renderSection1()}
                    {bookingWidget("lg:hidden")}
                    {tourDescription()}
                    {/* <ShareModal /> */}
                    {tourStepDescription()}
                    {tour.generalDescription && tourGeneralDescription()}
                    {renderSection3()}
                    {/*{renderSectionCheckIndate()}*/}

                    {/*Host Information*/}
                    {/*{renderSection5()}*/}

                    {/*Reviews*/}
                    {/*{renderSection6()}*/}

                    {/*MAP*/}
                    {/*{renderSection7()}*/}

                    {renderSection8()}
                </div>
                {bookingWidget("hidden")}
            </main>

            {/* STICKY FOOTER MOBILE */}
            <div className="block lg:hidden fixed bottom-0 inset-x-0 py-4 bg-white text-neutral-900 border-t border-neutral-200 z-20">
                <div className="container flex items-center justify-between w-10/12	ml-0">
                    <span className="text-2xl font-semibold">
                        €{renderPrice()}
                        <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                            / All Included
                        </span>
                    </span>
                    <ButtonPrimary
                        sendDataToParent={(e:any) => bookNowButtonClicked()}
                        origin={pickUpInputValue}
                        destination={dropOffInputValue}
                        date={dateValue}
                        guests={guests}
                        tourId={tour.backEndTourId}
                        setIsModalOpen={setIsModalOpen}
                        tourTitle={tour.title}
                    >
                        
                    </ButtonPrimary>
                </div>
            </div>

            {/* OTHER SECTION */}
            <div className="container py-24 lg:py-32">
                {/* SECTION 1 */}
                <div className="py-16">
                    {/* <BackgroundSection /> */}
                    <TourCardGrid
                        heading={"Suggester Tours"}
                        subHeading={"You Will Find Bellow Related Tours"}
                        stayListings={filteredSuggestedTours}
                        // tabs= [ "All Tours", "Half Day", "Full Day", "Multi Day"]
                        guests=""
                         homePage=""
                        // headingIsCenter={true}
                    />
                </div>

                {/* SECTION */}
                {/*<SectionSubscribe2 className="pt-24 lg:pt-32"/>*/}
            </div>
        </div>
    );
};

export default TourDetailPage;
