import React, { FC, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import NextPrev from "./NextPrev/NextPrev";
import NcImage from "./NcImage/NcImage";
import Glide from "@glidejs/glide";

export interface ModalPhotosProps {
    imgs: string[];
    onClose: () => void;
    isOpen: boolean;
    initFocus?: number;
}

const ModalPhotos: FC<ModalPhotosProps> = ({
    imgs,
    isOpen,
    onClose,
    initFocus = 0,
}) => {
    const uniqueClass = "modalPhotos-single-gallery";

    useEffect(() => {
        const initializeGlide = () => {
            if (!isOpen || !imgs || imgs.length === 0) return;

            const element = document.querySelector(`.${uniqueClass}`) as HTMLElement;
            if (!element) {
                console.error(`Element with class '${uniqueClass}' not found.`);
                return;
            }

            // const htmlDir = document.querySelector("html")?.getAttribute("dir") || "ltr";

            try {
                new Glide(element, {
                    // direction: htmlDir,
                    gap: 10,
                    perView: 1,
                    startAt: initFocus,
                }).mount();
            } catch (error) {
                console.error("Error initializing Glide:", error);
            }
        };

        initializeGlide();
    }, [isOpen, imgs, initFocus]);

    const renderSlider = () => {
        if (!imgs || imgs.length === 0) return null;

        return (
            <div className={`${uniqueClass} group relative flex flex-col z-50 w-full h-full`}>
                {/* Control nav */}
                <div className="controls_nav glide__bullets mt-8 mb-5" data-glide-el="controls[nav]">
                    {imgs.map((_, index) => (
                        <div key={index} className="text-center hidden">
                            <span className="text-3xl font-semibold">{index + 1}</span>
                            <span> / {imgs.length}</span>
                        </div>
                    ))}
                </div>

                {/* Glide track */}
                <div className="glide__track max-h-full h-full relative z-50" data-glide-el="track">
                    <ul className="glide__slides h-full">
                        {imgs.map((item, index) => (
                            <li className="glide__slide relative h-full" key={index}>
                                <NcImage
                                    src={item}
                                    containerClassName="w-full h-full"
                                    className="absolute object-contain w-full max-h-screen"
                                    id={`Modal-photo-${index}`}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Glide arrows */}
                {imgs && (
                    <div className="xl:absolute z-20 xl:-inset-x-20 max-w-6xl my-2 mx-auto top-full xl:top-1/2 transform xl:-translate-y-1/2 flex xl:justify-between glide__arrows" data-glide-el="controls">
                        <NextPrev
                            onlyPrev
                            className="mr-1.5"
                            btnClassName="w-8 h-8 sm:w-10 sm:h-10"
                            id="modal-images-NextPrev-1"
                        />
                        <NextPrev
                            onlyNext
                            className="ml-1.5"
                            btnClassName="w-8 h-8 sm:w-10 sm:h-10"
                            id="modal-images-NextPrev-2"
                        />
                    </div>
                )}
            </div>
        );
    };

    const renderModalPhotos = () => {
        return (
            <Dialog
                as="div"
                className="fixed inset-0 z-max overflow-y-auto dark bg-[#101726] text-neutral-200 hiddenScrollbar"
                onClose={onClose}
                open={isOpen}
            >
                <div className="min-h-screen px-4 text-center">
                    <Dialog.Overlay className="fixed inset-0 bg-[#101726]" />
                    {/* Close button */}
                    <div className="absolute left-25 top-25 md:top-6 md:left-16 z-max">
                        cut
                    </div>

                    {/* This element is to center the modal contents */}
                    <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

                    {/* Modal content */}
                    <div className="relative inline-block w-full max-w-5xl py-8 h-screen align-middle mx-auto">
                        {renderSlider()}
                    </div>
                </div>
            </Dialog>
        );
    };

    return renderModalPhotos();
};

export default ModalPhotos;
