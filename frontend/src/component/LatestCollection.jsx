import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopConext'
import Card from './Card'
import Title from './Title'

function LatestCollection() {
    const { products } = useContext(shopContext)
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        if (products && products.length > 0) {
            setLatestProducts(products.slice(0, 8))
        }
    }, [products])

    return (
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20'>
            {/* Section Header */}
            <div className='text-center mb-12 sm:mb-14'>
                <Title text1='Latest ' text2='Collection' />
                <p className='text-slate-500 text-xs sm:text-sm md:text-base max-w-xl mx-auto mt-3 font-normal leading-relaxed'>
                    Step into glamour — explore our freshest arrivals, curated just for you.
                </p>
            </div>

            {/* Product Grid */}
            {latestProducts.length === 0 ? (
                <div className='flex items-center justify-center py-20'>
                    <p className='text-gray-500 animate-pulse text-lg'>Loading latest collection...</p>
                </div>
            ) : (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6'>
                    {latestProducts.map((item, index) => (
                        <Card
                            key={item._id || index}
                            _id={item._id}
                            name={item.name}
                            image1={item.image1}
                            price={item.price}
                            category={item.category}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default LatestCollection