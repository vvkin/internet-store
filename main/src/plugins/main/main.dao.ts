import { DatabaseConnection } from '@shared/modules/database/model';
import { WhereQuery } from '@shared/modules/database/model/where.model';
import { Product } from 'second/src/model/domain/product';
import { Builder } from '@shared/modules/database/builder';
import { NumberQuery } from '@shared/modules/database/model/number-query.model';
import { StringQuery } from '@shared/modules/database/model/string-query.model';
import { UpdateProductDto } from '@model/dto/update-product.dto';
import { CreateProductDto } from '@model/dto/create-product.dto';

type BuildEntry = [string, NumberQuery & StringQuery];

export class MainDao {
    constructor(private db: DatabaseConnection) {}

    private static mapDtoToEntity(dto: CreateProductDto | UpdateProductDto) {
        return {
            name: dto.name,
            supplier_id: dto.supplierId,
            category_id: dto.categoryId,
            price: dto.price,
            volume: dto.volume,
            degree: dto.degree,
            units_in_stock: dto.unitsInStock,
            discount: dto.discount,
            description: dto.description,
        };
    }

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

    private getProductBaseQuery() {
        return this.db
            .select<Product[]>([
                'p.id as id',
                'p.name as name',
                'c.name as category',
                's.company_name as company',
                'p.price as price',
                'p.volume as volume',
                'p.discount as discount',
                'p.degree as degree',
                'p.units_in_stock as inStock',
                'p.description as description',
            ])
            .from('products as p')
            .join('categories as c', 'p.category_id', 'c.id')
            .join('suppliers as s', 'p.supplier_id', 's.id');
    }

    async getProductById(id: number): Promise<Product> {
        const products = await this.getProductBaseQuery().where({ id });
        return products[0];
    }

    async getAll(): Promise<Product[]> {
        return this.getProductBaseQuery();
    }

    async deleteProductById(id: number): Promise<void> {
        await this.db<number>('products').delete('id').where('id', id);
    }

    async updateProductById(id: number, dto: UpdateProductDto): Promise<void> {
        const entity = MainDao.mapDtoToEntity(dto);
        await this.db('products').update(entity).where({ id });
    }

    async createProduct(dto: CreateProductDto): Promise<void> {
        const entity = MainDao.mapDtoToEntity(dto);
        await this.db('products').insert(entity);
    }
}
