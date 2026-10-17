import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { shopContext } from '../context/ShopConext'
import { FiEye } from 'react-icons/fi'

function Card({ name, image1, _id, price, category }) {
    const { currency } = useContext(shopContext)
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(`/product/${_id}`)}
            className='group cursor-pointer bg-white border border-slate-100 hover:border-[#0c7c86]/40 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col'
        >
            {/* Image Container with standardized aspect-[3/4] */}
            <div className='relative overflow-hidden aspect-[3/4] bg-slate-50'>
                <img
                    src={image1}
                    alt={name}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                />

                {/* Category micro-badge */}
                {category && (
                    <div className='absolute top-3 left-3 z-10'>
                        <span className='text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-[#0c7c86] text-white rounded-md shadow-xs'>
                            {category}
                        </span>
                    </div>
                )}

                {/* Quick View Hover Overlay Bar */}
                <div className='absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none'>
                    <div className='w-full py-2 px-3 bg-[#0c7c86] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-md'>
                        <FiEye size={14} />
                        <span>Quick View</span>
                    </div>
                </div>
            </div>

            {/* Product Details & Typography */}
            <div className='p-3.5 sm:p-4 flex flex-col justify-between flex-grow bg-white'>
                <p className='text-slate-800 font-bold text-xs sm:text-sm truncate group-hover:text-[#0c7c86] transition-colors'>
                    {name}
                </p>
                <p className='text-slate-900 font-extrabold text-sm sm:text-base mt-1 tracking-tight'>
                    {currency}{price}
                </p>
            </div>
        </div>
    )
}

export default Card