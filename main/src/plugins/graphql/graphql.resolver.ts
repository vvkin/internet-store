import { CreateProductDto } from '@model/dto/create-product.dto';
import { MainService } from '@plugins/main/main.service';
import { CreateOrderDto } from '@model/dto/create-order.dto';
import { CreateSupplierDto } from '@model/dto/create-supplier.dto';

export const makeGraphqlResolvers = (mainService: MainService) => ({
    Query: {
        search: async (_: unknown, context: { name: string }) => {
            const query = { name: { like: context.name } };
            const { products } = await mainService.getProductsByQuery(query);
            return products;
        },
        product: async (_: unknown, context: { id: number }) => {
            const { id } = context;
            return mainService.getProductById(id);
        },
        supplier: async (_: unknown, context: { id: number }) => {
            const { id } = context;
            return mainService.getSupplierById(id);
        },
        order: async (_: unknown, context: { id: number }) => {
            const { id } = context;
            return mainService.getOrderById(id);
        },
    },
    Mutation: {
        createProduct: async (
            _: unknown,
            context: { data: CreateProductDto }
        ) => {
            const { data } = context;
            return mainService.createProduct(data);
        },
        createSupplier: async (
            _: unknown,
            context: { data: CreateSupplierDto }
        ) => {
            const { data } = context;
            return mainService.createSupplier(data);
        },
        createOrder: async (_: unknown, context: { data: CreateOrderDto }) => {
            const { data } = context;
            return mainService.createOrder(data);
        },
    },
});
