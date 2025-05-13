import { createContext, useState } from "react";

export let authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(null);

  return (
    <authContext.Provider value={{ userIsLoggedIn, setUserIsLoggedIn }}>
      {children}
    </authContext.Provider>
  );
}
