import React, { useContext, useState, useEffect } from 'react'
import { shopContext } from '../context/ShopConext'
import Title from './Title'
import Card from './Card'

function RelatedProduct({ category, subCategory, currentProductId }) {
    const { products } = useContext(shopContext)
    const [related, setRelated] = useState([])

    useEffect(() => {
        if (!products || products.length === 0) return

        let filtered = products.filter(
            (item) => item._id !== currentProductId && item.category === category && item.subCategory === subCategory
        )

        // Fallback: If not enough matches with same subcategory, match same category
        if (filtered.length < 4) {
            const sameCategory = products.filter(
                (item) => item._id !== currentProductId && item.category === category && !filtered.some(f => f._id === item._id)
            )
            filtered = [...filtered, ...sameCategory]
        }

        // Additional Fallback: If still less than 4, include other products
        if (filtered.length < 4) {
            const others = products.filter(
                (item) => item._id !== currentProductId && !filtered.some(f => f._id === item._id)
            )
            filtered = [...filtered, ...others]
        }

        setRelated(filtered.slice(0, 4))
    }, [products, category, subCategory, currentProductId])

    if (related.length === 0) return null

    return (
        <section className="my-20">
            <div className="text-center mb-10">
                <Title text1="RELATED" text2=" PRODUCTS" />
                <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto mt-2">
                    Customers who viewed this item also loved these curated recommendations.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {related.map((item) => (
                    <Card
                        key={item._id}
                        _id={item._id}
                        name={item.name}
                        image1={item.image1}
                        price={item.price}
                        category={item.category}
                    />
                ))}
            </div>
        </section>
    )
}

export default RelatedProduct