// data/orders.ts

export type OrderItem = {
    id: string
    productId: string
    productName: string
    quantity: number
    price: number
}

export type Order = {
    id: string
    userId: string
    userEmail: string
    userFullName: string
    userPhone: string
    userAddress: string
    paymentMethod: 'cash' | 'card' | 'online'
    items: OrderItem[]
    total: number
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    comment?: string
    createdAt: string
    updatedAt: string
}

export const mockOrders: Order[] = [
    {
        id: '1',
        userId: '1',
        userEmail: 'ivan@example.com',
        userFullName: 'Иван Иванов',
        userPhone: '+7 (999) 123-45-67',
        userAddress: 'г. Москва, ул. Тверская, д. 10, кв. 5',
        paymentMethod: 'cash',
        items: [
            { id: '1', productId: '1', productName: 'Тормозные колодки Brembo', quantity: 1, price: 4500 },
            { id: '2', productId: '2', productName: 'Масляный фильтр MANN', quantity: 2, price: 1200 }
        ],
        total: 6900,
        status: 'pending',
        comment: 'Позвонить перед доставкой',
        createdAt: '2025-06-15T10:30:00Z',
        updatedAt: '2025-06-15T10:30:00Z'
    },
    {
        id: '2',
        userId: '2',
        userEmail: 'petr@example.com',
        userFullName: 'Петр Петров',
        userPhone: '+7 (999) 765-43-21',
        userAddress: 'г. Санкт-Петербург, Невский пр., д. 20, кв. 10',
        paymentMethod: 'card',
        items: [
            { id: '3', productId: '3', productName: 'Амортизатор Bilstein', quantity: 2, price: 8900 }
        ],
        total: 17800,
        status: 'processing',
        comment: '',
        createdAt: '2025-06-14T15:20:00Z',
        updatedAt: '2025-06-15T09:00:00Z'
    },
    {
        id: '3',
        userId: '3',
        userEmail: 'alena@example.com',
        userFullName: 'Алена Смирнова',
        userPhone: '+7 (999) 111-22-33',
        userAddress: 'г. Казань, ул. Баумана, д. 5',
        paymentMethod: 'online',
        items: [
            { id: '4', productId: '4', productName: 'Свечи зажигания NGK', quantity: 4, price: 850 },
            { id: '5', productId: '5', productName: 'Воздушный фильтр K&N', quantity: 1, price: 2800 }
        ],
        total: 6200,
        status: 'delivered',
        comment: 'Оставить у двери',
        createdAt: '2025-06-13T08:45:00Z',
        updatedAt: '2025-06-14T16:30:00Z'
    }
]

export function getOrders(): Order[] {
    const saved = localStorage.getItem('orders')
    if (saved) {
        return JSON.parse(saved)
    }
    localStorage.setItem('orders', JSON.stringify(mockOrders))
    return mockOrders
}

export function updateOrderStatus(orderId: string, newStatus: Order['status']): boolean {
    const orders = getOrders()
    const orderIndex = orders.findIndex(o => o.id === orderId)
    if (orderIndex === -1) return false
    orders[orderIndex].status = newStatus
    orders[orderIndex].updatedAt = new Date().toISOString()
    localStorage.setItem('orders', JSON.stringify(orders))
    return true
}

export function getUserOrders(userId: string): Order[] {
    const orders = getOrders()
    return orders.filter(o => o.userId === userId)
}