import React from "react";
import { useQuery } from "react-query";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function AllOrdars() {
  let encodedToken = localStorage.getItem("userToken");
  let decodedToken = jwtDecode(encodedToken);

  function getAllOrders() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${decodedToken.id}`
    );
  }

  let { data, isLoading } = useQuery("allOrders", getAllOrders);

  return (
    <>
      <Helmet>
        <title>All Orders</title>
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
        <div className="container rounded">
          <h3 className="text-start fw-bold mt-4"> All Orders </h3>
          {data?.data.map((orders) => (
            <div key={orders.id} className="my-4">
              <div className="main   m-auto bg-info text-dark p-4 rounded">
                <h6 className="my-4 fw-bolder">
                  Order Id ={" "}
                  <span className="bg-main p-1 rounded">{orders.id}</span>{" "}
                </h6>
                <h6 className="my-4 fw-bolder">
                  Cart Items ={" "}
                  <span className="bg-main p-1 rounded">
                    {orders.cartItems.length}
                  </span>{" "}
                </h6>
                <h6 className="my-4 fw-bolder">
                  isDelivered :{" "}
                  <span className="bg-main p-1 rounded">
                    {orders.isDelivered ? "Yes" : "NO"}
                  </span>{" "}
                </h6>
                <h6 className="my-4 fw-bolder">
                  isPaid :
                  <span className="bg-main p-1 rounded">
                    {orders.isPaid ? "Yes" : "NO"}
                  </span>{" "}
                </h6>
                <h6 className="my-4 fw-bolder">
                  paidAt :{" "}
                  <span className="bg-main p-1 rounded">{orders.paidAt}</span>{" "}
                </h6>
                <h6 className="my-4 fw-bolder">
                  paymentMethodType :{" "}
                  <span className="bg-main p-1 rounded">
                    {orders.paymentMethodType}
                  </span>{" "}
                </h6>
                <h6 className="my-4 fw-bolder">
                  totalOrderPrice :{" "}
                  <span className="bg-main p-1 rounded">
                    {" "}
                    {orders.totalOrderPrice}
                  </span>
                </h6>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
