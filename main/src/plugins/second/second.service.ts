import { SearchQueryDto } from '@model/dto/search-query.dto';
import { stringify } from 'qs';
import { Product } from '@model/domain/product';
import { config } from '@config/config';
import { getRequest } from '@lib/http.utils';
import { ProductsDto } from '@model/dto/products.dto';
import { ObjectCache } from '@lib/object-cache';
import { ProductPageListDto } from '@model/dto/product-page-list.dto';
import { ProductDto } from '@model/dto/product.dto';

const { secondHost } = config.suppliers;

export class SecondService {
    constructor(private pagesCache: ObjectCache<ProductPageListDto>) {}

    private async fetchProductList(page: number): Promise<ProductPageListDto> {
        const url = `${secondHost}/api/public/list?page=${page}`;
        const { data } = await getRequest<ProductPageListDto>(url);
        return data;
    }

    private async fetchProductsSearch(
        query: SearchQueryDto
    ): Promise<ProductDto[]> {
        const querystring = stringify(query);
        const url = `${secondHost}/api/public/search`;
        const { data } = await getRequest<ProductsDto>(url + '?' + querystring);
        return data.products;
    }

    async getProductsByQuery(query: SearchQueryDto): Promise<Product[]> {
        const products = this.fetchProductsSearch(query);
        return products ?? [];
    }

    async getProductsListPage(page: number): Promise<ProductPageListDto> {
        const pageString = page.toString();
        const cachedPage = this.pagesCache.get(pageString);
        if (cachedPage === undefined) {
            const pageDto = await this.fetchProductList(page);
            this.pagesCache.set(pageString, pageDto);
            return pageDto;
        } else return cachedPage;
    }

    async getProductsListAllPages(): Promise<Product[]> {
        const pages: Product[][] = [];
        for (let page = 1; ; ++page) {
            const { products, last } = await this.getProductsListPage(page);
            pages.push(products);
            if (last) break;
        }
        return pages.flat();
    }

    async updateCache(): Promise<void> {
        this.pagesCache.clear();
        await this.getProductsListAllPages();
    }
}
