import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function VerifyResetCode() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    resetCode: Yup.number().required("Reset Code Is Required"),
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
      resetCode: "",
    },
    onSubmit: async () => {
      setIsLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      console.log(data);
      setIsLoading(false);
      if (data.status === "Success") {
        navigate("/resetpassword");
      }
    },
    validationSchema,
  });

  return (
    <form onSubmit={handleSubmit} className="w-75 m-auto my-5">
      <label htmlFor="number">Please Enter Reset Code :</label>
      <input
        value={values.resetCode}
        onChange={handleChange}
        onBlur={handleBlur}
        type="text"
        className="form-control my-3"
        id="resetCode"
        name="resetCode"
      />
      {errors.resetCode && touched.resetCode && (
        <p className="alert alert-danger">{errors.resetCode}</p>
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
