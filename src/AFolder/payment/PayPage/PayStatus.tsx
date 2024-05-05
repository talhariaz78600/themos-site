import React, { useState, useEffect } from 'react';
import { useStripe} from '@stripe/react-stripe-js';
import StartRating from '../../../components/StartRating';
import ButtonPrimary from '../../../components/Button/ButtonPrimary';
import NcImage from '../../../components/NcImage/NcImage';
import { FiUser, FiBriefcase } from 'react-icons/fi';
import axios from 'axios';
import { REACT_APP_REST_RESOURCE_BASE_END_POINT } from '../../../components/constants/apiEndpoints';
import * as generalMethod from '../../../components/GeneralMethods';
import { format } from 'date-fns';
import Footer from '@/components/Footer/Footer';
interface PayStatusProps {}

const PayStatus: React.FC<PayStatusProps> = () => {
  const stripe: any | null = useStripe();
  const [message, setMessage] = useState<string | null>(null);
  const [paymentDetail, setPaymentDetail] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
  const [routeData, setRouteData] = useState<any | null>(null);
  const [formState, setFormState] = useState<any | null>(null);
  const [bookingNumber, setBookingNumber] = useState<string | null>(null);
  const [errorPage, setErrorPage] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    navigation: string;
  }>({
    isOpen: false,
    title: '',
    description: '',
    navigation: '',
  });

  useEffect(() => {
    const routeDetailsAndPrices = generalMethod.getRouteDetailsAndPrice();
    const selectedVehicleDetail = generalMethod.getSelectedVehicle();
    const formData = generalMethod.getCustomerDataForm();

    setRouteData(routeDetailsAndPrices);
    setSelectedVehicle(selectedVehicleDetail);
    setFormState(formData);
  }, []);

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

    if (clientSecret) {
      stripe.retrievePaymentIntent(clientSecret).then((paymentIntent:any ) => {
        if (paymentIntent.last_payment_error) {
          setIsLoading(false);
          setErrorPage({
            isOpen: true,
            title: '404 || Tour-Greece.gr',
            description: 'PAYMENT FAILED, PLEASE TRY AGAIN OR USE ANOTHER PAYMENT METHOD',
            navigation: '/checkout',
          });
        } else {
          switch (paymentIntent.status) {
            case 'succeeded':
              setPaymentDetail(paymentIntent);
              saveServiceToServer(paymentIntent);
              break;
            case 'processing':
              setMessage('Payment processing. We\'ll update you when payment is received.');
              break;
            case 'requires_payment_method':
              setMessage('Payment failed. Please try another payment method.');
              break;
            default:
              setMessage('Something went wrong.');
              break;
          }
        }
      });
    } else {
      saveServiceToServer();
    }
  }, [stripe]);

  const constructDateTimeToSave = () => {
    const holdsDate = new Date(routeData.date);
    const holdTime = new Date(formState.landingTime);
    console.log(holdsDate );
    console.log(formState.landingTime)

    const [timePart, period] = formState.landingTime.split(' ');

    // Split the time part into hours and minutes
    const [hours, minutes] = timePart.split(':').map(Number);
  
    // Convert hours to 24-hour format based on period (AM/PM)
    let hours24 = hours;
    if (period === 'PM' && hours < 12) {
      hours24 += 12; // Add 12 hours to convert PM time to 24-hour format
    } else if (period === 'AM' && hours === 12) {
      hours24 = 0; // Midnight (12 AM) is 0 in 24-hour format
    }

    return new Date(holdsDate.getFullYear(), holdsDate.getMonth(), holdsDate.getDate(), hours24, minutes);
  };

  const saveServiceToServer = (paymentIntent?: any) => {
    let bookingConfirmation = generalMethod.fetchBookingConfirmation();

    if (bookingConfirmation) {
      setIsLoading(false);
      setBookingNumber(bookingConfirmation);
      setMessage('Success! Your booking is confirmed. 🎉');
    } else {
      const dataToSave = {
        origin: {
          name: routeData.origin.title,
          placeId: routeData.origin.id,
          lat: routeData.fetchedPrices.originLat,
          lng: routeData.fetchedPrices.originLng,
        },
        destination: {
          name: routeData.destination.title,
          placeId: routeData.destination.id,
          lat: routeData.fetchedPrices.destinationLat,
          lng: routeData.fetchedPrices.destinationLng,
        },
        pickUpTime: constructDateTimeToSave(),
        originDetails: formState.arrFlightNumber,
        destinationDetails: formState.dropAddress,
        passengerName: `${formState.fName} ${formState.lName}`,
        email: formState.email,
        phoneNumber: `+${formState.countryCode} ${formState.phoneNumber}`,
        uuid: selectedVehicle.uuid,
        type: 1,
        method: paymentIntent ? 2 : 1,
        paymentIntent: paymentIntent?.id,
        tourTitle: routeData?.tourTitle,
        price: paymentIntent ? (paymentIntent.amount / 100).toFixed(2) : selectedVehicle.price.toFixed(2),
        vehicleUrl: selectedVehicle.Image.url,
      };
      console.log(dataToSave);
      axios
        .post(`${REACT_APP_REST_RESOURCE_BASE_END_POINT}/checkout`, dataToSave, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
            console.log(response)
          setIsLoading(false);
          setErrorPage((prev) => ({ ...prev, isOpen: false }));
          setBookingNumber(response.data);
          generalMethod.saveBookingConfirmation(response.data)
          setMessage('Success! Payment received. 🎉');
        })
        .catch((error) => {
          setIsLoading(false);
          setErrorPage({
            isOpen: true,
            title: '404 || Tour-Greece.gr',
            description: 'AN ERROR OCCURRED, PLEASE CONTACT US TO CONFIRM YOUR RESERVATION',
            navigation: '/',
          });
        });
    }
  };

  const renderSpinnerWhileLoading = () => {
    return (
        <div className="lg:mt-24 mb-28  md:mb-34 lg:mb-60 border border-neutral-700 dark:border-neutral-700">
            <h2 className="pt-10 text-3xl lg:text-2xl justify-center flex font-semibold">
                Processing Your Reservation, Please Wait...
            </h2>
            <div className="flex justify-center items-center noFocus pt-10 pb-10">
                <svg
                    role="status"
                    className="w-6 h-6 text-gray-400 animate-spin dark:text-gray-400 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
            </div>
        </div>
    );
};

