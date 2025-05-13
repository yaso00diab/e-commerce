import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getUserOrders(id) {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/orders/user/" + id
    );
    setIsLoading(false);
    setOrders(data);
  }

  useEffect(() => {
    const { id } = jwtDecode(localStorage.getItem("token"));
    getUserOrders(id);
  }, []);

  return (
    <>
      <Helmet>
        <title>Orders | Fresh-Cart</title>
      </Helmet>
      <h1 className="text-center pt-3">Your Orders</h1>
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
          {orders.length > 0 ? (
            <>
              {orders.map((order) => {
                return (
                  <div key={order.id} className="row">
                    <div className="order shadow rounded p-4 my-5">
                      <div className="d-flex align-items-center">
                        <h2 className="fw-bolder">#{order.id}</h2>
                        <h4 className="fw-bold text-primary mx-4">
                          Processing
                        </h4>
                      </div>
                      <p>You Have Orderd {order.cartItems.length} items</p>
                      <div className="d-flex">
                        {order.cartItems.map((item) => {
                          return (
                            <img
                              src={item.product.imageCover}
                              style={{ width: 150 }}
                              className="img-thumbnail mx-1 mb-2"
                              key={item._id}
                            />
                          );
                        })}
                      </div>
                      <p>
                        {" "}
                        <strong>Total amount:</strong>
                        {order.totalOrderPrice} EGP
                      </p>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <h2 className="alert alert-warning text-center py-4 my-4">
              No Orders Yet
            </h2>
          )}
        </>
      )}
    </>
  );
};

export default Orders;
