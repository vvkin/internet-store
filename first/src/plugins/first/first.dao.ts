import { DatabaseConnection } from '@shared/modules/database/model';
import { Product } from '@model/domain/product';
import { PriceListItem } from '@model/domain/price-list-item';

export class FirstDao {
    constructor(private db: DatabaseConnection) {}

    async getProductDetails(id: number): Promise<Product | undefined> {
        return this.db<Product>('products')
            .select(['id', 'name', 'price', 'description'])
            .where({ id })
            .first();
    }

    async getPriceList(limit?: number): Promise<PriceListItem[]> {
        return this.db<PriceListItem>('products')
            .select(['id', 'name', 'price'])
            .modify((query) => (limit ? query.limit(limit) : query));
    }
}
