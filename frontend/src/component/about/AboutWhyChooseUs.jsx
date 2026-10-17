import React from 'react'
import Title from '../Title'
import { FiCheckCircle } from 'react-icons/fi'
import { BENEFITS } from './aboutData'

function AboutWhyChooseUs() {
  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="text-center mb-14 sm:mb-16">
        <Title text1="WHY " text2="CHOOSE US" />
        <p className="text-slate-500 text-xs sm:text-sm md:text-base max-w-xl mx-auto mt-3 leading-relaxed font-normal">
          We stand apart through uncompromising standards, seamless service, and genuine passion.
        </p>
      </div>

      {/* 6 High-Contrast Crisp White Cards (2x3 Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {BENEFITS.map(({ icon: Icon, title, desc }, idx) => (
          <div
            key={idx}
            className="p-7 sm:p-8 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-300 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              {/* Signature Dark Blue-Grey Circular Icon Badge */}
              <div className="w-12 h-12 rounded-full bg-[#183942] flex items-center justify-center text-teal-300 shadow-xs group-hover:scale-105 group-hover:bg-[#0c7c86] transition-all duration-300 mb-6">
                <Icon size={20} className="group-hover:rotate-6 transition-transform duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-slate-900 font-bold text-base sm:text-lg mb-2.5 tracking-tight group-hover:text-[#0c7c86] transition-colors">
                {title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                {desc}
              </p>
            </div>

            {/* Micro-Guarantee Badge */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] sm:text-xs font-medium text-slate-500 group-hover:text-[#0c7c86] transition-colors">
              <FiCheckCircle size={14} className="text-[#0c7c86] shrink-0" />
              <span>ShopIn Standard Guaranteed</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AboutWhyChooseUs
