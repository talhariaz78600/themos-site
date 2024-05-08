// import React, { useCallback, useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { debounce } from "lodash";
// import { GiCommercialAirplane } from "react-icons/gi";
// import { REACT_APP_REST_RESOURCE_BASE_END_POINT, globalSearchPlaceholder } from "./constants/apiEndpoints";

// const TourLocationInput = ({
//   defaultValue,
//   autoFocus = false,
//   onChange,
//   onInputDone,
//   placeHolder = "Location",
//   desc = "Where are you going?",
//   className = "nc-flex-1.5",
//   onFocusChange,
//   searchPlaceholder = globalSearchPlaceholder,
//   setIsModalOpen,
// }) => {
//   const containerRef = useRef(null);
//   const inputRef = useRef(null);

//   const [value, setValue] = useState(defaultValue);
//   const [showPopover, setShowPopover] = useState(autoFocus);
//   const [searching, setSearching] = useState(false);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     setValue(defaultValue);
//   }, [defaultValue]);

//   useEffect(() => {
//     setShowPopover(autoFocus);
//   }, [autoFocus]);

//   useEffect(() => {
//     if (eventClickOutsideDiv) {
//       document.removeEventListener("click", eventClickOutsideDiv);
//     }
//     showPopover && document.addEventListener("click", eventClickOutsideDiv);
//     return () => {
//       document.removeEventListener("click", eventClickOutsideDiv);
//     };
//   }, [showPopover]);

//   useEffect(() => {
//     onChange && onChange(value);
//     if (value !== "") {
//       getData(value);
//     }
//   }, [value]);

//   const getData = useCallback(
//     debounce((val) => {
//       setSearching(true);
//       setShowPopover(true);

//       try {
//         axios
//           .get(
//             `${REACT_APP_REST_RESOURCE_BASE_END_POINT}/prices/autocomplete/${val}`
//           )
//           .then((res) => {
//             setData(res.data);
//             setSearching(false);
//           })
//           .catch((err) => {
//             setSearching(false);
//             setIsModalOpen(true);
//           });
//       } catch (e) {
//         setIsModalOpen(true);
//       }
//     }, 600),
//     []
//   );

//   const eventClickOutsideDiv = (event) => {
//     onFocusChange(false);

//     if (!containerRef.current) return;
//     // CLICK INSIDE
//     if (!showPopover || containerRef.current.contains(event.target)) {
//       return;
//     }

//     // CLICK OUTSIDE
//     setShowPopover(false);
//   };

//   const handleSelectLocation = (item) => {
//     setValue(item);
//     onInputDone && onInputDone(item);
//     setShowPopover(false);
//   };

//   const handleChange = (e) => {
//     const val = e.currentTarget.value;
//     setValue(val);
//     if (val !== "") {
//       getData(val);
//     }
//   };

//   const handlePopover = () => {
//     setShowPopover(true);
//     document.getElementById("scroll-anc").scrollIntoView({ behavior: "smooth", block: "center" });
//   };

//   const renderRecentSearches = () => {
//     let searchedList = [];

//     if (data.length !== 0) {
//       // data.forEach((item) => {
//       //   var asd = {
//       //     id: item.placeId,
//       //     title: item.description,
//       //     subtitle: "",
//       //     icon: <GiCommercialAirplane size={25} />,
//       //   };

//       //   searchedList = [...searchedList, asd];
//       // });

//       const asd = searchPlaceholder.filter((item) =>
//         item.title.toLowerCase().includes(value.toLowerCase())
//       );
//       if (asd.length !== 0) {
//         searchedList = [...asd, ...searchedList];
//       }
//     } else {
//       searchedList = searchPlaceholder;
//     }

//     return (
//       <>
//         <div className="mt-2">
//           {searchedList.map((item) => (
//             <span
//               onClick={() => handleSelectLocation(item)}
//               key={item.id}
//               className="flex my-4 md:my-0 px-4 sm:px-8 items-center space-x-2 sm:space-x-4  sm:py-5 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
//             >
//               <div className="flex gap-2 items-center">
//                 <div>
//                   <span className="block text-neutral-400">{item.icon}</span>
//                 </div>
//                 <div>
//                   <div className=" block font-medium text-neutral-700 dark:text-neutral-200">
//                     {item.title}
//                   </div>
//                   <div className=" text-sm text-gray-400">{item.subtitle}</div>
//                 </div>
//               </div>
//             </span>
//           ))}
//         </div>
//       </>
//     );
//   };

//   return (
//     <div className={`relative flex ${className}`} ref={containerRef}>
//       <div
//         onClick={() => handlePopover()}
//         id="scroll-anc"
//         className={`flex flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${
//           showPopover ? "" : ""
//         }`}
//       >
//         <div className="text-neutral-300 dark:text-neutral-400">
//           {/* Your SVG icon */}
//         </div>
//         <div className="flex-grow">
//           <label className="hidden" htmlFor="tour-location-input">
//             {value?.title}
//           </label>
//           <input
//             className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
//             placeholder={placeHolder}
//             value={value == null ? "" : value.title}
//             onChange={(e) => handleChange(e)}
//             ref={inputRef}
//             id="tour-location-input"
//           />
//           <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
//             <span className="line-clamp-1">{!!value ? placeHolder : desc}</span>
//           </span>
//           {value && showPopover && (
//             <button onClick={() => setValue(null)}>Clear</button>
//           )}

//           {searching && showPopover && (
//             <span className="absolute w-5 h-5 lg:w-6 lg:h-6 text-sm bg-transparent rounded-full flex items-center justify-center right-1 lg:right-3 top-1/2 transform -translate-y-1/2">
//               {/* Loading spinner */}
//             </span>
//           )}
//         </div>
//       </div>
//       {showPopover && (
//         <div className="absolute left-0 z-50 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-4 py-3 sm:py-2 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
//           {renderRecentSearches()}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TourLocationInput;
