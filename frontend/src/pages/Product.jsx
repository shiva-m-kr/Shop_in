import React from 'react'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'

function Product() {
    return (
        <div className='w-full bg-[#f4f9f9] text-slate-800'>
            {/* Latest Collection Section */}
            <section className='w-full'>
                <LatestCollection />
            </section>

            {/* Best Seller Section */}
            <section className='w-full border-t border-slate-200/60'>
                <BestSeller />
            </section>
        </div>
    )
}

export default Product