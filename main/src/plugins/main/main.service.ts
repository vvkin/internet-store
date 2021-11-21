import { config } from '@config/config';
import { MainDao } from '@plugins/main/main.dao';
import { SearchQueryDto } from '@model/dto/search-query.dto';
import { ProductDto } from '@model/dto/product.dto';
import { FirstService } from '@plugins/first/first.service';

export class MainService {
    constructor(private dao: MainDao, private firstService: FirstService) {}

    async getProductsByQuery(query: SearchQueryDto): Promise<ProductDto> {
        const firstList = await this.firstService.getProductsByQuery(query);
        return { products: firstList };
    }
}
