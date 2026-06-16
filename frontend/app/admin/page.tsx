// app/admin/page.tsx
'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
    const { user, profile, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/login')
            } else if (profile?.role !== 'seller') {
                router.push('/')
            }
        }
    }, [user, profile, loading, router])

    if (loading) {
        return <div className="text-white p-8">Загрузка...</div>
    }

    if (!user || profile?.role !== 'seller') {
        return null
    }

    return (
        <div className="min-h-screen bg-neutral-950 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">⚡ Панель администратора</h1>
                <p className="text-gray-400">Добро пожаловать, {user.full_name}!</p>
                <p className="text-gray-400">Вы вошли как администратор.</p>
            </div>
        </div>
    )
}
