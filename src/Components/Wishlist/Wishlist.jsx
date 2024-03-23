import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";
import jwtDecode from "jwt-decode";

export default function Wishlist() {
  let encodedToken = localStorage.getItem("userToken");
  let decodedToken = jwtDecode(encodedToken);
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  async function removeWishListItem(id) {
    await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      { headers }
    );

    window.location.reload();
  }

  function getWishList() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers,
    });
  }
  let { data } = useQuery("getWishList", getWishList);
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

  return (
    <>
      <Helmet>
        <title>{decodedToken.name} Wish List</title>
      </Helmet>
      <div className="container">
        <div className="main m-auto rounded my-5  bg-body-secondary p-4">
          <h3 className="fw-bold text-center">Wish List</h3>
          {data?.data.data.map((wishlist) => (
            <div
              key={wishlist.id}
              className="row d-flex justify-content-between align-items-center g-4"
            >
              <div className="col-md-2">
                <img
                  className="w-100 my-3 rounded shadow-sm"
                  src={wishlist.imageCover}
                  alt={wishlist.title}
                />
              </div>
              <div className="col-md-10">
                <div className="heros">
                  <div className="info">
                    <h6 className="fw-bolder">{wishlist.title}</h6>
                    <p>{wishlist.description}</p>
                    <h6 className="fw-bolder text-main my-3">
                      {wishlist.price}EGP
                    </h6>
                    <span
                      className="btn btn-sm btn-outline-danger me-2"
                      onClick={() => removeWishListItem(wishlist.id)}
                    >
                      {" "}
                      <i className="fas fa-trash-can"></i> Remove
                    </span>
                    <button
                      className="btn  btn-sm bg-main text-white ms-2"
                      onClick={() => addProductToCart(wishlist.id)}
                    >
                      add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
