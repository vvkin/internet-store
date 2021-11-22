import { FastifyPluginAsync } from 'fastify';
import { initSchemas, SearchRequest } from '@plugins/main/main.schema';
import { ProductParams } from '@model/api/product/product-params';
import { ProductCreateBody } from '@model/api/product/product-create-body';
import { ProductUpdateBody } from '@model/api/product/product-update-body';

export const mainRoutes: FastifyPluginAsync = async (fastify) => {
    const { mainService } = fastify;
    const { searchSchema } = await initSchemas();

    fastify.route<SearchRequest>({
        method: 'GET',
        url: '/search',
        schema: searchSchema,
        handler: async (request, reply) => {
            const { query } = request;
            const products = await mainService.getProductsByQuery(query);
            reply.code(200).send(products);
        },
    });

    fastify.route<{ Params: ProductParams }>({
        method: 'GET',
        url: '/products/:id',
        handler: async (request, reply) => {
            const { id } = request.params;
            const product = await mainService.getProductById(id);
            reply.code(200).send(product);
        },
    });

    fastify.route<{ Params: ProductParams }>({
        method: 'DELETE',
        url: '/products/:id',
        handler: async (request, reply) => {
            const { id } = request.params;
            await mainService.deleteProductById(id);
            reply.code(204).send();
        },
    });

    fastify.route<{ Params: ProductParams; Body: ProductUpdateBody }>({
        method: 'PUT',
        url: '/products/:id',
        handler: async (request, reply) => {
            const { id } = request.params;
            const { body: dto } = request;
            await mainService.updateProductById(id, dto);
            reply.code(204).send();
        },
    });

    fastify.route<{ Body: ProductCreateBody }>({
        method: 'POST',
        url: '/products',
        handler: async (request, reply) => {
            const { body: dto } = request;
            await mainService.createProduct(dto);
            reply.code(201).send();
        },
    });
};
