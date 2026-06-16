// components/CatalogSection.tsx
'use client'

import { useState } from 'react'
import ProductCard from './ProductCard'
import QuickViewModal from './QuickViewModal'
import { products, Product } from '@/data/products'

export default function CatalogSection() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleQuickView = (product: Product) => {
        setSelectedProduct(product)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setTimeout(() => setSelectedProduct(null), 200)
    }

    return (
        <section id="catalog" className="py-16 md:py-24 bg-neutral-950 scroll-mt-20">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Каталог <span className="text-red-600">автозапчастей</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Оригинальные запчасти и качественные аналоги от ведущих мировых производителей.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            image={product.image}
                            brand={product.brand}
                            onQuickView={() => handleQuickView(product)}
                        />
                    ))}
                </div>
            </div>

            <QuickViewModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </section>
    )
}