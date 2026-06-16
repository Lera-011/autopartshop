// app/privacy/page.tsx
export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-neutral-950 py-20">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-white mb-8">Политика конфиденциальности</h1>
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 text-gray-300 space-y-4">
                    <p>
                        Мы собираем и обрабатываем персональные данные пользователей для регистрации и работы магазина автозапчастей.
                    </p>
                    <p>
                        <strong>Какие данные собираются:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Имя и фамилия</li>
                        <li>Электронная почта</li>
                        <li>Номер телефона</li>
                    </ul>
                    <p>
                        <strong>Цели обработки:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Регистрация и авторизация</li>
                        <li>Оформление заказов</li>
                        <li>Связь с покупателями</li>
                    </ul>
                    <p>
                        Данные хранятся в зашифрованном виде и не передаются третьим лицам.
                    </p>
                    <p>
                        Вы можете отозвать согласие в любой момент, связавшись с нами.
                    </p>
                </div>
            </div>
        </div>
    )
}