import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import './FoodSlider.css';

const Slider = ({slides}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const slides = useSelector((state) => state.items); // Assuming you have a Redux store with slides
  useEffect(() => {
    //   const interval = setInterval(() => {
    //     setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    //   }, 5000);

    //   return () => clearInterval(interval);
    // }, [currentSlide, slides.length]);

    const sliderContainer = document.querySelector(".food-slider-container");
    let interval;

    const startInterval = () => {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 5000);
    };

    startInterval();

    const handleMouseEnter = () => clearInterval(interval);
    const handleMouseLeave = () => startInterval();

    sliderContainer.addEventListener("mouseenter", handleMouseEnter);
    sliderContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearInterval(interval);
      sliderContainer.removeEventListener("mouseenter", handleMouseEnter);
      sliderContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [currentSlide, slides.length]);

  const goToSlide = (index) => setCurrentSlide(index);
  const goToNext = () => setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  const goToPrev = () => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="food-slider-container">
      <div
        className="food-slider"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="food-slide"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="food-content">
              <h3 className="food-tag">{slide.tag}</h3>
              <h2 className="food-title">{slide.title}</h2>
              <p className="food-description">{slide.description}</p>
              <div className="price-container">
                <span className="discount-price">₹{slide.discountPrice}/-</span>
                <span className="original-price">₹{slide.originalPrice}/-</span>
              </div>
              <button className="order-button">{slide.buttonText}</button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <button className="nav-btn prev-btn" onClick={goToPrev}>
        &#10094;
      </button>
      <button className="nav-btn next-btn" onClick={goToNext}>
        &#10095;
      </button>

      <div className="food-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`food-dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;

// import { useState, useEffect } from "react";
// // import './ImageSlider.css';

// const Slider = ({ slides }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Auto-slide functionality
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [currentSlide, slides.length]);

//   // Manual slide functions
//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   const goToNext = () => {
//     setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//   };

//   const goToPrev = () => {
//     setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
//   };

//   return (
//     <div className="slider-container">
//       <div
//         className="slider"
//         style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//       >
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             className="slide"
//             style={{ backgroundImage: `url(${slide.url})` }}
//           >
//             <div className="slide-content">
//               <h2>{slide.title}</h2>
//               <p>{slide.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation buttons */}
//       <button className="slider-btn prev-btn" onClick={goToPrev}>
//         &#10094;
//       </button>
//       <button className="slider-btn next-btn" onClick={goToNext}>
//         &#10095;
//       </button>

//       {/* Dots indicator */}
//       <div className="dots-container">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`dot ${index === currentSlide ? "active" : ""}`}
//             onClick={() => goToSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;

// // import { useEffect, useState } from "react";
// // import { FaChevronRight } from "react-icons/fa";
// // import { FaChevronLeft } from "react-icons/fa";
// // const Slider = ({ children: slides, autodslide = false, autoslideInterval = 3000 }) => {
// //     const [curr,setcurr] = useState(0);

// //     const prev = () =>{
// //         setcurr((curr)=> curr === 0 ? slides.length - 1 : curr - 1);
// //     }
// //     const next = () =>{
// //         setcurr((curr)=> curr === slides.length - 1 ? 0 : curr + 1);
// //     }

// //     useEffect(() => {
// //         if(!autodslide) return;
// //         const slidesetInterval = setInterval(next, autoslideInterval);
// //         return () => clearInterval(slidesetInterval);
// //     }, []);
// //   return (
// //     <>
// //       <div className="overflow-hidden relative w-[100%]">
// //         <div className="flex transition:transform ease-out duration-500 w-[100%]" style={{transform:`translateX(-${curr * 100}%)`}}>{slides}</div>
// //         <div className="absolute inset-0 flex items-center justify-between p-4">
// //           <button onClick={prev} className="p-1 rounded-full  shadow bg-gray-100 opacity-30 hover:opacity-100 cursor-pointer text-gray-800 hover:bg-white ">
// //             <FaChevronLeft className="text-gray-800" size={40}/>
// //           </button>
// //           <button onClick={next} className="p-1 rounded-full shadow bg-gray-100 opacity-30 hover:opacity-100 cursor-pointer text-gray-800 hover:bg-white">
// //             <FaChevronRight size={40}/>
// //           </button>
// //         </div>
// //         <div className="absolute bottom-4 left-0 right-0">
// //             <div className="flex justify-center">
// //                 {slides.map((_,index) => (
// //                     <div key={index} onClick={()=>setcurr(index)} className={`cursor-pointer w-2 h-2 mx-2 rounded-full bg-white ${curr === index ? "p-[6px]" : "bg-opacity-50"}`}></div>
// //                 ))}
// //             </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };
// // export default Slider;
