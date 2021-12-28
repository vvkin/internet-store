export interface Product {
    id: number;
    name: string;
    externalName: string;
    price: number;
    description?: string;
    category?: string;
    company?: string;
    volume?: number;
    discount?: number;
    degree?: number;
    inStock?: number;
}
