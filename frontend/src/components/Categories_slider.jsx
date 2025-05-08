import Slider from "./Slider";

const Categories_slider = () => {
  const slides = [
    "slide1.webp",
    "slide2.webp",
    "slide3.jpg",
    "7_banner.jpg",
    "nin.webp",
  ];
  return (
    <>
      <br />
      <Slider autodslide={true} autoslideInterval={3000}>
        {slides.map((slide, index) => (
          <img src={slide} alt="" />
        ))}
      </Slider>
    </>
  );
};
export default Categories_slider;
