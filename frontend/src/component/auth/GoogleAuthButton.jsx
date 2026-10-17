import React from 'react'
import google from '../../assets/google.png'

function GoogleAuthButton({ onClick, text }) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="w-full h-11 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-xl flex items-center justify-center gap-2.5 cursor-pointer text-sm shadow-2xs transition-all active:scale-[0.99]"
      >
        <img
          src={google}
          alt="Google"
          className="w-5"
        />
        {text}
      </button>

      {/* OR Divider */}
      <div className="w-full flex items-center justify-center gap-3 text-xs font-semibold text-slate-400 my-1">
        <div className="flex-1 h-px bg-slate-200"></div>
        OR
        <div className="flex-1 h-px bg-slate-200"></div>
      </div>
    </>
  )
}

export default GoogleAuthButton
