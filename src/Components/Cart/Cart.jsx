import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  let { getLoggedUserCart, removeCartItem, updateProductQuantity, clearCart } =
    useContext(CartContext);
  const [cartDetails, setcartDetails] = useState(null);

  async function removeItem(id) {
    let { data } = await removeCartItem(id);
    setcartDetails(data);
  }

  async function updateCount(id, count) {
    let { data } = await updateProductQuantity(id, count);
    setcartDetails(data);
  }
  async function clearUserCart() {
    let { data } = await clearCart();
  }

  async function getCart() {
    let { data } = await getLoggedUserCart();
    setcartDetails(data);
  }
  useEffect(() => {
    getCart()
  });

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartDetails ? (
        <div className="container">
          <div className=" mt-4 mx-auto p-3 bg-main-light rounded">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className=" fw-bold">Shopping Cart</h3>
              <button
                onClick={() => {
                  clearUserCart();
                }}
                className="btn btn-outline-warning text-black btn"
              >
                Clear Cart
              </button>
            </div>
            <div className="d-flex justify-content-between flex-row-reverse align-items-center my-4">
              <h4 className="h6 text-main">
                Cart Items:{" "}
                <span className="fw-bold text-muted">
                  {cartDetails.numOfCartItems}
                </span>{" "}
              </h4>
              <h4 className="h6 text-main">
                {" "}
                Total Cart Price :{" "}
                <span className="fw-bold text-muted">
                  {cartDetails.data.totalCartPrice} EGP
                </span>
              </h4>
            </div>
            {cartDetails.data.products.map((product) => (
              <div
                key={product.product.id}
                className="row align-items-center border-bottom py-5 g-4"
              >
                <div className="col-md-2">
                  <img
                    className="w-100"
                    src={product.product.imageCover}
                    alt=""
                  />
                </div>
                <div className="col-md-10">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className="h5 fw-bold  ">{product.product.title}</h3>
                      <h6 className="text-main my-3 fw-bolder">
                        Price : {product.price} EGP
                      </h6>
                      <div>
                        <button
                          onClick={() =>
                            updateCount(product.product.id, product.count + 1)
                          }
                          className="btn fw-bold btn-warning text-white "
                        >
                          +
                        </button>
                        <span className="fw-bold mx-3 fs-5">
                          {product.count}
                        </span>
                        <button
                          onClick={() =>
                            updateCount(product.product.id, product.count - 1)
                          }
                          className="btn fw-bold btn-danger text-white"
                        >
                          -
                        </button>
                      </div>

                      <span
                        onClick={() => {
                          removeItem(product.product.id);
                        }}
                        className="btn mt-3  btn-outline-danger"
                      >
                        {" "}
                        <i className="fas fa-trash-can"></i> Remove
                      </span>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-center align-items-center my-4">
              <Link
                className="btn bg-primary text-decoration-none btn-lg me-2 text-white"
                to={"/address"}
              >
                Online Payment
              </Link>
              <Link
                className="btn  bg-main btn-lg ms-2 text-white"
                to={"/address"}
              >
                Cash on Delivery
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className=" mt-4 mx-auto p-3 bg-main-light rounded">
            <h3 className=" fw-bold">Shopping Cart</h3>
            <h3 className=" my-4 fw-bolder">your cart is empty</h3>
          </div>
        </div>
      )}
    </>
  );
}
