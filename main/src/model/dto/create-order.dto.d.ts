export interface CreateOrderDto {
    deliveryMethodId: number;
    products: OrderDetailsDto[];
    fullName: string;
    phone: string;
    address: string;
    requiredDate: string;
}
export interface OrderDetailsDto {
    productId: number;
    quantity: number;
}
