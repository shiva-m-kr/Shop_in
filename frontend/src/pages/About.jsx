import React from 'react'
import { Link } from 'react-router-dom'
import Title from '../component/Title'
import Footer from '../component/Footer'
import aboutImg from '../assets/about.png'
import AboutWhyChooseUs from '../component/about/AboutWhyChooseUs'
import { NARRATIVE_STATS, STATS_STRIP } from '../component/about/aboutData'
import { FiArrowRight } from 'react-icons/fi'

function About() {
  return (
    <div className="w-full bg-[#f4f9f9] text-slate-800 min-h-screen relative overflow-hidden">
      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-10 sm:pt-14 pb-20">
        
        {/* Page Header */}
        <div className="text-center mb-16 sm:mb-20">
          <Title text1="ABOUT " text2="US" />
          <p className="text-slate-500 text-xs sm:text-sm md:text-base max-w-xl mx-auto mt-3 font-normal leading-relaxed">
            Redefining contemporary style through purposeful design, premium craft, and customer obsession.
          </p>
        </div>

        {/* Hero Section: Story & Double-Arched Visual Cutouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-24">
          
          {/* Left Visual: Signature Double-Arched Cutouts & Deep Blue Backdrop */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-6 sm:py-8 select-none">
            {/* Ambient teal glow */}
            <div className="absolute w-72 sm:w-80 h-72 sm:h-80 bg-[#0c7c86]/10 rounded-full blur-[80px] pointer-events-none -z-0" />

            {/* Main Arch Frame */}
            <div className="relative w-[280px] sm:w-[320px] md:w-[350px] h-[380px] sm:h-[440px] md:h-[480px] rounded-t-[180px] rounded-b-[40px] overflow-hidden shadow-2xl border-4 border-white bg-[#183942]">
              <img
                src={aboutImg}
                alt="ShopIn Craft & Quality"
                className="w-full h-full object-cover object-center scale-110 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#183942]/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Overlapping Secondary Rounded Pod */}
            <div className="absolute -bottom-4 sm:-bottom-6 right-2 sm:right-4 w-[160px] sm:w-[190px] md:w-[210px] h-[140px] sm:h-[160px] md:h-[180px] rounded-[36px] overflow-hidden shadow-xl border-4 border-white bg-[#183942]">
              <img
                src={aboutImg}
                alt="ShopIn Folded Clothes Detail"
                className="w-full h-full object-cover object-bottom scale-125"
              />
            </div>
          </div>

          {/* Right Narrative Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:pl-6">
            
            {/* Story Tag */}
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0c7c86]">
              <span className="w-2 h-2 rounded-full bg-[#0c7c86]"></span>
              The ShopIn Story
            </div>

            {/* Bold Narrative Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold tracking-tight text-slate-900 leading-[1.2]">
              Empowering individuality through curated, elevated fashion.
            </h2>

            {/* Descriptions */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              <strong className="text-slate-900 font-semibold">ShopIn</strong> was born from a simple belief: high-fashion aesthetics shouldn't compromise on comfort, longevity, or accessibility. What began as a passionate quest for quality garments has evolved into a dynamic global platform connecting modern shoppers with curated wardrobe essentials.
            </p>

            <p className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed">
              From handpicked textiles to our precision tailoring partners, every piece is designed to seamlessly integrate into your daily life. Whether you're dressing for bold statements or minimalist elegance, our catalog adapts to you.
            </p>

            {/* 4 Mini Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-3">
              {NARRATIVE_STATS.map((item, idx) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-[#0c7c86]/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#0c7c86] transition-colors">
                        {item.value}
                      </span>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">
                        {item.label}
                      </p>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:text-[#0c7c86] group-hover:bg-[#0c7c86]/10 transition-all">
                        <IconComponent size={12} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Explore Collections CTA Button */}
            <div className="pt-2">
              <Link
                to="/collection"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0c7c86] hover:bg-[#096068] text-white text-sm font-semibold transition-all duration-300 shadow-md shadow-[#0c7c86]/25 hover:-translate-y-0.5 group"
              >
                <span>Explore Collections</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Secondary Anchor Block: Dark Blue-Grey Stat Strip */}
        <div className="mb-28 max-w-5xl mx-auto py-8 sm:py-9 px-6 sm:px-12 rounded-3xl bg-[#183942] text-white shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {STATS_STRIP.map((stat, i) => (
            <div key={i} className={`flex flex-col items-center justify-center ${i > 0 && i % 2 === 0 ? 'pt-4 md:pt-0' : ''}`}>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-teal-200/80 mt-1 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <AboutWhyChooseUs />

      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default About