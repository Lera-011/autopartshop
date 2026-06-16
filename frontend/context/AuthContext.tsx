'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type User = {
    id: string
    email: string
    full_name: string
    phone: string
    address: string
    role: 'user' | 'seller'
}

type AuthError = {
    message: string
} | null

type AuthContextType = {
    user: User | null
    profile: User | null
    loading: boolean
    signUp: (email: string, password: string, fullName: string, phone: string, role?: 'user' | 'seller') => Promise<{ error: AuthError }>
    signIn: (email: string, password: string) => Promise<{ error: AuthError }>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            const savedUser = localStorage.getItem('user_data')
            if (savedUser) {
                try {
                    const parsed = JSON.parse(savedUser)
                    setUser(parsed)
                    setProfile(parsed)
                } catch (e) {
                    console.error('Ошибка загрузки пользователя:', e)
                }
            }
            setLoading(false)
        }, 0)
        return () => clearTimeout(timer)
    }, [])

    const signUp = async (
        email: string,
        password: string,
        fullName: string,
        phone: string,
        role: 'user' | 'seller' = 'user'
    ) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500))
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')

            if (existingUsers.some((u: User) => u.email === email)) {
                return { error: { message: 'Пользователь с таким email уже существует' } }
            }

            const newUser: User = {
                id: Date.now().toString(),
                email,
                full_name: fullName,
                phone,
                role,
                address: ''
            }

            existingUsers.push(newUser)
            localStorage.setItem('users', JSON.stringify(existingUsers))
            return { error: null }
        } catch (error) {
            console.error('Ошибка регистрации:', error)
            return { error: { message: 'Ошибка регистрации. Попробуйте позже.' } }
        }
    }

    const signIn = async (email: string, password: string) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500))
            const users = JSON.parse(localStorage.getItem('users') || '[]')
            const foundUser = users.find((u: User) => u.email === email)

            if (!foundUser) {
                return { error: { message: 'Пользователь не найден' } }
            }

            localStorage.setItem('user_data', JSON.stringify(foundUser))
            setUser(foundUser)
            setProfile(foundUser)
            return { error: null }
        } catch (error) {
            console.error('Ошибка входа:', error)
            return { error: { message: 'Ошибка входа. Попробуйте позже.' } }
        }
    }

    const signOut = async () => {
        localStorage.removeItem('user_data')
        setUser(null)
        setProfile(null)
    }

    return (
        <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}