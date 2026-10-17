import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import Lists from './pages/Lists'
import Login from './pages/Login'
import Orders from './pages/Orders'
import { adminDataContext } from './context/AdminContext'
import logo from './assets/logo.png'
function App() {

  let { adminData, loading } = useContext(adminDataContext)
        if (loading) {
          return (
            <div className='w-full h-screen flex items-center justify-center bg-[#f4f9f9] text-slate-800'>
              <div className='flex flex-col items-center gap-3 p-8 bg-white border border-slate-200/80 rounded-2xl shadow-xs'>
                <img className='w-12 h-12 object-contain animate-pulse' src={logo} alt='ShopIn' />
                <h1 className='text-xl font-bold tracking-tight text-slate-900'>Shop<span className='text-[#0c7c86]'>In</span></h1>
                <p className='text-xs font-semibold text-slate-400'>Loading Admin Console...</p>
              </div>
            </div>
          )
        }
      

        
  return ( 
    <>
      {!loading && adminData === null ? (
        <Login />
      ) : (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/lists' element={<Lists />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      )}
    </>
  )
}

export default App