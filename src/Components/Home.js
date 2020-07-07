import React from 'react'
import ProductList from './ProductList'
import CartButton from './CartButton'

export default function Home() {
    return (
        <div className="bg-gray-200 w-screen h-screen  max-h-full py-20 px-10 z-20">
            <ProductList/>
        </div>
    )
}
