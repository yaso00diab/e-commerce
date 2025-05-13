import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "../../Context/AuthContext";
import { Helmet } from "react-helmet";

export default function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserIsLoggedIn } = useContext(authContext);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email Is Required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Enter Valid Email"
      ),
    password: Yup.string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)
      .required("Password is required"),
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
      email: "try@try.com",
      password: "Test1234",
    },
    onSubmit: async () => {
      setErrorMsg("");
      try {
        setIsLoading(true);
        let { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        );
        if (data.message === "success") {
          localStorage.setItem("token", data.token);
          setUserIsLoggedIn(true);
          if (window.location.pathname === "/login") {
            navigate("/home");
          } else {
            navigate(window.location.pathname);
          }
        }
      } catch (error) {
        setErrorMsg(error.response.data.message);
      }
      setIsLoading(false);
    },
    validationSchema,
  });

  return (
    <>
      <Helmet>
        <title>Login | Fresh-Cart</title>
      </Helmet>
      <div className="w-50 m-auto my-5">
        <h1>Login Now :</h1>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            className="form-control mb-3"
            type="email"
            id="email"
            name="email"
          />
          {errors.email && touched.email && (
            <p className="alert alert-warning">{errors.email}</p>
          )}

          <label htmlFor="password">Password:</label>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            className="form-control mb-3"
            type="password"
            id="password"
            name="password"
            autoComplete="off"
          />
          {errors.password && touched.password && (
            <p className="alert alert-warning">{errors.password}</p>
          )}
          <Link to={"/forgetpassword"}>Forget Password ?</Link>

          {isLoading ? (
            <button
              disabled
              type="button"
              className="btn bg-main px-2 text-white ms-auto d-block"
            >
              <i className="fas fa-spin fa-spinner px-3"></i>
            </button>
          ) : (
            <button
              disabled={!isValid}
              type="submit"
              className="btn bg-main px-3 text-white ms-auto d-block"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}
