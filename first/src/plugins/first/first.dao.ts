import { DatabaseConnection } from '@shared/database/model';
import { Product } from '@model/domain/product';
import { PriceListItem } from '@model/domain/price-list-item';

export class FirstDao {
    constructor(private db: DatabaseConnection) {}

    async getProductDetails(id: number): Promise<Product> {
        const records = await this.db<Product>('products')
            .select(['id', 'name', 'price', 'description'])
            .where({ id });
        return records[0];
    }

    async getPriceList(limit?: number): Promise<PriceListItem[]> {
        const records = this.db<PriceListItem>('products')
            .select(['id', 'name', 'price'])
            .modify((query) => (limit ? query.limit(limit) : query));
        return records;
    }
}
