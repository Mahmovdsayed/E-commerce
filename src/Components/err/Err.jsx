import React from "react";
import logo from "../../Assets/images/error.svg";
export default function Err() {
  return (
    <div className="container">
      <img src={logo} className="w-100 mt-4" alt="err" />
    </div>
  );
}
