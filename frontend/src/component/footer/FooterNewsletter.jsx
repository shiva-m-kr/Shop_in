import React, { useState } from 'react'
import { FiMail, FiCheck, FiArrowRight } from 'react-icons/fi'

function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setSubscribed(true)
    setTimeout(() => {
      setEmail('')
      setSubscribed(false)
    }, 3500)
  }

  return (
    <div className="lg:col-span-4">
      <div className="bg-[#111e25]/60 border border-white/10 rounded-2xl p-6 relative backdrop-blur-md">
        <h3 className="text-white text-base font-semibold tracking-wide">
          Join the <span className="text-[#a5faf7]">ShopIn</span> Circle
        </h3>
        <p className="mt-2 text-xs text-gray-400 leading-relaxed">
          Subscribe to get exclusive drops, secret discount codes and seasonal lookbooks first.
        </p>

        {/* Form */}
        <form onSubmit={handleSubscribe} className="mt-5">
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-gray-500 pointer-events-none">
              <FiMail size={16} />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-[#0c1a1f] border border-white/15 rounded-xl pl-10 pr-24 py-3 text-xs sm:text-sm text-white placeholder-gray-500 outline-none focus:border-[#a5faf7] focus:ring-1 focus:ring-[#a5faf7]/40 transition-all"
            />
            <button
              type="submit"
              disabled={subscribed}
              className={`absolute right-1.5 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 flex items-center gap-1.5 ${
                subscribed
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#0c7c86] hover:bg-[#0a666e] text-white shadow-sm'
              }`}
            >
              {subscribed ? (
                <>
                  <FiCheck size={14} /> Joined
                </>
              ) : (
                <>
                  Join <FiArrowRight size={13} />
                </>
              )}
            </button>
          </div>
        </form>

        <p className="mt-3 text-[11px] text-gray-400">
          🔒 Zero spam. Unsubscribe with a single click.
        </p>
      </div>
    </div>
  )
}

export default FooterNewsletter
