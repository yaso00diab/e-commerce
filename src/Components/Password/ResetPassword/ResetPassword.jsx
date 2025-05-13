import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email Is Required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Enter Valid Email"
      ),
    newPassword: Yup.string()
      .required(" New Password Is Required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        "Special Charcters and digits"
      ),
  });

  const {
    values,
    handleSubmit,
    handleChange,
    touched,
    handleBlur,
    errors,
    isValid,
  } = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: async () => {
      setIsLoading(true);
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      // console.log(data);
      localStorage.setItem("token", data.token);
      navigate("/login");
      setIsLoading(false);
    },
    validationSchema,
  });

  return (
    <form onSubmit={handleSubmit} className="w-75 m-auto my-5">
      <label htmlFor="email">Please Enter Your Email :</label>
      <input
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        type="email"
        className="form-control my-3"
        id="email"
        name="email"
      />
      {errors.email && touched.email && (
        <p className="alert alert-danger">{errors.email}</p>
      )}

      <label htmlFor="newPassword">Please Enter New Password :</label>
      <input
        value={values.newPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        type="password"
        className="form-control my-3"
        id="newPassword"
        name="newPassword"
        autoComplete="on"
      />
      {errors.newPassword && touched.newPassword && (
        <p className="alert alert-danger">{errors.newPassword}</p>
      )}

      {isLoading ? (
        <button
          disabled
          type="button"
          className="btn bg-main px-2 text-white ms-auto d-block"
        >
          {" "}
          <i className="fas fa-spin fa-spinner px-3"></i>{" "}
        </button>
      ) : (
        <button
          disabled={!isValid}
          type="submit"
          className="btn bg-main px-3 text-white ms-auto d-block"
        >
          Send
        </button>
      )}
    </form>
  );
}
