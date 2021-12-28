export interface SearchDto {
    products: {
        id: number;
        externalName: string;
        name: string;
        price: number;
        description?: string;
    }[];
}
