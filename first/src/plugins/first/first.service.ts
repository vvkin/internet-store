import { FirstDao } from '@plugins/first/first.dao';
import { PriceListDto } from '@model/dto/price-list.dto';
import { DetailsDto } from '@model/dto/details.dto';
import { EntityNotFound } from '@shared/modules/errors/abstract-errors';

export class FirstService {
    constructor(private dao: FirstDao) {}

    async getPriceList(limit?: number): Promise<PriceListDto> {
        const items = await this.dao.getPriceList(limit);
        if (!items) {
            throw new EntityNotFound('Price list is empty');
        } else return { priceList: items };
    }

    async getProductDetails(id: number): Promise<DetailsDto> {
        const details = await this.dao.getProductDetails(id);
        if (!details) {
            throw new EntityNotFound('Product does not exist');
        } else return details;
    }
}
