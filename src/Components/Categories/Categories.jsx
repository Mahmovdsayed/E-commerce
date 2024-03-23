import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Bars } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function Categories() {
  async function getCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data, isLoading } = useQuery("getCategories", getCategories);

  return (
    <>
      <Helmet>
        <title>Categories</title>
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
          <h2 className="fw-bold mb-3 text-center">Categories</h2>
          <div className="row g-4">
            {data?.data.data.map((categories) => (
              <div
                key={categories._id}
                className="col-sm-6 col-md-4  col-lg-3 "
              >
                <div className="categories position-relative  rounded   px-2">
                  <img
                    className="w-100 object-fit-cover rounded"
                    height={500}
                    src={categories.image}
                    alt={categories.name}
                  />
                </div>
                <h4 className="text-center mt-2 fw-bold">{categories.name}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
