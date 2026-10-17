import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { serverUrl } = useContext(authDataContext)
  const { getAdmin } = useContext(adminDataContext)
  const navigate = useNavigate()

  const AdminLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${serverUrl}auth/adminlogin`, { email, password }, { withCredentials: true })
      if (res.status === 200) {
        getAdmin()
        navigate('/')
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Invalid credentials for admin')
    }
  }

  return (
    <div className='min-h-screen w-full bg-[#f4f9f9] text-slate-800 flex flex-col'>
      <header className='h-15 w-full flex items-center justify-between px-6 md:px-10 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs'>
        <div className='flex items-center gap-2.5 cursor-pointer' onClick={() => navigate('/')}>
          <img className='w-9 h-9 object-contain' src={logo} alt='ShopIn' />
          <h1 className='text-xl font-bold tracking-tight text-slate-900'>Shop<span className='text-[#0c7c86]'>In</span></h1>
          <span className='text-[10px] font-bold bg-[#0c7c86]/10 text-[#0c7c86] px-2 py-0.5 rounded-full border border-[#0c7c86]/25 uppercase tracking-wider'>Admin</span>
        </div>
      </header>

      <main className='flex-1 flex flex-col items-center justify-center px-4 py-8'>
        <div className='w-full max-w-md p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-xs'>
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-bold text-slate-900 tracking-tight'>Admin Login</h2>
            <p className='text-xs text-slate-500 mt-1'>Enter your credentials to access the ShopIn Admin Portal</p>
          </div>

          <form onSubmit={AdminLogin} className='flex flex-col gap-4'>
            <div>
              <label className='block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5'>Admin Email</label>
              <input type='email' placeholder='admin@shopin.com' required value={email} onChange={(e) => setEmail(e.target.value)} className='w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 outline-none focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/20 transition-all' />
            </div>

            <div>
              <label className='block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5'>Password</label>
              <div className='relative w-full'>
                <input type={showPassword ? 'text' : 'password'} placeholder='••••••••' required value={password} onChange={(e) => setPassword(e.target.value)} className='w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-800 outline-none focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/20 transition-all pr-10' />
                <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer'>
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            <button type='submit' className='w-full mt-2 py-2.5 bg-[#0c7c86] hover:bg-[#09676f] text-white font-semibold text-sm rounded-xl shadow-xs transition-all cursor-pointer active:scale-98'>
              Sign In to Admin
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Login