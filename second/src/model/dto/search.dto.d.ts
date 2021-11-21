export interface SearchDto {
    products: {
        id: number;
        name: string;
        price: number;
        description?: string;
    }[];
}
