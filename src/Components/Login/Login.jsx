import React, { useContext, useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
  let { setUserToken, setuserData } = useContext(UserContext);
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  async function loginSubmit(values) {
    setisLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setisLoading(false);
        setError(err.response.data.message);
      });
    if (data.message === "success") {
      setisLoading(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      setuserData(data.user);
      navigate("/");
    }
  }

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
      password: "",
    },
    validationSchema: validatScheme,
    onSubmit: loginSubmit,
  });

  return (
    <>
      <div className="w-75 mx-auto py-5">
        {error !== null ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          ""
        )}

        <h3 className="mb-3 h1 fw-bold text-center">Login Now</h3>

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
              Login
            </button>
          )}
          <Link
            className="d-block mt-3 text-decoration-none text-main text-start fw-lighter"
            to={"/forget-password"}
          >
            forget your password ?
          </Link>
          <Link
            className="d-block mt-3 text-decoration-none text-muted text-start fw-lighter"
            to={"/register"}
          >
            Don't have an account? Sign up
          </Link>
        </form>
      </div>
      <Helmet>
        <title>Login</title>
      </Helmet>
    </>
  );
}
