import { SearchQueryDto } from '@model/dto/search-query.dto';
import { stringify } from 'qs';
import { Product } from '@model/domain/product';
import { config } from '@config/config';
import { getRequest } from '@lib/http-utils';
import { ProductsDto } from '@model/dto/products.dto';

const { secondHost } = config.suppliers;

export class SecondService {
    async getProductsByQuery(query: SearchQueryDto): Promise<Product[]> {
        const querystring = stringify(query);
        const url = `${secondHost}/api/public/search`;
        const { data } = await getRequest<ProductsDto>(url + '?' + querystring);
        return data.products ?? [];
    }
}
