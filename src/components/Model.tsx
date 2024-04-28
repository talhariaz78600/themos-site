"use client"
import ModalPhotos from "./Modelphoto";
import React, { useEffect, useState } from "react";

interface ModalProps {
  galleryImgs: string[]; // Define the type for galleryImgs as an array of strings or null
}

export default function Modal({ galleryImgs }: ModalProps) {
  const [images, setImages] = useState<string[]>([]); // State for modal images

  useEffect(() => {
    if (galleryImgs) {
      setImages(galleryImgs); // Update images state with galleryImgs when it changes
    }
  }, [galleryImgs]);

  const [showModal, setShowModal] = useState<boolean>(false); // State for modal visibility

  return (
    <div className="flex flex-1 mr-2">
      {galleryImgs ? (
        <div
          onClick={() => setShowModal(true)}
          className="absolute hidden cursor-pointer	bg-neutral-700 md:flex md:items-center md:justify-center right-2 top-2 px-2 py-2 rounded-xl z-0 hover:opacity-75"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            height="100%"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            ></path>
          </svg>
        </div>
      ) : (
        ""
      )}
      {showModal ? (
        <>
          <div className=":bg-neutral-900 text-neutral-900 text-neutral-200 justify-center items-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="absolute z-50 left-0 top-0 flex items-start justify-end p-5 ">
              <button
                type="button"
                className="bg-neutral-900 text-neutral-900 text-neutral-200 rounded-md p-2 inline-flex items-center justify-center text-black hover:text-black-500 hover:bg-black-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setShowModal(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                  height="100%"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className=" w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg   flex flex-col w-full bg-white outline-none focus:outline-none">
                <ModalPhotos
                  imgs={images}
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
