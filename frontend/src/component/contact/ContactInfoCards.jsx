import React from 'react'
import contactImg from '../../assets/contact.png'
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiBriefcase
} from 'react-icons/fi'

function ContactInfoCards({ onOpenCareers }) {
  return (
    <div className="lg:col-span-5 space-y-6">
      {/* Visual Card */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 bg-white p-2 sm:p-3 shadow-md group">
        <img
          src={contactImg}
          alt="ShopIn Support & Headquarters"
          className="w-full h-64 sm:h-72 object-cover rounded-2xl group-hover:scale-102 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent rounded-2xl pointer-events-none" />
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-white text-base font-bold drop-shadow-sm">
            ShopIn Flagship & Support HQ
          </p>
          <p className="text-xs text-teal-200 mt-0.5 font-medium">
            Available Mon - Sat, 9:00 AM – 8:00 PM EST
          </p>
        </div>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-300 shadow-xs hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#0c7c86]/10 text-[#0c7c86] flex items-center justify-center mb-3">
            <FiMapPin size={18} />
          </div>
          <h4 className="text-slate-900 font-bold text-sm mb-1">Our Location</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            221B Baker Street, Fashion District, NY 10001
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-300 shadow-xs hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#0c7c86]/10 text-[#0c7c86] flex items-center justify-center mb-3">
            <FiPhone size={18} />
          </div>
          <h4 className="text-slate-900 font-bold text-sm mb-1">Direct Helpline</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            +1 (800) 456-SHOP<br />
            +1 (800) 456-7467
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-300 shadow-xs hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#0c7c86]/10 text-[#0c7c86] flex items-center justify-center mb-3">
            <FiMail size={18} />
          </div>
          <h4 className="text-slate-900 font-bold text-sm mb-1">Email Support</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            support@shopin.com<br />
            care@shopin.com
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-300 shadow-xs hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#0c7c86]/10 text-[#0c7c86] flex items-center justify-center mb-3">
            <FiClock size={18} />
          </div>
          <h4 className="text-slate-900 font-bold text-sm mb-1">Response Time</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Average under 2 hours<br />
            24/7 AI chat assistance
          </p>
        </div>
      </div>

      {/* Careers Strip (Deep Blue-Grey Anchor Block) */}
      <div className="p-6 rounded-2xl bg-[#183942] text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <FiBriefcase className="text-teal-300" /> Careers at ShopIn
          </div>
          <p className="text-xs text-teal-100/80 mt-1">
            Passionate about design, technology, and fashion? Join our growing team.
          </p>
        </div>
        <button
          onClick={onOpenCareers}
          className="shrink-0 px-4 py-2 rounded-xl bg-[#0c7c86] hover:bg-[#096068] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
        >
          View Openings
        </button>
      </div>
    </div>
  )
}

export default ContactInfoCards
