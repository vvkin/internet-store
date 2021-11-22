export interface CreateProductDto {
    supplierId: number;
    categoryId: number;
    name: string;
    price: number;
    volume: number;
    degree: number;
    unitsInStock: number;
    discount: number;
    description: string;
}
