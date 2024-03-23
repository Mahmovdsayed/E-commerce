import React from "react";
import jwtDecode from "jwt-decode";
import { Helmet } from "react-helmet";
import AllOrdars from "../AllOrdars/AllOrdars";
import Wishlist from "../Wishlist/Wishlist";
import Cart from "../Cart/Cart";
export default function Profile() {
  let encodedToken = localStorage.getItem("userToken");
  let decodedToken = jwtDecode(encodedToken);

  return (
    <>
      <div className="banner object-fit-cover w-100 ">
        <div className="main-image"></div>
      </div>
      <div className="container">
        <div className="hero-text mt-4 pt-5 text-center">
          <h2 className="fw-bolder h1">{decodedToken.name}</h2>
          <h2 className="fw-bolder my-3 h6"> ID : {decodedToken.id}</h2>
          <h2 className="fw-bolder h6"> Role : {decodedToken.role}</h2>
        </div>
      </div>
      <Cart />
      <Wishlist />
      <AllOrdars />
      <Helmet>
        <title>Profile | {decodedToken.name}</title>
      </Helmet>
    </>
  );
}
