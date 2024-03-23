import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Products() {
  let { addToCart } = useContext(CartContext);
  let headers = {
    token: localStorage.getItem("userToken"),
  };
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

  async function products() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { isLoading, data } = useQuery("Products", products, {
    cacheTime: 3000,
  });

  async function addProductToWishList(id) {
    let res = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        productId: id,
      },
      { headers }
    );
    if (res.data.status === "success") {
      toast.success("Product successfully added to wishlist", {
        duration: 2500,
        position: "top-left",
        style: { background: "#fff", color: "#191919" },
      });
    } else {
      toast.error(`Error adding product`);
    }
  }

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
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
        <div className="container py-4">
          <h2 className="fw-bold mb-3 text-center">All Products</h2>
          <div className="row g-4">
            {data?.data.data.map((product) => (
              <div key={product.id} className="col-sm-6 col-md-4  col-lg-3 ">
                <div className="product position-relative rounded cursor-pointer py-3 px-2">
                  <Link to={`/productdetails/${product.id}`}>
                    <img
                      className="w-100 rounded"
                      src={product.imageCover}
                      alt={product.title}
                    />
                    <span className="text-main font-sm fw-bolder">
                      {product.category.name}
                    </span>
                    <h3 className="h6">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="d-flex justify-content-between mt-3">
                      <span className="fw-bold">{product.price} EGP</span>
                      <span className="fw-bold">
                        <i className="fas fa-star rating-color"></i>{" "}
                        {product.ratingsAverage}
                      </span>
                    </div>
                    {/* <div className="brand position-absolute">
                      <img src={product.brand.image} alt={product.brand.name} />
                    </div> */}
                  </Link>
                  <button
                    className="btn bg-main text-white w-100 btn-sm mt-2"
                    onClick={() => addProductToCart(product.id)}
                  >
                    add to cart
                  </button>
                  <button
                    className="btn bg-primary text-white w-100 btn-sm mt-2"
                    onClick={() => addProductToWishList(product.id)}
                  >
                    add to Wish List
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
