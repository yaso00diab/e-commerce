import React, { useContext } from "react";
import styles from "./NavBar.module.css";
import logo from "../../Assets/SVGs/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";

const NavBar = () => {
  const { userIsLoggedIn, setUserIsLoggedIn } = useContext(authContext);
  const { cart } = useContext(cartContext);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    setUserIsLoggedIn(false);
    navigate("/home");
    toast.success("You are loged out", {
      position: "top-center",
    });
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <a className="navbar-brand" href="/home">
          <img src={logo} alt="Frash Cart" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userIsLoggedIn && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to={"home"}>
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to={"products"}>
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link "
                  aria-current="page"
                  to={"categories"}
                >
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to={"brands"}>
                  Brands
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link "
                  aria-current="page"
                  to={"allorders"}
                >
                  Orders
                </Link>
              </li>
            </ul>
          )}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item align-self-center">
              <Link to={"cart"}>
                {userIsLoggedIn ? (
                  <i class="fa-solid fa-cart-shopping mx-2 position-relative main-color fs-4">
                    <span className={`${styles.cartIcon}  translate-middle`}>
                      {cart?.numOfCartItems || 0}
                    </span>
                  </i>
                ) : null}
              </Link>
            </li>

            {userIsLoggedIn ? (
              <li className="nav-item">
                <button
                  onClick={logOut}
                  className="nav-link "
                  aria-current="page"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to={"login"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link "
                    aria-current="page"
                    to={"register"}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
