import React from "react";
import Slider from "react-slick";
import slide1 from "../../Assets/images/slider-image-1.jpeg";
import slide2 from "../../Assets/images/slider-image-2.jpeg";
import slide3 from "../../Assets/images/slider-image-3.jpeg";

export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className=" container my-3">
        <Slider {...settings}>
          <img
            src={slide1}
            height={400}
            className=" rounded object-fit-cover"
            alt="slide1"
            loading="lazy"
          />
          <img
            src={slide2}
            height={400}
            className=" rounded object-fit-cover"
            alt="slide2"
            loading="lazy"
          />
          <img
            height={400}
            src={slide3}
            className=" rounded object-fit-cover"
            alt="slide3"
            loading="lazy"
          />
        </Slider>
      </div>
    </>
  );
}
