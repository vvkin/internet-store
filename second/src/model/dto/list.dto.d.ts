export interface ListDto {
    products: {
        id: number;
        name: string;
        price: number;
        description?: string;
    }[];
    last: boolean;
}
