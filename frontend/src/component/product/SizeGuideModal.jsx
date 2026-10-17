import React from 'react'
import { FiX } from 'react-icons/fi'

function SizeGuideModal({ show, onClose }) {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 cursor-pointer"
        >
          <FiX size={20} />
        </button>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Garment Sizing Guide</h3>
        <p className="text-xs text-slate-500 mb-6">
          All measurements are listed in inches. Sized for standard regular fit.
        </p>

        <div className="rounded-xl overflow-hidden border border-slate-200 text-xs mb-6">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="p-2.5">Size</th>
                <th className="p-2.5">Chest (in)</th>
                <th className="p-2.5">Length (in)</th>
                <th className="p-2.5">Shoulder (in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="p-2.5 text-slate-900 font-bold">S</td>
                <td className="p-2.5">38</td>
                <td className="p-2.5">27</td>
                <td className="p-2.5">17.5</td>
              </tr>
              <tr>
                <td className="p-2.5 text-slate-900 font-bold">M</td>
                <td className="p-2.5">40</td>
                <td className="p-2.5">28</td>
                <td className="p-2.5">18.5</td>
              </tr>
              <tr>
                <td className="p-2.5 text-slate-900 font-bold">L</td>
                <td className="p-2.5">42</td>
                <td className="p-2.5">29</td>
                <td className="p-2.5">19.5</td>
              </tr>
              <tr>
                <td className="p-2.5 text-slate-900 font-bold">XL</td>
                <td className="p-2.5">44</td>
                <td className="p-2.5">30</td>
                <td className="p-2.5">20.5</td>
              </tr>
              <tr>
                <td className="p-2.5 text-slate-900 font-bold">XXL</td>
                <td className="p-2.5">46</td>
                <td className="p-2.5">31</td>
                <td className="p-2.5">21.5</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#0c7c86] hover:bg-[#096068] text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
        >
          Got it
        </button>
      </div>
    </div>
  )
}

export default SizeGuideModal
