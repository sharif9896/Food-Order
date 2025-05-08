import Slider from "./Slider";

const Slide_container = () => {
  const foodSlides = [
    {
      image: "bb.jpg",
      tag: "Special Offer",
      title: "Premium Pizzas",
      description:
        "Get 50% off on all large pizzas! Limited time offer. Order now and enjoy cheesy goodness.",
      discountPrice: "560",
      originalPrice: "599.00",
      buttonText: "Order Now",
    },
    {
      image: "bu.png",
      tag: "New Arrival",
      title: "Gourmet Burgers",
      description:
        "Try our new juicy beef burgers with secret sauce. Comes with free fries and drink!",
      discountPrice: "450",
      originalPrice: "480.00",
      buttonText: "Customize Order",
    },
    {
      image: "v.jpg",
      tag: "Popular Choice",
      title: "Fresh Sushi Platters",
      description:
        "Authentic Japanese sushi made with fresh ingredients. Free delivery on orders above $30",
      discountPrice: "430",
      originalPrice: "490.00",
      buttonText: "View Menu",
    },
  ];

  return (
    <div className="App">
      <Slider slides={foodSlides} />
    </div>
  );
};

// import Slider from "./Slider";

// const Slide_container = () => {
//   const slides = [
//     {
//       url: "https://source.unsplash.com/random/1200x500?nature",
//       title: "Nature",
//       description: "Discover the beauty of nature",
//     },
//     {
//       url: "https://source.unsplash.com/random/1200x500?mountains",
//       title: "Mountains",
//       description: "Explore majestic peaks",
//     },
//     {
//       url: "https://source.unsplash.com/random/1200x500?ocean",
//       title: "Ocean",
//       description: "Dive into deep blue waters",
//     },
//   ];

//   return (
//     <div className="App">
//       <Slider slides={slides} />
//     </div>
//   );
// };

// // import Slider from "./Slider";

// // const Slide_container = () => {
// //   const slides = [
// //     "p4.jpg",
// //     "slide3.jpg",
// //     "7_banner.jpg",
// //     "nin.webp",
// //   ];
// //   return (
// //     <>
// //       <br />
// //       <Slider autodslide={true} autoslideInterval={3000}>
// //         {slides.map((slide, index) => (
// //           <img key={index} style={{width:"100%"}} src={slide} alt="" />
// //         ))}
// //       </Slider>
// //     </>
// //   );
// // };
export default Slide_container;
