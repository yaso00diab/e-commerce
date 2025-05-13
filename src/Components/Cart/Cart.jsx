import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import CartProduct from "../CartProduct/CartProduct";
import { BallTriangle } from "react-loader-spinner";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";

const Cart = () => {
  const [cart, setCart] = useState({});
  const [cartId, setCartId] = useState();
  const [timeOutId, setTimeOutId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { setCart: contextSetCart } = useContext(cartContext);

  async function getLoggedUserCart() {
    try {
      setIsLoading(true);
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCart(data);
      setCartId(data.data._id);
    } catch (error) {}
    setIsLoading(false);
  }

  function removeProductFromCart(productId) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger me-3",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          let { data } = await axios.delete(
            "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
          contextSetCart(data);
          setCart(data);
          swalWithBootstrapButtons.fire({
            title: "Removed!",
            text: "Your file has been removed.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  }

  function clearCart() {
    Swal.fire({
      title: "Are you sure?",
      text: "This cart will be cleared!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0aad0a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let { data } = await axios.delete(
          "https://ecommerce.routemisr.com/api/v1/cart",
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setCart(data);
        contextSetCart({});
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }

  function updateCartProductCount(productId, count) {
    clearTimeout(timeOutId);
    setTimeOutId(
      setTimeout(async () => {
        if (count === 0) {
          removeProductFromCart(productId);
        } else {
          let { data } = await axios.put(
            "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
            {
              count,
            },
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
          setCart(data);
        }
      }, 500)
    );
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart | Fresh-Cart</title>
      </Helmet>

      {isLoading ? (
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
      ) : (
        <>
          {cart.data?.products.length > 0 ? (
            <div className="my-5">
              <button
                onClick={clearCart}
                className="btn btn-outline-danger d-block ms-auto"
              >
                Clear Cart
              </button>

              {cart.data?.products.map((cartProduct) => {
                return (
                  <CartProduct
                    updateCartProductCount={updateCartProductCount}
                    removeProductFromCart={removeProductFromCart}
                    key={cartProduct._id}
                    cartProduct={cartProduct}
                  />
                );
              })}

              <div className="d-flex justify-content-between">
                <Link
                  to={"/address/" + cartId}
                  className="btn bg-main text-white"
                >
                  CheckOut
                </Link>
                <p>Total cart Price: {cart.data?.totalCartPrice} EGP</p>
              </div>
            </div>
          ) : (
            <h2 className="alert alert-warning text-center py-4 my-4">
              No Products In Your cart
            </h2>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