const getPickUpDateTime = () => {

    return (
        <div className="flex text-neutral-300 dark:text-neutral-300">
            <span className="flex-1">Pick-Up Date Time:</span>
            <span
                className="flex-1 font-normal md:font-medium text-neutral-100 dark:text-neutral-100">
                {format(new Date(constructDateTimeToSave()), 'dd/MM/yyyy HH:mm')}
            </span>
        </div>
    )
}

const bookingId = () => {
    if (bookingNumber) {
        return (
            <div className="flex text-neutral-300 dark:text-neutral-300">
                <span className="flex-1">Booking #:</span>
                <span
                    className="flex-1 font-normal md:font-medium text-neutral-100 dark:text-neutral-100">
                            TG{new Date().getFullYear()}{bookingNumber}
            </span>
            </div>

        )
    }
}

const getOrigin = () => {
    return (
        <div className="flex text-neutral-300 dark:text-neutral-300">
            <span className="flex-1">Pick-Up Location:</span>
            <span
                className="flex-1 font-normal md:font-medium text-neutral-100 dark:text-neutral-100">
                            {routeData?.origin?.title} {formState?.arrFlightNumber}</span>
        </div>

    )
}

const getDestination = () => {
    let destination;
    if (routeData?.destination.title == null) {
        destination = routeData?.origin.title
    } else {
        destination = routeData?.destination.title + " " + formState?.dropAddress
    }

    return (<div className="flex text-neutral-300 dark:text-neutral-300">
            <span className="flex-1">Drop-Off Location:</span>
            <span
                className="flex-1 font-normal md:font-medium text-neutral-100 dark:text-neutral-100">
                {destination}
            </span>
        </div>
    )
}

const bookedOn = () => {
    if (paymentDetail) {
        return (<div className="flex text-neutral-300 dark:text-neutral-300">
            <span className="flex-1">Payment Date:</span>
            <span
                className="flex-1 font-normal md:font-medium text-neutral-100 dark:text-neutral-100">
                        {new Date(1000 * paymentDetail.created).toLocaleDateString()}
        </span>
        </div>)
    }
}

const passengersName = () => {
    return (
        <div className="flex text-neutral-300 dark:text-neutral-300">
            <span className="flex-1">Passengers Name:</span>
            <span
                className="flex-1 font-normal md:font-medium text-neutral-100 dark:text-neutral-100">
                         {formState.fName} {formState.lName}
            </span>
        </div>
    )
}

const email = () => {
    return (
        <div className="flex text-neutral-300 dark:text-neutral-300">
            <span className="flex-1">Email Address:</span>
            <span
                className="flex-1 truncate font-normal md:font-medium text-neutral-100 dark:text-neutral-100">
              {formState.email}
            </span>
        </div>
    )
}

const phone = () => {
    return (
        <div className="flex text-neutral-300 dark:text-neutral-300">
            <span className="flex-1">Phone Number:</span>
            <span
                className="flex-1 font-normal md:font-medium text-neutral-300 dark:text-neutral-100">
              +{formState.countryCode} {formState.phoneNumber}
            </span>
        </div>
    )
}

