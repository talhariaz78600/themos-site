"use client"
import React, { useCallback, useState, useEffect, useRef, ChangeEvent } from "react";
import axios from "axios";
import { GiCommercialAirplane } from "react-icons/gi";
import { globalSearchPlaceholder, REACT_APP_REST_RESOURCE_BASE_END_POINT } from "../components/constants/apiEndpoints";
import ClearDataButton from "./ClearDataButton";
interface LocationInputProps {
    defaultValue?: any;
    autoFocus?: boolean;
    onChange?: (value: any) => void;
    onInputDone?: (value: any) => void;
    placeHolder?: string;
    desc?: string;
    className?: string;
    onFocusChange?: (focused: boolean) => void;
    searchPlaceholder?: any[];
    Id?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({
    defaultValue,
    autoFocus = false,
    onChange,
    onInputDone,
    placeHolder = "Location",
    desc = "Where are you going?",
    className = "nc-flex-1.5",
    onFocusChange,
    searchPlaceholder = globalSearchPlaceholder,
    Id,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [value, setValue] = useState<any>(defaultValue);
    const [showPopover, setShowPopover] = useState<boolean>(autoFocus);
    const [searching, setSearching] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        setShowPopover(autoFocus);
    }, [autoFocus]);

    useEffect(() => {
        if (showPopover && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showPopover]);

    useEffect(() => {
        if (eventClickOutsideDiv) {
            document.removeEventListener("click", eventClickOutsideDiv);
        }
        showPopover && document.addEventListener("click", eventClickOutsideDiv);
        return () => {
            document.removeEventListener("click", eventClickOutsideDiv);
        };
    }, [showPopover]);

    useEffect(() => {
        onChange && onChange(value);
    }, [value]);

    const debounce = (func: (...args: any[]) => void, delay: number) => {
        let timeoutId: ReturnType<typeof setTimeout>;
        return (...args: any[]) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const getData = useCallback(
        debounce((val: string) => {
            setSearching(true);
            setShowPopover(true);
            axios
                .get(`${REACT_APP_REST_RESOURCE_BASE_END_POINT}/prices/autocomplete/${val}`)
                .then((res) => {
                    setData(res.data);
                    setSearching(false);
                })
                .catch((err) => {
                    setSearching(false);
                    alert(err);
                });
        }, 600), []);

    const eventClickOutsideDiv = (event: MouseEvent) => {
        onFocusChange && onFocusChange(false);

        if (!containerRef.current || !showPopover || containerRef.current.contains(event.target as Node)) {
            return;
        }

        setShowPopover(false);
    };

    const handleSelectLocation = (item: any) => {
        setValue(item);
        onInputDone && onInputDone(item);
        setShowPopover(false);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value;
        setValue(val);
        if (val !== "") {
            getData(val);
        }
    };

    const handlePopover = () => {
        setShowPopover(true);
        const scrollElement = document.getElementById(`scroll-anc-location${Id}`);
        scrollElement && scrollElement.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const renderRecentSearches = () => {
        let searchedList: any[] = data.map((item) => ({
            id: item.placeId,
            title: item.description,
            subtitle: "",
            icon: <GiCommercialAirplane size={25} />,
        }));

        if (data.length === 0) {
            searchedList = searchPlaceholder;
        }

        return (
            <>
                <div className="mt-2">
                    {searchedList.map((item) => (
                        <span
                            onClick={() => handleSelectLocation(item)}
                            key={item.id}
                            className="flex my-4 md:my-0 px-4 sm:px-8 items-center space-x-2 sm:space-x-4  sm:py-5 hover:bg-[#0e1420] cursor-pointer"
                        >
                            <div className="flex gap-2 items-center">
                                <div>
                                    <span className="block" style={{  color:"rgb(155 163 175)"}}>{item.icon}</span>
                                </div>
                                <div>
                                    <div className=" block font-medium text-neutral-200 dark:text-neutral-200" style={{ color:"rgb(229 231 233)"}}>
                                        {item.title}
                                    </div>
                                    <div className=" text-sm text-gray-400" style={{  color:"rgb(155 163 175)"}}>{item.subtitle}</div>
                                </div>
                            </div>
                        </span>
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className={`relative flex ${className}`} ref={containerRef}>
            <div
                onClick={handlePopover}
                id={`scroll-anc-location${Id}`}
                className="flex flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  shadow-2xl rounded-full hover:bg-[#1d2938] px-2 py-4"            >
                <div className="" style={{ color:"rgb(155 163 175)"}}>
                <i className="fa-solid fa-location-dot  text-[20px] px-3"></i>
                  </div>
                <div className="flex-grow">
                    <label className="hidden" htmlFor={`location-input ${Id}`} title={value == null ? "Location" : value.title}>
                        {"location-input" + (value?.title || "")}
                    </label>
                    <input readOnly className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-200  dark:placeholder-neutral-200 truncate`} placeholder={placeHolder} value={value == null ? "" : value.title} onChange={handleChange} ref={inputRef} id={`location-input ${Id}`} />
                    <span className="block mt-0.5 text-sm  font-light " style={{  color:"rgb(155 163 175)"}}>
                        <span className="line-clamp-1">{value ? placeHolder : desc}</span>
                    </span>
                    {value && showPopover && <ClearDataButton onClick={() => setValue(null)} />}
                    {searching && showPopover && (
                        <span className="absolute w-5 h-5 lg:w-6 lg:h-6 text-sm bg-transparent rounded-full flex items-center justify-center right-1 lg:right-3 top-1/2 transform -translate-y-1/2">
                            <svg className="animate-spin h-8 w-8  absolute border-indigo-600 border-t-[3px] rounded-full" viewBox="0 0 24 24" />
                        </span>
                    )}
                </div>
            </div>
            {showPopover && (
                <div className="absolute left-0 z-50 w-full min-w-[300px] sm:min-w-[500px] bg-[#1d2938]  top-full mt-4 py-3 sm:py-2 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
                    {renderRecentSearches()}
                </div>
            )}
        </div>
    );
};

export default LocationInput;
