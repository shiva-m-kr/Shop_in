import React from 'react'
import { FiBriefcase } from 'react-icons/fi'

function CareersModal({ show, onClose }) {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl">
        <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          <FiBriefcase className="text-[#0c7c86]" /> Careers at ShopIn
        </h3>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          We are expanding across software engineering, merchandising, creative direction, and digital retail operations.
        </p>

        <div className="space-y-3 mb-6">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-sm font-semibold text-slate-900">Senior Frontend Engineer (React / Tailwind)</p>
            <p className="text-xs text-[#0c7c86] font-medium mt-0.5">Remote / New York • Full-Time</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-sm font-semibold text-slate-900">Fashion Merchandiser & Buyer</p>
            <p className="text-xs text-[#0c7c86] font-medium mt-0.5">New York, HQ • Full-Time</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-sm font-semibold text-slate-900">Customer Experience Specialist</p>
            <p className="text-xs text-[#0c7c86] font-medium mt-0.5">Remote • Full-Time</p>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-6">
          Send your CV and portfolio to <span className="text-[#0c7c86] font-semibold">careers@shopin.com</span> with the job title in the subject.
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#0c7c86] hover:bg-[#096068] text-white font-semibold text-sm transition-colors cursor-pointer shadow-md shadow-[#0c7c86]/20"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default CareersModal
