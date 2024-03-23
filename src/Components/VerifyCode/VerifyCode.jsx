import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";

export default function VerifyCode() {
  let navigate = useNavigate();

  async function handeleVerifyCode(values) {
    let response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      values
    );

    if (response.data.status === "Success") {
      toast.success(`success`, {
        duration: 2500,
        position: "top-right",
        style: { background: "#0aad0a", color: "#fff" },
      });
      navigate("/reset-password");
    }
  }

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },

    onSubmit: handeleVerifyCode,
  });

  return (
    <>
      <Helmet>
        <title>verification code</title>
      </Helmet>
      <div className="container">
        <h3 className="my-4 fw-bold">please enter your verification code</h3>
        <form onSubmit={formik.handleSubmit}>
          <input
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="resetCode"
            id="resetCode"
            type="text"
            className="form-control"
            placeholder="enter your verification code"
          />
          <button type="submit" className="btn bg-main text-white mt-4">
            Verify
          </button>
        </form>
      </div>
    </>
  );
}
