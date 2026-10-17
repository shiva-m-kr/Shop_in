import React from 'react'
import { useNavigate } from 'react-router-dom'

function Hero({ heroData, heroCount, setHeroCount }) {
    const navigate = useNavigate()

    return (
        <div className='w-full lg:w-[48%] flex flex-col justify-center items-start z-10 py-6 lg:py-0'>
            {/* Ambient subtle accent glow */}
            <div className='absolute -left-20 top-1/4 w-72 h-72 bg-[#0c7c86]/15 rounded-full blur-[100px] pointer-events-none -z-10' />

            {/* Headline */}
            <div className='space-y-2 max-w-xl animate-fade-in'>
                <h1 className='text-3xl sm:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-[1.12]'>
                    {heroData.text1}
                </h1>
                <p className='text-2xl sm:text-4xl lg:text-[44px] font-bold text-[#a5faf7] tracking-tight leading-[1.15] drop-shadow-[0_0_20px_rgba(12,124,134,0.3)]'>
                    {heroData.text2}
                </p>
            </div>

            {/* Primary CTA Button */}
            <div className='mt-8 sm:mt-10'>
                <button
                    onClick={() => navigate('/collection')}
                    className='px-7 sm:px-8 py-3.5 bg-[#0c7c86] hover:bg-[#09666f] text-white text-sm sm:text-base font-semibold rounded-xl shadow-[0_0_25px_rgba(12,124,134,0.4)] hover:shadow-[0_0_35px_rgba(12,124,134,0.65)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-2 cursor-pointer'
                >
                    Shop Now
                </button>
            </div>

            {/* Pagination Indicators */}
            <div className='mt-10 sm:mt-14 flex items-center gap-2.5'>
                {[0, 1, 2, 3].map((index) => (
                    <button
                        key={index}
                        onClick={() => setHeroCount(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                            heroCount === index
                                ? 'w-7 bg-[#0c7c86] shadow-[0_0_12px_rgba(12,124,134,0.8)]'
                                : 'w-2.5 bg-white/30 hover:bg-white/60'
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Hero