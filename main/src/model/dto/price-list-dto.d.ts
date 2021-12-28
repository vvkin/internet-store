export interface PriceListDto {
    priceList: {
        id: number;
        externalName?: string;
        name: string;
        price: number;
    }[];
}
