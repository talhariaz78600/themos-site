import React, {useState} from "react";
import HeaderFilter from "./HeaderFilter";
import StayCard from "./StayCard";

//todo Fix the spinner is always true > and the Tabs have no default
const TourCardGrid = ({stayListings, heading,
subHeading, tabs = ["All Tours", "Half Day", "Full Day", "Multi Day"], guests, homePage}) => {

    const [tourList, setTourList] = useState(stayListings);
    const renderCard = (tour) => {
        // @ts-ignore
        if (guests > 4 && guests < 9) {
            tour.price = tour.prices[1].price;
            tour.guests = guests;
        } else { // @ts-ignore
            if (guests >= 9) {
                tour.price = tour.prices[2].price;
                tour.guests = guests;
            } else {
                tour.price = tour.prices[0]?.price;
            }
        }
         return <StayCard key={tour.id} data={tour}/>;
    };

    return (
        <div className="nc-SectionGridFeaturePlaces relative">
            <HeaderFilter
                homePage={homePage}
                heading={heading}
                subHeading={subHeading}
                tabActive={"All Tours"}
                tabs={tabs}
                onClickTab={(args) => {
                    if (args === "All Tours") {
                        setTourList(stayListings);
                    } else {
                        let filteredList = [];
                        stayListings.filter(tour => tour.address.toString().toLowerCase().includes(args.toString().toLowerCase())).map(filteredTour => filteredList = [...filteredList, filteredTour])
                        setTourList(filteredList);
                    }
                }}
            />
            <div
                className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
            >
                {tourList.map((stay) => renderCard(stay))}
            </div>
            <div className="flex mt-16 justify-center items-center">
                {/*<ButtonPrimary loading={false} >Show me more</ButtonPrimary>*/}
            </div>
        </div>
    );
};

export default TourCardGrid;
