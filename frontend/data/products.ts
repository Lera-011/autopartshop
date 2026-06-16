// data/products.ts

export type Product = {
    id: string
    title: string
    price: number
    brand: string
    category: string
    description: string
    image?: string
    inStock: boolean
}

// ✅ ПРОСТОЙ МАССИВ (без fs, без чтения файлов)
export const products: Product[] = [
    {
        id: '1',
        title: 'Тормозные колодки Brembo',
        price: 4500,
        brand: 'Brembo',
        category: 'Тормозная система',
        description: 'Премиальные керамические тормозные колодки для европейских автомобилей.',
        inStock: true
    },
    {
        id: '2',
        title: 'Масляный фильтр MANN',
        price: 1200,
        brand: 'MANN-FILTER',
        category: 'Фильтры',
        description: 'Оригинальный масляный фильтр для двигателей BMW, Mercedes-Benz, Audi.',
        inStock: true
    },
    {
        id: '3',
        title: 'Амортизатор Bilstein',
        price: 8900,
        brand: 'Bilstein',
        category: 'Подвеска',
        description: 'Газонаполненный амортизатор для спортивной подвески.',
        inStock: true
    },
    {
        id: '4',
        title: 'Свечи зажигания NGK',
        price: 850,
        brand: 'NGK',
        category: 'Зажигание',
        description: 'Иридиевые свечи зажигания с увеличенным сроком службы.',
        inStock: true
    },
    {
        id: '5',
        title: 'Воздушный фильтр K&N',
        price: 2800,
        brand: 'K&N',
        category: 'Фильтры',
        description: 'Высокопоточный воздушный фильтр. Увеличивает мощность.',
        inStock: true
    },
    {
        id: '6',
        title: 'Ремень ГРМ Gates',
        price: 3200,
        brand: 'Gates',
        category: 'Двигатель',
        description: 'Комплект ремня ГРМ с натяжителями.',
        inStock: true
    },
    {
        id: '7',
        title: 'Радиатор Nissens',
        price: 12500,
        brand: 'Nissens',
        category: 'Охлаждение',
        description: 'Алюминиевый радиатор для системы охлаждения двигателя.',
        inStock: true
    },
    {
        id: '8',
        title: 'Стартер Bosch',
        price: 7800,
        brand: 'Bosch',
        category: 'Электрика',
        description: 'Восстановленный стартер с гарантией.',
        inStock: true
    }
]

// Функции для работы с товарами (заглушки)
export function getProducts(): Product[] {
    return products
}

export function getProductById(id: string): Product | undefined {
    return products.find(product => product.id === id)
}

// Заглушка для добавления товара (только для демонстрации)
export async function addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    await new Promise(resolve => setTimeout(resolve, 500))
    const newProduct = {
        ...product,
        id: (products.length + 1).toString()
    }
    products.push(newProduct)
    return newProduct
}

// Заглушка для удаления товара
export async function deleteProduct(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = products.findIndex(p => p.id === id)
    if (index === -1) return false
    products.splice(index, 1)
    return true
}