import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const storedAccessToken = localStorage.getItem("accessToken");
  const storedUserName = localStorage.getItem("userName");
  const initialUserState = storedAccessToken
    ? {
        loggedIn: true,
        venueManager: false,
        token: storedAccessToken,
        name: storedUserName,
      }
    : { loggedIn: false, venueManager: false, token: "", name: "" };

  const [user, setUser] = useState(initialUserState);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
