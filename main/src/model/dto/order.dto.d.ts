export type OrderDto = {
    id?: number;
    deliveryMethodId: number;
    fullName: string;
    phone: string;
    address: string;
    requiredDate: string;
} & {
    products: {
        id?: number;
        productId: number;
        orderId: number;
        externalName: string;
        quantity: number;
    }[];
};
