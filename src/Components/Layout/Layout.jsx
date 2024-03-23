import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Offline } from "react-detect-offline";
import Navbar from "../Navbar/Navbar";
import { UserContext } from "../../Context/UserContext";
export default function Layout() {
  let { setUserToken } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"));
    }
  });

  return (
    <>
      <Navbar />
      <div>
        <Offline>
          <div className="network">
            <i className="fas fa-wifi"></i> you are offline
          </div>
        </Offline>
      </div>
      <Outlet></Outlet>
    </>
  );
}
