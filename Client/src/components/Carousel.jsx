import React, { useState, useEffect } from "react";
import {
    FaChevronLeft as LeftSliderIcon,
    FaChevronRight as RightSliderIcon,
} from "react-icons/fa";

const Carousel = ({images }) => {


    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [activeIndex]);

    return (
        <div
            id="default-carousel"
            className="relative h-fit w-full flex items-center align-middle justify-center"
            data-carousel="slide"
        >
            {/* Carousel wrapper */}
            <div className="relative h-56 w-full overflow-hidden rounded-lg md:h-96 flex justify-center ">
                {images?.map((image, index) => (
                    
                    <div
                        className={`duration-700 ease-in-out ${
                            activeIndex === index ? "" : "hidden"
                        }`}
                        data-carousel-item
                        key={index}
                    >
                        <div className="h-full w-full flex justify-center bg-red-300">
                        <img
                            src={image.url}
                            className="absolute block w-fit h-full object-cover rounded"
                            alt={`Slide ${index + 1}`}
                        />
                        </div>
                    </div>
                ))}
            </div>

            {/* Slider indicators */}
            <div className="absolute flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse ">
                {images?.map((_, index) => (
                    <button
                        type="button"
                        className={`w-3 h-3 rounded-full ${
                            index === activeIndex ? "bg-white" : "bg-gray-300"
                        }`}
                        aria-current={index === activeIndex}
                        aria-label={`Slide ${index + 1}`}
                        data-carousel-slide-to={index}
                        key={index}
                    ></button>
                ))}
            </div>

            {/* Slider controls */}
            {images?.length > 1 && (
                <>
                    <div
                        className="absolute top-0 start-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        data-carousel-prev
                        onClick={() => {
                            setActiveIndex(
                                (prevIndex) => (prevIndex - 1) % images?.length
                            );
                        }}
                    >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <LeftSliderIcon />
                            <span className="sr-only">Previous</span>
                        </span>
                    </div>
                    <div
                        className="absolute top-0 end-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        data-carousel-next
                        onClick={() => {
                            setActiveIndex(
                                (prevIndex) => (prevIndex + 1) % images?.length
                            );
                        }}
                    >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <RightSliderIcon />
                            <span className="sr-only">Next</span>
                        </span>
                    </div>
                </>
            )}
        </div>
    );
};

export default Carousel;
