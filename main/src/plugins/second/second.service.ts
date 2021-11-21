import { SearchQueryDto } from '@model/dto/search-query.dto';
import { stringify } from 'qs';
import { Product } from '@model/domain/product';
import { config } from '@config/config';
import { getRequest } from '@lib/http-utils';
import { ProductDto } from '@model/dto/product.dto';

const { secondHost } = config.suppliers;

export class SecondService {
    async getProductsByQuery(query: SearchQueryDto): Promise<Product[]> {
        const querystring = stringify(query);
        const url = `${secondHost}/api/public/search`;
        const { data } = await getRequest<ProductDto>(url + '?' + querystring);
        return data.products;
    }
}
