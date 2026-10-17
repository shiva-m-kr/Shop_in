import React from 'react'
import back1 from "../assets/back1.png"
import back2 from "../assets/back2.jpg"
import back3 from "../assets/back3.jpg"
import back4 from "../assets/back4.jpg"

const slides = [
    { img: back1, alt: "Fashion Model 1" },
    { img: back2, alt: "Fashion Model 2" },
    { img: back3, alt: "Fashion Model 3" },
    { img: back4, alt: "Fashion Model 4" },
]


function BackGround({ heroCount }) {
    return (
        <div className='w-full lg:w-[50%] flex items-center justify-center relative py-12 lg:py-6 select-none'>
            
            {/* 1. Ambient Pure Silver & Platinum Halos */}
            <div className='absolute w-96 sm:w-[480px] h-96 sm:h-[480px] bg-white/[0.07] rounded-full blur-[120px] pointer-events-none -z-0' />
            <div className='absolute -top-12 -right-10 w-72 h-72 bg-slate-300/[0.12] rounded-full blur-[90px] pointer-events-none -z-0' />
            <div className='absolute -bottom-10 -left-8 w-64 h-64 bg-zinc-400/[0.08] rounded-full blur-[80px] pointer-events-none -z-0' />

            {/* 2. Layer 1: Giant Outermost Deep Slate/Zinc Base Pod */}
            <div
                className='absolute w-[370px] sm:w-[470px] lg:w-[510px] h-[520px] sm:h-[620px] lg:h-[680px] bg-gradient-to-tr from-slate-900/60 via-zinc-800/30 to-slate-400/10 backdrop-blur-2xl border border-white/5 pointer-events-none shadow-[0_25px_60px_rgba(0,0,0,0.55)] transition-all duration-700'
                style={{
                    borderRadius: '43% 57% 65% 35% / 38% 44% 56% 62%',
                    transform: 'rotate(-9deg) scale(1.05)',
                }}
            />

            {/* 3. Layer 2: Smoked Frosted Glass Contour */}
            <div
                className='absolute w-[355px] sm:w-[450px] lg:w-[490px] h-[500px] sm:h-[600px] lg:h-[660px] bg-gradient-to-br from-white/[0.08] via-zinc-500/10 to-transparent backdrop-blur-xl border border-white/10 pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-700'
                style={{
                    borderRadius: '56% 44% 50% 50% / 46% 54% 46% 54%',
                    transform: 'rotate(-4deg)',
                }}
            />

            {/* 4. Layer 3: Silver-Grey Translucent Mid Pod */}
            <div
                className='absolute w-[340px] sm:w-[430px] lg:w-[470px] h-[485px] sm:h-[580px] lg:h-[640px] bg-gradient-to-tr from-slate-700/20 via-zinc-300/[0.12] to-white/15 backdrop-blur-lg border border-slate-300/15 pointer-events-none shadow-[0_15px_35px_rgba(0,0,0,0.35)] transition-all duration-700'
                style={{
                    borderRadius: '48% 52% 42% 58% / 54% 46% 54% 46%',
                    transform: 'rotate(4deg)',
                }}
            />

            {/* 5. Layer 4: Fine Platinum Outline Ring */}
            <div
                className='absolute w-[325px] sm:w-[410px] lg:w-[450px] h-[470px] sm:h-[560px] lg:h-[620px] pointer-events-none transition-all duration-700'
                style={{
                    borderRadius: '54% 46% 58% 42% / 44% 56% 44% 56%',
                    transform: 'rotate(7deg)',
                    border: '1.5px solid transparent',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(203,213,225,0.15) 50%, transparent 80%) border-box',
                    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))',
                }}
            />

            {/* 6. Layer 5: Soft Satin Whitish Glass Capsule */}
            <div
                className='absolute w-[310px] sm:w-[390px] lg:w-[430px] h-[455px] sm:h-[540px] lg:h-[600px] bg-gradient-to-bl from-white/[0.18] via-zinc-200/[0.08] to-slate-600/[0.15] backdrop-blur-md border border-white/20 pointer-events-none shadow-[inset_0_2px_4px_rgba(255,255,255,0.25)] transition-all duration-700'
                style={{
                    borderRadius: '50% 50% 46% 54% / 52% 48% 52% 48%',
                    transform: 'rotate(-2deg)',
                }}
            />

            {/* 7. Layer 6: Direct Frosted Arch Rim (Inner Hugging Glow) */}
            <div
                className='absolute w-[295px] sm:w-[360px] lg:w-[405px] h-[445px] sm:h-[530px] lg:h-[595px] bg-gradient-to-t from-transparent via-white/[0.05] to-white/[0.22] backdrop-blur-sm border border-white/25 pointer-events-none transition-all duration-700'
                style={{
                    borderRadius: '50% 50% 48% 52% / 50% 50% 50% 50%',
                    transform: 'rotate(1deg)',
                }}
            />

            {/* 8. Framed Model Arch / Pill Cutout */}
            <div className='relative z-10 w-[280px] sm:w-[340px] lg:w-[390px] h-[440px] sm:h-[520px] lg:h-[590px] rounded-t-[190px] rounded-b-[190px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/20'>
                {slides.map((slide, index) => (
                    <img
                        key={index}
                        src={slide.img}
                        alt={slide.alt}
                        className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-in-out ${
                            heroCount === index
                                ? 'opacity-100 scale-100'
                                : 'opacity-0 scale-105 pointer-events-none'
                        }`}
                    />
                ))}

                {/* Bottom dark gradient vignette */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none' />
            </div>

        </div>
    )
}


export default BackGround