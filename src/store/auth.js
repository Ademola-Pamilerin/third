import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  logOut: () => {},
  login: (email,password) => {},
});
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };
  const handleLogIn = () => {
    localStorage.setItem("Auth", "123");
    setIsLoggedIn(true);
  };
  useEffect(() => {
    if (localStorage.getItem("Auth") === "123") {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        logOut: handleLogOut,
        login: handleLogIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
