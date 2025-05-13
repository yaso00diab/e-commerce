import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Register = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name is too short")
      .max(12, "Name is too long")
      .required("Name is required"),
    email: Yup.string().email("Email not valid").required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        "Characters and numbers"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "rePassword should match password")
      .required("rePassword is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number")
      .required("Phone is required"),
  });

  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    isValid,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async () => {
      setErrMsg("");
      setIsLoading(true);
      let { data } = await axios
        .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
        .catch((err) => {
          setIsLoading(false);
          setErrMsg(err.response.data.message);
        });
      if (data.message === "success") {
        navigate("/login");
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Register | Fresh-Cart</title>
      </Helmet>
      <div className="w-50 mx-auto py-5">
        <h2>Register now:</h2>
        {errMsg && <div className="alert alert-danger">{errMsg}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="fullName">Name:</label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              className="form-control"
              type="text"
              id="fullName"
              name="name"
            />
            {errors.name && touched.name && (
              <p className="alert alert-danger">{errors.name}</p>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email">Email:</label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              className="form-control"
              type="email"
              id="email"
              name="email"
            />
            {errors.email && touched.email && (
              <p className="alert alert-danger">{errors.email}</p>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password">Password:</label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              className="form-control"
              type="password"
              id="password"
              name="password"
              autoComplete="on"
            />
            {errors.password && touched.password && (
              <p className="alert alert-danger">{errors.password}</p>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="rePassword">RePassword:</label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.rePassword}
              className="form-control"
              type="password"
              id="rePassword"
              name="rePassword"
              autoComplete="on"
            />
            {errors.rePassword && touched.rePassword && (
              <p className="alert alert-danger">{errors.rePassword}</p>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="phone">phone:</label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phone}
              className="form-control"
              type="tel"
              id="phone"
              name="phone"
            />
            {errors.phone && touched.phone && (
              <p className="alert alert-danger">{errors.phone}</p>
            )}
          </div>

          {isLoading ? (
            <button
              disabled
              type="button"
              className="btn bg-main px-4 text-white ms-auto d-block"
            >
              <i className="fas fa-spin fa-spinner px-3"></i>
            </button>
          ) : (
            <button
              disabled={!isValid}
              type="submit"
              className="btn bg-main px-3 text-white ms-auto d-block"
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Register;
