import { FastifyPluginAsync } from 'fastify';
import { initSchemas, SearchRequest } from '@plugins/main/main.schema';

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
};
