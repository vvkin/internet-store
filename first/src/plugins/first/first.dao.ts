import { DatabaseConnection } from '@shared/database/model';
import { ProductDto } from '@model/dto/product.dto';
import { PriceListEntry } from '@model/dto/price-list-entry';

export class FirstDao {
    constructor(private db: DatabaseConnection) {}

    async getProductDetails(id: number): Promise<ProductDto> {
        const records = await this.db<ProductDto>('products')
            .select(['id', 'name', 'price', 'description'])
            .where({ id });
        return records[0];
    }

    async getPriceList(limit?: number): Promise<PriceListEntry[]> {
        const records = this.db<PriceListEntry>('products')
            .select(['id', 'name', 'price'])
            .modify((query) => (limit ? query.limit(limit) : query));
        return records;
    }
}
