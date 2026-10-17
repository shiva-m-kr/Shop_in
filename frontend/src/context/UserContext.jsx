
import React, { createContext, useState, useContext, useEffect } from 'react'
import { AuthDataContext } from './authContext.jsx'
import axios from 'axios'

export const UserDataContext = React.createContext()

function UserContext({ children }) {

    // =====================================================
    // USER STATE
    // =====================================================

    let [userData, setUserData] = useState(null)

    let { serverUrl } = useContext(AuthDataContext)


    // =====================================================
    // GET CURRENT USER
    // =====================================================

    const getCurrentUser = async () => {
        try {

            let result = await axios.get(
                serverUrl + "/api/user/currentuser",
                {
                    withCredentials: true
                }
            )

            setUserData(result.data)

        } catch (error) {

            setUserData(null)

            console.log(
                "getCurrentUser error:",
                error
            )
        }
    }


    // =====================================================
    // LOGOUT USER
    // =====================================================

   const logout = async () => {

    try {

        await axios.get(
            serverUrl + "/api/auth/logout",
            {
                withCredentials: true
            }
        )

        setUserData(null)

        // Clear any lingering guest cart to prevent data leaking
        localStorage.removeItem('shopin_guest_cart')

    } catch (error) {

        console.log(
            "logout error:",
            error
        )
    }
}

    // =====================================================
    // CHECK USER WHEN APP LOADS
    // =====================================================

    useEffect(() => {

        getCurrentUser()

    }, [])


    // =====================================================
    // CONTEXT VALUE
    // =====================================================

    let value = {
        userData,
        setUserData,
        getCurrentUser,
        logout
    }


    return (

        <UserDataContext.Provider value={value}>

            {children}

        </UserDataContext.Provider>

    )
}

export default UserContext

