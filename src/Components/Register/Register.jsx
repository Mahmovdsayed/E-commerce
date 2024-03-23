import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function Register() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  async function submitRegister(values) {
    setisLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setisLoading(false);
        setError(err.response.data.message);
      });
    if (data.message === "success") {
      setisLoading(false);
      navigate("/login");
    }
  }

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const passwordRegExp = /^[A-Z][a-z0-9]{5,10}$/;

  let validatScheme = yup.object({
    name: yup
      .string()
      .min(3, "name minlength is 3")
      .max(10, "name max is 10")
      .required("name is required"),
    phone: yup
      .string()
      .matches(phoneRegExp, "phone is invalid")
      .required("phone is required"),
    email: yup.string().email("email is invalid").required("email is required"),
    password: yup
      .string()
      .matches(passwordRegExp, "password start with uppercase")
      .required("password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "password and repassword dont match")
      .required("repassword is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validatScheme,
    onSubmit: submitRegister,
  });

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="w-75 mx-auto py-5">
        {error !== null ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          ""
        )}

        <h3 className="mb-3 h1 fw-bold text-center">Register Now</h3>

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            type="text"
            id="name"
            className=" mb-2  form-control"
            name="name"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="phone">Phone:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            type="tel"
            id="phone"
            className="mb-2   form-control"
            name="phone"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}

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
            value={formik.values.password}
            type="password"
            id="password"
            className="  mb-2 form-control"
            name="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="rePassword">rePassword:</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            type="password"
            id="rePassword"
            className=" mb-2  form-control"
            name="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          {isLoading ? (
            <button className="btn bg-main text-white mt-3" type="button">
              <Bars
                height="20"
                width="100"
                color="#fff"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-center text-white mt-3"
            >
              Register
            </button>
          )}
          <Link
            className=" d-block mt-3 text-decoration-none text-muted text-start fw-lighter"
            to={"/login"}
          >
            Have an account already? Log in
          </Link>
        </form>
      </div>
    </>
  );
}
