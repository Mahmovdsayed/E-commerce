import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { useRef } from "react";
import { Helmet } from "react-helmet";

export default function ResetUserPassword() {
  async function handeleResetCode(values) {
    let response = await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then((response) => response)
      .catch((error) => error);

    console.log(response);
  }

  const ref = useRef(null);

  const passwordRegExp = /^[A-Z][a-z0-9]{5,10}$/;

  let validatScheme = yup.object({
    email: yup.string().email("email is invalid").required("email is required"),
    password: yup
      .string()
      .matches(passwordRegExp, "password start with uppercase")
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validatScheme,
    onSubmit: handeleResetCode,
  });

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className="container">
        <h3 className="my-4 fw-bold">reset your account password</h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            id="email"
            className=" mb-2  form-control"
            name="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="password">Password:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            ref={ref}
            type="password"
            id="password"
            className="  mb-2 form-control"
            name="password"
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.newPassword}
            </div>
          ) : (
            ""
          )}

          <button
            type="submit"
            className="btn bg-main text-center text-white mt-3"
          >
            reset password
          </button>
        </form>
      </div>
    </>
  );
}
