import { DatabaseConnection } from '@shared/modules/database/model';
import { WhereQuery } from '@shared/modules/database/model/where.model';
import { Builder } from '@shared/modules/database/builder';
import { Product } from '@model/domain/product';

export class SecondDao {
    constructor(private db: DatabaseConnection) {}

    private buildQuery(query: WhereQuery<Product>): string {
        const baseSql = this.db.select().from('products');
        const builder = new Builder(baseSql);

        for (const [column, filters] of Object.entries(query)) {
            builder
                .includes(column, filters.includes)
                .min(column, filters.min)
                .max(column, filters.max)
                .like(column, filters.like);
        }

        return builder.collect();
    }

    async getProductsByQuery(query: WhereQuery<Product>): Promise<Product[]> {
        const rawSql = this.buildQuery(query);
        const rawResult = await this.db.raw<{ rows: Product[] }>(rawSql);
        return rawResult.rows;
    }
}
