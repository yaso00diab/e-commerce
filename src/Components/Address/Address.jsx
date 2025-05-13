import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

export default function Address() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let { cartId } = useParams();

  const validationSchema = Yup.object({
    details: Yup.string().required("Details Is Required"),
    city: Yup.string().required("City Is Required"),
    phone: Yup.string()
      .required("Phone Is Required")
      .matches(/^01[0125][0-9]{8}$/, "Enter Valid Phone Number"),
  });

  async function onSubmit() {
    setIsLoading(true);
    setErrorMsg("");
    try {
      console.log(values);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            url: "http://localhost:3000",
          },
        }
      );
      // console.log(data.session.url);
      window.open(data.session.url, "_self");
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
    setIsLoading(false);
  }

  const {
    handleSubmit,
    values,
    handleChange,
    errors,
    touched,
    handleBlur,
    isValid,
  } = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit,
    validationSchema,
  });
  return (
    <>
      <div className="w-75 m-auto my-5">
        <h1>Address :</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="details" className="my-1">
            Details:
          </label>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.details}
            type="text"
            className="form-control mb-3"
            id="details"
            name="details"
          />
          {errors.details && touched.details && (
            <p className="alert alert-danger"> {errors.details} </p>
          )}

          <label htmlFor="city" className="my-1">
            City:
          </label>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.city}
            type="text"
            className="form-control mb-3"
            id="city"
            name="city"
          />
          {errors.city && touched.city && (
            <p className="alert alert-danger"> {errors.city} </p>
          )}

          <label htmlFor="phone" className="my-1">
            Phone:
          </label>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.phone}
            type="tel"
            className="form-control mb-3"
            id="phone"
            name="phone"
          />
          {errors.phone && touched.phone && (
            <p className="alert alert-danger"> {errors.phone} </p>
          )}

          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

          {isLoading ? (
            <button
              type="button"
              className="btn bg-main px-3 text-white ms-auto d-block px-4"
            >
              <i className="fas fa-spin fa-spinner"></i>
            </button>
          ) : (
            <button
              disabled={isLoading || !isValid}
              type="submit"
              className="btn bg-main px-3 text-white ms-auto d-block"
            >
              Checkout
            </button>
          )}
        </form>
      </div>
    </>
  );
}
