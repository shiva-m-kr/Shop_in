import React from "react";
export const authDataContext = React.createContext()

const AuthContext = ({children}) => {
   const serverUrl = "https://shop-in-backend.onrender.com/api/";
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
