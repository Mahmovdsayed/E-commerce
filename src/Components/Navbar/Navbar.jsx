import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let { UserToken, setUserToken } = useContext(UserContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="fresh cart logo" />
          </Link>
          <button
            className="navbar-toggler  border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              {UserToken !== null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/products">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/categories">
                      Categories
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link className="nav-link" to="/brands">
                      Brands
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/wishlist">
                      Wishlist
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {UserToken !== null ? (
                <>
                  <li className="nav-item">
                    <span
                      onClick={() => logOut()}
                      className="btn btn-danger cursor-pointer  w-100"
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mx-2 my-1">
                    <Link
                      className=" btn btn-primary text-white  w-100"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item mx-2 my-1">
                    <Link
                      className=" btn bg-main text-white w-100"
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
