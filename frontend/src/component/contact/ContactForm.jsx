import React from 'react'
import {
  FiMail,
  FiPhone,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiMessageSquare,
  FiUser
} from 'react-icons/fi'

function ContactForm({
  formData,
  handleChange,
  handleSubmit,
  loading,
  status,
  subjectOptions
}) {
  return (
    <div className="lg:col-span-7">
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 lg:p-10 shadow-lg relative">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0c7c86] mb-2">
            <FiMessageSquare /> Send a Message
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            We'd love to hear from you
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Fill out the form below and our dedicated care team will get back to you promptly.
          </p>
        </div>

        {/* Status Alert */}
        {status.message && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-start gap-3 text-sm ${
              status.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            {status.type === 'success' ? (
              <FiCheckCircle size={18} className="shrink-0 mt-0.5 text-emerald-600" />
            ) : (
              <FiAlertCircle size={18} className="shrink-0 mt-0.5 text-rose-600" />
            )}
            <span className="font-medium">{status.message}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Full Name <span className="text-[#0c7c86]">*</span>
              </label>
              <div className="relative flex items-center">
                <FiUser className="absolute left-3.5 text-slate-400 pointer-events-none" size={16} />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/15 transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Email Address <span className="text-[#0c7c86]">*</span>
              </label>
              <div className="relative flex items-center">
                <FiMail className="absolute left-3.5 text-slate-400 pointer-events-none" size={16} />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/15 transition-all shadow-2xs"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Phone */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Phone Number <span className="text-slate-400 text-[10px] lowercase font-normal">(optional)</span>
              </label>
              <div className="relative flex items-center">
                <FiPhone className="absolute left-3.5 text-slate-400 pointer-events-none" size={16} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/15 transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Topic / Subject <span className="text-[#0c7c86]">*</span>
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none focus:bg-white focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/15 transition-all cursor-pointer shadow-2xs"
              >
                {subjectOptions.map(option => (
                  <option key={option} value={option} className="bg-white text-slate-900">
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Message <span className="text-[#0c7c86]">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe how we can help you today..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/15 transition-all resize-none shadow-2xs"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-[#0c7c86] hover:bg-[#096068] text-white font-semibold text-sm transition-all duration-300 shadow-md shadow-[#0c7c86]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending message...</span>
              </>
            ) : (
              <>
                <FiSend size={16} />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactForm
