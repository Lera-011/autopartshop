// app/layout.tsx
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/Header'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <body className="bg-neutral-950" suppressHydrationWarning>
                <AuthProvider>
                    <CartProvider>          {/* ✅ CartProvider ДОЛЖЕН БЫТЬ */}
                        <Header />
                        {children}
                    </CartProvider>
                </AuthProvider>
            </body>
        </html>
    )
}