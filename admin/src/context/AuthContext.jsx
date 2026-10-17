import React from "react";
export const authDataContext = React.createContext()

const AuthContext = ({children}) => {
    let serverUrl = "http://localhost:8000/api/"
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