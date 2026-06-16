// components/Header.tsx
'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function Header() {
    const { user, profile, signOut } = useAuth()
    const { totalItems } = useCart()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    const isSeller = profile?.role === 'seller'

    const handleLogout = async () => {
        await signOut()
        setIsMenuOpen(false)
        window.location.href = '/'
    }

    // ✅ ОБРАБОТЧИК ДЛЯ "ГЛАВНАЯ"
    const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()

        if (pathname === '/') {
            // Если уже на главной — скроллим наверх
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            // Если на другой странице — переходим на главную
            router.push('/')
        }
    }

    const handleCatalogClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()

        if (pathname === '/') {
            const catalogSection = document.getElementById('catalog')
            if (catalogSection) {
                catalogSection.scrollIntoView({ behavior: 'smooth' })
            }
        } else {
            router.push('/#catalog')
        }
    }

    // ✅ ОБРАБОТЧИК ДЛЯ "КОНТАКТЫ"
    const handleContactsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()

        if (pathname === '/') {
            const contactsSection = document.getElementById('contacts')
            if (contactsSection) {
                contactsSection.scrollIntoView({ behavior: 'smooth' })
            }
        } else {
            router.push('/#contacts')
        }
    }

    return (
        <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <Link
                        href="/"
                        className="text-white font-bold text-xl tracking-tight"
                        onClick={handleHomeClick}  // ✅ ДЛЯ ЛОГОТИПА ТОЖЕ
                    >
                        ФИКСавто<span className="text-red-600">-плюс</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        <a
                            href="/"
                            onClick={handleHomeClick}
                            className="text-gray-300 hover:text-white transition cursor-pointer"
                        >
                            Главная
                        </a>
                        <a
                            href="/#catalog"
                            onClick={handleCatalogClick}
                            className="text-gray-300 hover:text-white transition cursor-pointer"
                        >
                            Каталог
                        </a>
                        <a
                            href="/#contacts"
                            onClick={handleContactsClick}
                            className="text-gray-300 hover:text-white transition cursor-pointer"
                        >
                            Контакты
                        </a>
                        {isSeller && (
                            <Link
                                href="/seller/dashboard"
                                className="text-yellow-500 hover:text-yellow-400 transition font-bold"
                            >
                                ⚡ Панель администратора
                            </Link>
                        )}
                    </nav>

                    <div className="flex items-center gap-4">
                        {/* Корзина */}
                        {!isSeller && (
                            <Link href="/cart" className="relative text-gray-300 hover:text-white transition">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                                </svg>
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* Пользователь */}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="flex items-center gap-2 text-gray-300 hover:text-white transition"
                                >
                                    <span>{user.full_name}</span>
                                    {isSeller && (
                                        <span className="text-xs bg-yellow-600/20 text-yellow-500 px-2 py-0.5 rounded">
                                            Админ
                                        </span>
                                    )}
                                </button>
                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg z-50">
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-gray-300 hover:bg-neutral-800 hover:text-white transition"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Мой профиль
                                        </Link>
                                        {isSeller && (
                                            <Link
                                                href="/seller/dashboard"
                                                className="block px-4 py-2 text-yellow-500 hover:bg-neutral-800 transition"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                ⚡ Панель администратора
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-red-500 hover:bg-neutral-800 transition"
                                        >
                                            Выйти
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/login" className="text-gray-300 hover:text-white transition">
                                Войти
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}