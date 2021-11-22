export interface ProductsDto {
    products: {
        id: number;
        name: string;
        price: number;
        description?: string;
        category?: string;
        company?: string;
        volume?: number;
        discount?: number;
        degree?: number;
        inStock?: number;
    }[];
}
