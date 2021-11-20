import { FirstDao } from '@plugins/first/first.dao';
import { PriceListDto } from '@model/dto/price-list.dto';
import { DetailsDto } from '@model/dto/details.dto';

export class FirstService {
    constructor(private dao: FirstDao) {}

    async getPriceList(limit?: number): Promise<PriceListDto | null> {
        const items = await this.dao.getPriceList(limit);
        return items ? { priceList: items } : null;
    }

    async getProductDetails(id: number): Promise<DetailsDto | null> {
        const details = await this.dao.getProductDetails(id);
        return details ?? null;
    }
}
