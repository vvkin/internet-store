export interface ListDto {
    products: {
        id: number;
        externalName: string;
        name: string;
        price: number;
        description?: string;
    }[];
    last: boolean;
}
