// components/HeroSection.tsx
'use client'

export default function HeroSection() {
    return (
        <section className="relative min-h-[70vh] flex items-center justify-start overflow-hidden">
            {/* ✅ ЕДИНЫЙ ФОН — ТОТ ЖЕ, ЧТО И У ВСЕГО САЙТА */}
            <div className="absolute inset-0 z-0 bg-neutral-950">
                {/* Картинка поверх фона с прозрачностью */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'url(/hero.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.7  // ← регулируйте прозрачность картинки
                    }}
                />
                {/* Лёгкое затемнение сверху */}
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/30 to-neutral-950/80" />
            </div>

            {/* Контент */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                        Оригинальные
                        <span className="text-red-600"> автозапчасти</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                        Гарантия качества • Быстрая доставка • Оригинальные запчасти от ведущих мировых производителей
                    </p>
                </div>
            </div>
        </section>
    )
}