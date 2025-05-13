import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email Is Required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "This Email Is Not Exist"
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
    },
    onSubmit: async () => {
      setIsLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      console.log(data);
      setIsLoading(false);
      if (data.statusMsg === "success") {
        navigate("/verifyresetcode");
      }
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
        placeholder="Email..."
      />
      {errors.email && touched.email && (
        <p className="alert alert-danger">{errors.email}</p>
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
