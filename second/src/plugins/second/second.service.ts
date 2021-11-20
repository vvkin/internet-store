import { SecondDao } from '@plugins/second/second.dao';
import { WhereQuery } from '@shared/modules/database/model/where.model';
import { Product } from '@model/domain/product';
import { EntityNotFound } from '@shared/modules/errors/abstract-errors';
import { SearchDto } from '@model/dto/search.dto';

export class SecondService {
    constructor(private dao: SecondDao) {}

    async getProductsByQuery(dto: WhereQuery<Product>): Promise<SearchDto> {
        const products = await this.dao.getProductsByQuery(dto);
        if (!products.length) {
            throw new EntityNotFound('Not found any products by query');
        } else return { products };
    }
}
