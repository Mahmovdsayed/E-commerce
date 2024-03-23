import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ForgetPassword() {
  let navigate = useNavigate();

  async function handelePasswordSubmit(values) {
    let response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      values
    );

    if (response.data.statusMsg === "success") {
      toast.success(`${response.data.message}`, {
        duration: 2500,
        position: "top-right",
        style: { background: "#0aad0a", color: "#fff" },
      });
      navigate("/verify-code");
    } else if (response.data.statusMsg === "fail") {
      toast.error(`${response.data.message}`);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },

    onSubmit: handelePasswordSubmit,
  });

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <div className="container">
        <h3 className="my-4 fw-bold">please enter your Email</h3>
        <form onSubmit={formik.handleSubmit}>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            id="email"
            type="email"
            className="form-control"
            placeholder="enter your email"
          />
          <button type="submit" className="btn bg-main text-white mt-4">
            Verify
          </button>
        </form>
      </div>
    </>
  );
}
