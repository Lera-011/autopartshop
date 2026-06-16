// app/profile/page.tsx
'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function ProfilePage() {
    const { user, profile, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [user, loading, router])

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <div className="text-white">Загрузка...</div>
            </div>
        )
    }

    if (!user || !profile) {
        return null
    }

    const isSeller = profile.role === 'seller'

    return (
        <div className="min-h-screen bg-neutral-950 py-20">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-white mb-8">Мой профиль</h1>

                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 max-w-2xl">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-400 mb-1">Имя</label>
                            <p className="text-white text-lg">{profile.full_name}</p>
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Email</label>
                            <p className="text-white text-lg">{profile.email}</p>
                        </div>
                        {profile.phone && (
                            <div>
                                <label className="block text-gray-400 mb-1">Телефон</label>
                                <p className="text-white text-lg">{profile.phone}</p>
                            </div>
                        )}
                        {isSeller && (
                            <div>
                                <span className="px-3 py-1 bg-yellow-600/20 text-yellow-500 text-xs font-bold uppercase rounded-full">
                                    Администратор
                                </span>
                            </div>
                        )}
                        {/* ❌ УДАЛЕНА ССЫЛКА "Мои заказы" */}
                    </div>
                </div>
            </div>
        </div>
    )
}