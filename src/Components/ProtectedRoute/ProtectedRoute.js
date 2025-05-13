import React, { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import Login from "../Login/Login";

export default function ProtectedRoute({ children }) {
  const { userIsLoggedIn } = useContext(authContext);
  return <>{userIsLoggedIn ? children : <Login />}</>;
}
