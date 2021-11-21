import { Product } from '@model/domain/product';
import { config } from '@config/config';
import { getRequest } from '@lib/http-utils';
import { SearchQueryDto } from '@model/dto/search-query.dto';
import { buildProductSpecificationMap } from '@modules/specification/product/build-map';
import { applyProductSpecification } from '@modules/specification/product/apply';

const { firstHost } = config.suppliers;

export class FirstService {
    async getProductsByQuery(query: SearchQueryDto): Promise<Product[]> {
        const url = `${firstHost}/api/public/price-list`;
        const { data } = await getRequest<{ priceList: Product[] }>(url);
        const specificationMap = buildProductSpecificationMap(query);
        return applyProductSpecification(data.priceList, specificationMap);
    }
}
