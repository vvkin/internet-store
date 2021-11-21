import { config } from '@config/config';
import { MainDao } from '@plugins/main/main.dao';
import { SearchQueryDto } from '@model/dto/search-query.dto';
import { ProductDto } from '@model/dto/product.dto';
import { FirstService } from '@plugins/first/first.service';
import { SecondService } from '@plugins/second/second.service';

export class MainService {
    constructor(
        private dao: MainDao,
        private firstService: FirstService,
        private secondService: SecondService
    ) {}

    async getProductsByQuery(query: SearchQueryDto): Promise<ProductDto> {
        const firstList = await this.firstService.getProductsByQuery(query);
        const secondList = await this.secondService.getProductsByQuery(query);
        return { products: firstList.concat(secondList) };
    }
}
