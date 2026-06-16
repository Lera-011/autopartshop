// app/login/page.tsx
'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [sellerCode, setSellerCode] = useState('')
    const [error, setError] = useState('')
    const [agreeToTerms, setAgreeToTerms] = useState(false)
    const { signIn, signUp } = useAuth()
    const router = useRouter()

    // ✅ ПРОВЕРКА EMAIL
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    // ✅ ПРОВЕРКА ТЕЛЕФОНА
    const validatePhone = (phone: string): boolean => {
        // Убираем все лишние символы, оставляем только цифры и +
        const cleaned = phone.replace(/[^+\d]/g, '')
        // Проверяем, что номер содержит от 10 до 15 цифр
        const digits = cleaned.replace(/\D/g, '')
        return digits.length >= 10 && digits.length <= 15
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (isLogin) {
            // ВХОД
            if (!validateEmail(email)) {
                setError('Введите корректный email (например: user@mail.ru)')
                return
            }

            const { error } = await signIn(email, password)
            if (error) {
                setError(error.message)
            } else {
                const users = JSON.parse(localStorage.getItem('users') || '[]')
                const user = users.find((u: any) => u.email === email)
                if (user?.role === 'seller') {
                    router.push('/seller/dashboard')
                } else {
                    router.push('/')
                }
            }
        } else {
            // РЕГИСТРАЦИЯ
            // Проверка email
            if (!validateEmail(email)) {
                setError('Введите корректный email (например: user@mail.ru)')
                return
            }

            // Проверка телефона
            if (!validatePhone(phone)) {
                setError('Введите корректный номер телефона (например: +7 999 123-45-67)')
                return
            }

            // Проверка пароля
            if (password.length < 6) {
                setError('Пароль должен содержать минимум 6 символов')
                return
            }

            // Проверка имени
            if (fullName.trim().length < 2) {
                setError('Введите полное имя (минимум 2 символа)')
                return
            }

            // Проверка согласия
            if (!agreeToTerms) {
                setError('Необходимо согласие на обработку персональных данных')
                return
            }

            const role = sellerCode === 'ADMIN2025' ? 'seller' : 'user'

            const { error } = await signUp(email, password, fullName, phone, role)
            if (error) {
                setError(error.message)
            } else {
                alert(role === 'seller'
                    ? '✅ Администратор зарегистрирован! Теперь войдите.'
                    : '✅ Регистрация успешна! Теперь войдите.'
                )
                setIsLogin(true)
                setEmail('')
                setPassword('')
                setFullName('')
                setPhone('')
                setSellerCode('')
                setAgreeToTerms(false)
            }
        }
    }

    // ✅ ФОРМАТИРОВАНИЕ ТЕЛЕФОНА ПРИ ВВОДЕ
    const formatPhoneInput = (value: string) => {
        // Убираем все не цифры
        const digits = value.replace(/\D/g, '')

        if (digits.length === 0) return ''

        // Форматируем как +7 (999) 999-99-99
        let formatted = '+'
        if (digits.startsWith('7') || digits.startsWith('8')) {
            formatted += '7'
            const rest = digits.startsWith('8') ? digits.slice(1) : digits.slice(1)
            if (rest.length > 0) {
                formatted += ` (${rest.slice(0, 3)}`
                if (rest.length > 3) {
                    formatted += `) ${rest.slice(3, 6)}`
                    if (rest.length > 6) {
                        formatted += `-${rest.slice(6, 8)}`
                        if (rest.length > 8) {
                            formatted += `-${rest.slice(8, 10)}`
                        }
                    }
                }
            }
        } else {
            // Если номер не начинается с 7 или 8, просто показываем цифры
            formatted = digits
        }

        return formatted
    }

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-white mb-6">
                    {isLogin ? 'Вход' : 'Регистрация'}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-2 rounded focus:outline-none focus:border-red-600"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Пароль * (минимум 6 символов)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-2 rounded focus:outline-none focus:border-red-600"
                        required
                    />

                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                placeholder="Полное имя *"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-2 rounded focus:outline-none focus:border-red-600"
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Телефон * (например: +7 999 123-45-67)"
                                value={phone}
                                onChange={(e) => {
                                    const formatted = formatPhoneInput(e.target.value)
                                    setPhone(formatted)
                                }}
                                className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-2 rounded focus:outline-none focus:border-red-600"
                                required
                            />

                            <input
                                type="password"
                                placeholder="Код продавца (если есть)"
                                value={sellerCode}
                                onChange={(e) => setSellerCode(e.target.value)}
                                className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-2 rounded focus:outline-none focus:border-yellow-600"
                            />

                            <div className="flex items-start gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    id="agreeToTerms"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    className="mt-1 w-4 h-4 bg-neutral-800 border border-neutral-700 rounded focus:outline-none focus:border-red-600"
                                    required
                                />
                                <label htmlFor="agreeToTerms" className="text-gray-400 text-sm leading-relaxed">
                                    Я даю согласие на обработку персональных данных в соответствии с{' '}
                                    <a
                                        href="/privacy"
                                        target="_blank"
                                        className="text-red-500 hover:text-red-400 transition"
                                    >
                                        политикой конфиденциальности
                                    </a>
                                </label>
                            </div>
                        </>
                    )}

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className={`w-full font-bold py-3 rounded transition ${!isLogin && !agreeToTerms
                                ? 'bg-neutral-700 text-gray-400 cursor-not-allowed'
                                : 'bg-red-600 hover:bg-red-700 text-white'
                            }`}
                        disabled={!isLogin && !agreeToTerms}
                    >
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </form>

                <button
                    onClick={() => {
                        setIsLogin(!isLogin)
                        setError('')
                        setSellerCode('')
                        setAgreeToTerms(false)
                    }}
                    className="w-full mt-4 text-gray-400 hover:text-white text-sm transition"
                >
                    {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
                </button>
            </div>
        </div>
    )
}