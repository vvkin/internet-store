import { config } from '@config/config';
import { getRequest } from '@lib/http.utils';
import { ListCache } from '@lib/list-cache';
import { SearchQueryDto } from '@model/dto/search-query.dto';
import { buildProductSpecificationMap } from '@modules/specification/product/build-map';
import { applyProductSpecification } from '@modules/specification/product/apply';
import { ProductDto } from '@model/dto/product.dto';

const { firstHost } = config.suppliers;

export class FirstService {
    constructor(private cache: ListCache<ProductDto>) {}

    private async fetchPriceList(): Promise<ProductDto[]> {
        const url = `${firstHost}/api/public/price-list`;
        const { data } = await getRequest<{ priceList: ProductDto[] }>(url);
        return data.priceList;
    }

    async getPriceList(): Promise<ProductDto[]> {
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

    async getProductsByQuery(query: SearchQueryDto): Promise<ProductDto[]> {
        const rawProducts = await this.getPriceList();
        const specificationMap = buildProductSpecificationMap(query);
        const products = applyProductSpecification(
            rawProducts,
            specificationMap
        );
        return products ?? [];
    }
}
