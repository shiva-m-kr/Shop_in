import React from "react";
export const authDataContext = React.createContext()

const AuthContext = ({children}) => {
    let serverUrl = import.meta.env.VITE_BACKEND_URL || "https://shop-in-backend.onrender.com"
    let value = {
        serverUrl
    }
    return (
        <div>
            <authDataContext.Provider value={value}>
                {children}
            </authDataContext.Provider>
        </div>
    );
};

export default AuthContext;
