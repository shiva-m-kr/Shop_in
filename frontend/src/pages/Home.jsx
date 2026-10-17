
import { useState, useEffect } from 'react'
import BackGround from '../component/BackGround.jsx'
import Hero from '../component/Hero.jsx'
import Product from './Product.jsx'
import OurPolicy from '../component/OurPolicy.jsx'
import Footer from '../component/Footer.jsx'

function Home() {
  const heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose your Perfect Fashion Fit", text2: "Now on Sale!" }
  ]

  const [heroCount, setHeroCount] = useState(2)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prevCount =>
        prevCount === heroData.length - 1 ? 0 : prevCount + 1
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full bg-[#f4f9f9] text-slate-800 overflow-hidden">

      
      <section className="relative min-h-[calc(100vh-70px)] lg:min-h-[86vh] w-full flex flex-col-reverse lg:flex-row items-center justify-between px-6 sm:px-12 lg:px-20 xl:px-28 py-10 lg:py-6 bg-[#183942] text-white">
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
        <BackGround heroCount={heroCount} />
      </section>

    
      <section className="w-full">
        <Product />
      </section>
      <section className="w-full">
        <OurPolicy />
      </section>

    
      <Footer />

    </div>
  )
}

export default Home