const paymentMethod = () => {
    return (
        <div className="flex justify-between text-neutral-300 dark:text-neutral-300">
            <span className="flex-1">Payment method:</span>
            <span
                className="flex-1 font-normal md:font-medium text-neutral-100 dark:text-neutral-100">
              {paymentDetail ? "Credit card" : "Cash To Driver"}
            </span>
        </div>
    )
}

const getSelectedVehicle = () => {
    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Booked Vehicle</h3>
            <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="flex-shrink-0">
                    <div className="object-contain aspect-h-4  md:aspect-h-1  rounded-2xl overflow-hidden">
                        <NcImage src={selectedVehicle.Image.url} className='booking-vehicle' id="pay status "/>
                    </div>
                </div>
                <div className="pt-5  sm:pb-5 sm:px-5 space-y-3">
                    <div>
                        <span className="text-base sm:text-lg font-medium mt-1 block">{selectedVehicle.name}</span>
                    </div>

                    <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center">
                        <FiUser size={18}/>
                        <span className="px-3">Seats {selectedVehicle.MaxPeople} people</span>
                    </span>

                    <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center">
                        <FiBriefcase size={18}/>
                        <span className="px-3">Fits {selectedVehicle.MaxLuggage} suitcases</span>
                    </span>

                    <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
                    <StartRating reviewCount={selectedVehicle.reviews} point={selectedVehicle.rating}/>
                </div>
            </div>
        </div>
    )
}

const totalCost = () => {
    return (
        <div className="flex text-neutral-6000 dark:text-neutral-300">
            <span className="flex-1">Total Cost:</span>
            <span
                className="flex-1 font-normal md:font-medium text-neutral-100 dark:text-neutral-100">
              €{paymentDetail ? (paymentDetail.amount / 100).toFixed(2) : (selectedVehicle.price).toFixed(2)}
            </span>
        </div>
    )
}
// const extrasDiv = () => {
//     // return (
//     //     <div className="flex text-neutral-6000 dark:text-neutral-300">
//     //   <span className="flex-1">Equipment and Extras:</span>
//     //   <span className="flex-1 text-neutral-900 dark:text-neutral-100">
//     //     {formState.extrasArr
//     //       .slice(0, showItems)
//     //       .map((item, index) => (
//     //         <div className="pb-3" key={index}>
//     //           {item.checked && (
//     //             <div className="flex items-center space-x-3">
//     //               <span className="font-normal md:font-medium">
//     //                 {item.label}:{" "}
//     //               </span>
//     //               {index !== 2 && item.count && (
//     //                 <span className="text-sm">{item.count}x</span>
//     //               )}
//     //               {item.note && <span>{item.note}</span>}
//     //             </div>
//     //           )}
//     //         </div>
//     //       ))}
//     //     {formState.extrasArr.map((item, index) => (
//     //       <>
//     //         {item.count > 0 ||
//     //           (item.note && (
//     //             <div onClick={() => handleExpand()}>
//     //               {showItems === 3 ? (
//     //                 <span className="text-sm text-primary-6000 flex items-center cursor-pointer">
//     //                   <span>Show more</span>
//     //                   <MdArrowDropDown size={18} />
//     //                 </span>
//     //               ) : (
//     //                 <span className="text-sm text-primary-6000 flex items-center cursor-pointer">
//     //                   <span>Show less</span>
//     //                   <MdArrowDropUp size={18} />
//     //                 </span>
//     //               )}
//     //             </div>
//     //           ))}
//     //       </>
//     //     ))}
//     //   </span>
//     // </div>
//     // );
// }

const renderPayMain = () => {
    return (
        <div
            className="w-full flex flex-col sm:rounded-2xl border border-neutral-200 dark:border-neutral-700
            space-y-8 px-0 p-6 xl:p-8"
        >
            <h2 className="text-3xl lg:text-4xl font-semibold">{message}</h2>
            <>
                <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

                {/* ------------------------ */}
                {getSelectedVehicle()}

                {/* ------------------------ */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">Booking detail</h3>
                    {bookingId()}
                    <div className="flex flex-col space-y-4">
                        {bookedOn()}
                        {getPickUpDateTime()}
                        {getOrigin()}
                        {getDestination()}
                        {passengersName()}
                        {email()}
                        {phone()}
                        {totalCost()}

                        {/* {extrasDiv()} */}

                        {paymentMethod()}

                    </div>
                </div>
                <div>
                    <ButtonPrimary href="/">Explore more experiences</ButtonPrimary>
                </div>
            </>
        </div>
    );
};

const errorPageNavigation = () => {
    return (
        <div>
            {/* <SEO title={"404 Page"}/>
            <PageErrorOnBooking data={errorPage}/> */}
        </div>
    )
}

return isLoading ? renderSpinnerWhileLoading() : errorPage.isOpen ? errorPageNavigation() :
    (
    <div className={"pb-8"}>{renderPayMain()}
    
    </div>
);
};

export default PayStatus;
