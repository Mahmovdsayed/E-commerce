import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { Bars } from "react-loader-spinner";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

import { toast } from "react-hot-toast";
import Slider from "react-slick";
export default function ProductDetails() {
  let { addToCart } = useContext(CartContext);

  async function addProductToCart(id) {
    let res = await addToCart(id);
    if (res.data.status === "success") {
      toast.success("Product successfully added", {
        duration: 2500,
        position: "top-right",
        style: { background: "#0aad0a", color: "#fff" },
      });
    } else {
      toast.error(`Error adding product`);
    }
  }
  let { productid } = useParams();

  function getProductDetails() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productid}`
    );
  }

  let { data, isLoading } = useQuery("productDetails", () =>
    getProductDetails()
  );
  const settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {isLoading ? (
        <div className=" d-flex justify-content-center align-items-center min-vh-100">
          <Bars
            height="100"
            width="100"
            color="#0aad0a"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="container">
          {data?.data.data ? (
            <div
              key={data?.data.data.id}
              className="row py-5 g-4 gx-5 d-flex justify-content-center align-items-center"
            >
              <div className="col-md-4">
                <Slider className="mb-4" {...settings}>
                  {data?.data.data.images.map((img) => (
                    <img
                      key={data?.data.data.id}
                      src={img}
                      className="w-100 rounded"
                      alt={data?.data.data.title}
                    />
                  ))}
                </Slider>
              </div>
              <div className="col-md-8">
                <h2 className="h5">{data?.data.data.title}</h2>
                <p className="text-muted py-3">{data?.data.data.description}</p>
                <h6 className="text-main">{data?.data.data.category.name}</h6>
                <h6 className="fw-bold my-3">
                  Price {data?.data.data.price} EGP
                </h6>
                <div className="d-flex justify-content-between">
                  <span>
                    Ratings Quantity : {data?.data.data.ratingsQuantity}
                  </span>
                  <span>
                    <i className="fas fa-star rating-color"></i>{" "}
                    {data?.data.data.ratingsAverage}
                  </span>
                </div>
                <button
                  className="btn bg-main text-white w-100 mt-3"
                  onClick={() => addProductToCart(data?.data.data.id)}
                >
                  Add to cart{" "}
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* <Helmet>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
            />
            <meta name="theme-color" content="#0aad0a" />
            <link
              rel="shortcut icon"
              href={data?.data.data.brand.image}
              type="image/x-icon"
            />
            <meta name="description" content={data?.data.data.description} />
            <meta name="twitter:app:country" content={"egypt"} />
            <meta name="twitter:creator" content={"mahmoud sayed"} />
            <meta
              name="twitter:description"
              content={data?.data.data.description}
            />
            <meta name="twitter:title" content={data?.data.data.title} />
            <meta property="og:title" content={data?.data.data.title} />
            <meta name="og:description" content={data?.data.data.description} />
            <title>{data?.data.data.title}</title>
            {data?.data.data.images[0] ? (
              <meta property="og:image" content={data?.data.data.images[0]} />
            ) : null}
            {data?.data.data.images[0] ? (
              <meta name="twitter:image" content={data?.data.data.images[0]} />
            ) : null}
          </Helmet> */}
        </div>
      )}
    </>
  );
}
