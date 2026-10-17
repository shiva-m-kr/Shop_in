import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'

function AuthHeader() {
  const navigate = useNavigate()

  return (
    <div
      className="h-20 w-full flex items-center justify-start px-6 sm:px-10 gap-2 cursor-pointer shrink-0"
      onClick={() => navigate("/")}
    >
      <img
        className="w-9 h-9 object-contain"
        src={logo}
        alt="ShopIn"
      />
      <h1 className="text-2xl font-black text-slate-900 tracking-tight">
        Shop<span className="text-[#0c7c86]">In</span>
      </h1>
    </div>
  )
}

export default AuthHeader
