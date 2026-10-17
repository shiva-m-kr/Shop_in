import React from 'react'
import Title from '../Title'
import { FiHelpCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi'

function ContactFaq({ faqs, activeFaq, setActiveFaq }) {
  return (
    <div className="mt-28">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0c7c86] mb-2">
          <FiHelpCircle /> Instant Answers
        </div>
        <Title text1="FREQUENTLY ASKED" text2=" QUESTIONS" />
        <p className="text-slate-500 text-sm max-w-lg mx-auto mt-2">
          Quick answers to the most common questions regarding orders, shipping, and exchanges.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = activeFaq === idx
          return (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden transition-all hover:border-slate-300"
            >
              <button
                onClick={() => setActiveFaq(isOpen ? null : idx)}
                className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-bold text-slate-800 text-sm sm:text-base">
                  {faq.q}
                </span>
                <span className="text-[#0c7c86] shrink-0">
                  {isOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ContactFaq
