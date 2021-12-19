import { DatabaseConnection } from '@shared/modules/database/model';
import { WhereQuery } from '@shared/modules/database/model/where.model';
import { Builder } from '@shared/modules/database/builder';
import { Product } from '@model/domain/product';
import { StringQuery } from '@model/domain/string-query';
import { NumberQuery } from '@model/domain/number-query';

type BuildEntry = [string, NumberQuery & StringQuery];

export class SecondDao {
    constructor(private db: DatabaseConnection) {}

    private buildQuery(query: WhereQuery<Product>): string {
        const baseSql = this.db.select().from('products');
        const builder = new Builder(baseSql);

        for (const [column, filters] of Object.entries(query) as BuildEntry[]) {
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

    async getPage(pageNumber: number, pageSize: number): Promise<Product[]> {
        const products = this.db
            .select<Product[]>('*')
            .from('products')
            .offset((pageNumber - 1) * pageSize)
            .limit(pageSize);
        return products;
    }
}
