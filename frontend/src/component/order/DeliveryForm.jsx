import React from 'react'
import Title from '../Title'

function DeliveryForm({ formData, onChangeHandler }) {
  return (
    <div className="space-y-4">
      <div className="mb-6 text-left">
        <Title text1="DELIVERY " text2="INFORMATION" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          required
          name="firstName"
          value={formData.firstName}
          onChange={onChangeHandler}
          placeholder="First name"
          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/15 outline-none text-sm text-slate-900 placeholder-slate-400 shadow-xs transition-all"
        />
        <input
          name="lastName"
          value={formData.lastName}
          onChange={onChangeHandler}
          placeholder="Last name"
          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/15 outline-none text-sm text-slate-900 placeholder-slate-400 shadow-xs transition-all"
        />
      </div>

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={onChangeHandler}
        placeholder="Email address"
        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/15 outline-none text-sm text-slate-900 placeholder-slate-400 shadow-xs transition-all"
      />

      <input
        required
        name="street"
        value={formData.street}
        onChange={onChangeHandler}
        placeholder="Street address"
        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/15 outline-none text-sm text-slate-900 placeholder-slate-400 shadow-xs transition-all"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          required
          name="city"
          value={formData.city}
          onChange={onChangeHandler}
          placeholder="City"
          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/15 outline-none text-sm text-slate-900 placeholder-slate-400 shadow-xs transition-all"
        />
        <input
          required
          name="state"
          value={formData.state}
          onChange={onChangeHandler}
          placeholder="State"
          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/15 outline-none text-sm text-slate-900 placeholder-slate-400 shadow-xs transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          required
          name="zipcode"
          value={formData.zipcode}
          onChange={onChangeHandler}
          placeholder="Zipcode / PIN"
          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/15 outline-none text-sm text-slate-900 placeholder-slate-400 shadow-xs transition-all"
        />
        <input
          name="country"
          value={formData.country}
          onChange={onChangeHandler}
          placeholder="Country"
          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/15 outline-none text-sm text-slate-900 placeholder-slate-400 shadow-xs transition-all"
        />
      </div>

      <input
        required
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={onChangeHandler}
        placeholder="Phone number"
        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#0c7c86] focus:ring-2 focus:ring-[#0c7c86]/15 outline-none text-sm text-slate-900 placeholder-slate-400 shadow-xs transition-all"
      />
    </div>
  )
}

export default DeliveryForm
