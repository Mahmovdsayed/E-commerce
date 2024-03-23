import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Bars } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function Brands() {
  async function getBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data, isLoading } = useQuery("getBrands", getBrands);

  return (
    <>
      <Helmet>
        <title>Brands</title>
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
          <h2 className="fw-bold mb-3 text-center">All Brands</h2>
          <div className="row g-4">
            {data?.data.data.map((brands) => (
              <div key={brands._id} className="col-sm-6 col-md-4  col-lg-3 ">
                <div className="brands position-relative maino rounded  px-2">
                  <img
                    className="w-100 mixo rounded"
                    src={brands.image}
                    alt={brands.name}
                  />
                </div>
                {/* <h3 className='text-center mt-2 fw-bold'>{brands.name}</h3> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
