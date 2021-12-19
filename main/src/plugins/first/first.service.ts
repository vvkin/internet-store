import { Product } from '@model/domain/product';
import { config } from '@config/config';
import { getRequest } from '@lib/http.utils';
import { ListCache } from '@lib/list-cache';

const { firstHost } = config.suppliers;

export class FirstService {
    constructor(private cache: ListCache<Product>) {}

    private async fetchPriceList(): Promise<Product[]> {
        const url = `${firstHost}/api/public/price-list`;
        const { data } = await getRequest<{ priceList: Product[] }>(url);
        return data.priceList;
    }

    async getPriceList(): Promise<Product[]> {
        if (this.cache.empty()) {
            const products = (await this.fetchPriceList()) ?? [];
            this.cache.replace(products);
            return products;
        } else return this.cache.getAll();
    }

    async updateCache(): Promise<void> {
        this.cache.clear();
        await this.getPriceList();
    }

    // async getProductsByQuery(query: SearchQueryDto): Promise<Product[]> {
    //     const rawProducts = await this.getPriceList();
    //     const specificationMap = buildProductSpecificationMap(query);
    //     const products = applyProductSpecification(
    //         rawProducts,
    //         specificationMap
    //     );
    //     return products ?? [];
    // }
}
