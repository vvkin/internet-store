export interface Order {
    id?: number;
    deliveryMethodId: number;
    fullName: string;
    phone: string;
    address: string;
    requiredDate: string;
}
