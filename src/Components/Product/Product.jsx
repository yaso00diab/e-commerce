import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { cartContext } from "../../Context/CartContext";
import { authContext } from "../../Context/AuthContext";

const Product = ({ product }) => {
  const { setCart } = useContext(cartContext);
  const { userIsLoggedIn } = useContext(authContext);

  async function addProductToCart(productId) {
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setCart(data);
    toast.success(data.message, {
      autoClose: 2000,
      draggable: true,
    });
  }

  function doToast() {
    toast.error("Login First");
  }

  return (
    <>
      {userIsLoggedIn ? (
        <div className="product overflow-hidden px-2 py-3 cursor-pointer">
          <Link to={"/productDetails/" + product.id} className="a">
            <img
              className="w-100"
              src={product.imageCover}
              alt={product.title}
            />
            <h5 className="font-sm text-main pt-sm-3">
              {product.category.name}
            </h5>
            <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
            <p className="d-flex justify-content-between">
              <span>{product.price} EGP</span>
              <span>
                <i className="fas fa-star rating-color me-1"></i>
                {product.ratingsAverage}
              </span>
            </p>
          </Link>
          <button
            onClick={() => addProductToCart(product.id)}
            className="btn bg-main text-white w-100 "
          >
            +Add To Cart
          </button>
        </div>
      ) : (
        <>
          <a onClick={() => doToast()} className="a">
            <img
              className="w-100"
              src={product.imageCover}
              alt={product.title}
            />
            <h5 className="font-sm text-main pt-sm-3">
              {product.category.name}
            </h5>
            <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
            <p className="d-flex justify-content-between">
              <span>{product.price} EGP</span>
              <span>
                <i className="fas fa-star rating-color me-1"></i>
                {product.ratingsAverage}
              </span>
            </p>
          </a>
        </>
      )}
    </>
  );
};

export default Product;
