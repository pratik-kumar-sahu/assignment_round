import React, { createContext, useReducer } from "react";
import userReducer from "./userReducer";

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [currentUser, dispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={{ currentUser, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
