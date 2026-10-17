import React, { createContext, useContext, useState,useEffect } from 'react'
import {authDataContext} from "./AuthContext"
import axios from 'axios'



export const adminDataContext = createContext()


function AdminContext({children}) {
    let [adminData,setAdminData] = useState(null)
    let {serverUrl} = useContext(authDataContext)
    
    const [loading, setLoading] = useState(true)
    const getAdmin = async ()=>{
        try{
            let result = await axios.get(serverUrl + "user/getadmin",{withCredentials:true})

            setAdminData(result.data)
            console.log(result.data)

        }catch(err){
            setAdminData(null)
            console.log("GETadmin ERROR: "+ err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getAdmin();
    },[])
    let value = {
    adminData,
    setAdminData,
    getAdmin,
    loading,
}

return (
<div>
<adminDataContext.Provider value={value}>
{children}
</adminDataContext.Provider>

</div>

)
}
export default AdminContext