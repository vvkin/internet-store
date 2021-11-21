export interface ProductDto {
    products: {
        id: number;
        name: string;
        price: number;
        description?: string;
    }[];
}
