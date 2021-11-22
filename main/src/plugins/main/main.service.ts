import { MainDao } from '@plugins/main/main.dao';
import { SearchQueryDto } from '@model/dto/search-query.dto';
import { ProductDto } from '@model/dto/product.dto';
import { FirstService } from '@plugins/first/first.service';
import { SecondService } from '@plugins/second/second.service';
import { WhereQuery } from '@shared/modules/database/model/where.model';
import { Product } from '@model/domain/product';
import { EntityNotFound } from '@shared/modules/errors/abstract-errors';
import { ProductsDto } from '@model/dto/products.dto';
import { UpdateProductDto } from '@model/dto/update-product.dto';
import { CreateProductDto } from '@model/dto/create-product.dto';

export class MainService {
    constructor(
        private dao: MainDao,
        private firstService: FirstService,
        private secondService: SecondService
    ) {}

    async getProductsByQuery(query: SearchQueryDto): Promise<ProductsDto> {
        const mainList = await this.dao.getProductsByQuery(
            query as WhereQuery<Product>
        );
        const firstList = await this.firstService.getProductsByQuery(query);
        const secondList = await this.secondService.getProductsByQuery(query);
        const products = mainList.concat(firstList).concat(secondList);

        if (!products.length) {
            throw new EntityNotFound('Not found any products by query');
        } else return { products };
    }

    async getProductById(id: number): Promise<ProductDto> {
        const product = await this.dao.getProductById(id);
        if (!product) {
            throw new EntityNotFound('Not found any products by id');
        } else return product;
    }

    async deleteProductById(id: number): Promise<void> {
        await this.dao.deleteProductById(id);
    }

    async updateProductById(id: number, dto: UpdateProductDto): Promise<void> {
        await this.dao.updateProductById(id, dto);
    }

    async createProduct(dto: CreateProductDto): Promise<void> {
        await this.dao.createProduct(dto);
    }
}
