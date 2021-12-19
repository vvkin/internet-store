import { config } from '@config/config';
import { SecondDao } from '@plugins/second/second.dao';
import { EntityNotFound } from '@shared/modules/errors/abstract-errors';
import { SearchDto } from '@model/dto/search.dto';
import { SearchQueryDto } from '@model/dto/search-query.dto';
import { WhereQuery } from '@shared/modules/database/model/where.model';
import { Product } from '@model/domain/product';
import { ListDto } from '@model/dto/list.dto';

const { pageSize } = config.search;

export class SecondService {
    constructor(private dao: SecondDao) {}

    async getProductsByQuery(dto: SearchQueryDto): Promise<SearchDto> {
        const products = await this.dao.getProductsByQuery(
            dto as WhereQuery<Product>
        );
        if (!products.length) {
            throw new EntityNotFound('Not found any products by query');
        } else return { products };
    }

    async getPage(pageNumber: number): Promise<ListDto> {
        const products = await this.dao.getPage(pageNumber, pageSize);
        const last = products.length < pageSize;
        return { products, last };
    }
}
