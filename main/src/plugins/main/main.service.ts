import { config } from '@config/config';
import { MainDao } from '@plugins/main/main.dao';
import { SearchQueryDto } from '@model/dto/search-query.dto';
import { ProductDto } from '@model/dto/product.dto';
import { FirstService } from '@plugins/first/first.service';
import { SecondService } from '@plugins/second/second.service';
import { WhereQuery } from '@shared/modules/database/model/where.model';
import { Product } from '@model/domain/product';
import { EntityNotFound } from '@shared/modules/errors/abstract-errors';

export class MainService {
    constructor(
        private dao: MainDao,
        private firstService: FirstService,
        private secondService: SecondService
    ) {}

    async getProductsByQuery(query: SearchQueryDto): Promise<ProductDto> {
        const mainList = await this.dao.getProductsByQuery(
            query as WhereQuery<Product>
        );
        const firstList = await this.firstService.getProductsByQuery(query);
        const secondList = await this.secondService.getProductsByQuery(query);
        const products = mainList.concat(firstList).concat(secondList);

        if (!products.length) {
            throw new EntityNotFound('Not found any products by query');
        } else return { products };
    }
}
