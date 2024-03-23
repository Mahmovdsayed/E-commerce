import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {
  const settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 1000,
    speed: 500,
    arrows: false,

    slidesToShow: 4,
    slidesToScroll: 1,
  };
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data } = useQuery("categorySlider", getCategories);
  return (
    <>
      <div className="container my-3">
        <h3 className="my-3">Shop Popular Categories</h3>
        {data?.data.data ? (
          <Slider {...settings}>
            {data?.data.data.map((category) => (
              <img
                key={category._id}
                className="w-100 object-fit-cover "
                height={400}
                src={category.image}
                alt=""
              />
            ))}
          </Slider>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
