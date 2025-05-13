import React from "react";
import notFoundImg from "../../Assets/SVGs/error.svg";

const NotFound = () => {
  return (
    <div className="container py-5">
      <img src={notFoundImg} className="w-50 mx-auto d-block" alt="NOT FOUND" />
    </div>
  );
};

export default NotFound;
