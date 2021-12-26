import { schedule } from 'node-cron';
import { EntityNotFound } from '@shared/modules/errors/abstract-errors';
import { WhereQuery } from '@shared/modules/database/model/where.model';
import { everyDayAt } from '@lib/cron.utils';
import { buildProductSpecificationMap } from '@modules/specification/product/build-map';
import { applyProductSpecification } from '@modules/specification/product/apply';
import { MainDao } from '@plugins/main/main.dao';
import { FirstService } from '@plugins/first/first.service';
import { SecondService } from '@plugins/second/second.service';
import { SearchQueryDto } from '@model/dto/search-query.dto';
import { ProductDto } from '@model/dto/product.dto';
import { Product } from '@model/domain/product';
import { ProductsDto } from '@model/dto/products.dto';
import { UpdateProductDto } from '@model/dto/update-product.dto';
import { CreateProductDto } from '@model/dto/create-product.dto';
import { OrderDto } from '@model/dto/order.dto';
import { CreateOrderDto } from '@model/dto/create-order.dto';
import { CreateSupplierDto } from '@model/dto/create-supplier.dto';
import { SupplierDto } from '@model/dto/supplier.dto';

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
        const firstList = await this.firstService.getPriceList();
        const secondList = await this.secondService.getProductsListAllPages();

        const specificationMap = buildProductSpecificationMap(query);
        const products = mainList
            .concat(applyProductSpecification(firstList, specificationMap))
            .concat(applyProductSpecification(secondList, specificationMap));

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

    async deleteProductById(id: number): Promise<Product> {
        return this.dao.deleteProductById(id);
    }

    async updateProductById(
        id: number,
        dto: UpdateProductDto
    ): Promise<Product> {
        return this.dao.updateProductById(id, dto);
    }

    async createProduct(dto: CreateProductDto): Promise<Product> {
        return this.dao.createProduct(dto);
    }

    async createSupplier(dto: CreateSupplierDto): Promise<SupplierDto> {
        return this.dao.createSupplier(dto);
    }

    async getSupplierById(id: number): Promise<SupplierDto> {
        return this.dao.getSupplierById(id);
    }

    async getOrderById(id: number): Promise<OrderDto> {
        const order = await this.dao.getOrderById(id);
        const details = await this.dao.getOrderDetailsById(id);
        return { products: details, ...order };
    }

    async createOrder(dto: CreateOrderDto): Promise<OrderDto> {
        const { products, ...orderDto } = dto;
        const order = await this.dao.createOrder(orderDto);
        const details = await this.dao.addOrderDetails(
            order.id as number,
            products
        );
        return { products: details, ...order };
    }

    async updateCache(): Promise<void> {
        await this.firstService.updateCache();
        await this.secondService.updateCache();
    }

    async scheduleCacheUpdate(): Promise<void> {
        const cronString = everyDayAt(0, 0); // midnight
        schedule(cronString, async () => {
            await this.updateCache();
        });
    }
}
