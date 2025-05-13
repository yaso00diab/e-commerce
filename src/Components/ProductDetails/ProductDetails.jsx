import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { cartContext } from "../../Context/CartContext";

const ProductDetails = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { setCart } = useContext(cartContext);

  async function getProductDetails() {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/" + id
    );
    setProductDetails(data.data);
    setIsLoading(false);
  }

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

  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <>
      {isLoading ? (
        <>
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass="justify-content-center py-5"
            visible={true}
          />
        </>
      ) : (
        <div className="row align-items-center py-5">
          <div className="col-md-3">
            <Slider {...settings}>
              {productDetails.images?.map((image) => {
                return (
                  <img
                    src={image}
                    key={productDetails.id}
                    className="w-100"
                    alt={productDetails.title}
                  />
                );
              })}
            </Slider>
          </div>
          <div className="col-md-9 mt-4">
            <h2 className="mt-2">{productDetails?.title}</h2>
            <h5 className="font-sm text-main mt-2">
              {productDetails?.category?.name}
            </h5>
            <p className="mt-2">{productDetails?.description}</p>
            <p className="d-flex justify-content-between mt-2">
              <span>{productDetails?.price} EGP</span>
              <span>
                <i className="fas fa-star rating-color me-1"></i>
                <span>{productDetails?.ratingsAverage}</span>
              </span>
            </p>
            <button
              onClick={() => addProductToCart(id)}
              className="btn bg-main text-white w-100 mt-2"
            >
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
