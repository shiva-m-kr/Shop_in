import React from 'react'

export const AuthDataContext = React.createContext()

function AuthContext({ children }) {
    let serverUrl = import.meta.env.VITE_BACKEND_URL || "https://shop-in-backend.onrender.com"

    let value = {
        serverUrl
    }

    return (
        <AuthDataContext.Provider value={value}>
            {children}
        </AuthDataContext.Provider>
    )
}

export default AuthContext
