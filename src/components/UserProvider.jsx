import React from "react";
import { UserContext } from "../context/UserContext";
// Provider component
export const UserProvider = ({ children, user }) => {
    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};