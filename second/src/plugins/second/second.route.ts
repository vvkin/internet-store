import { FastifyPluginAsync } from 'fastify';
import { initSchemas, SearchRequest } from '@plugins/second/second.schema';

export const secondRoutes: FastifyPluginAsync = async (fastify) => {
    const { secondService } = fastify;
    const { searchSchema } = await initSchemas();

    fastify.route<SearchRequest>({
        method: 'GET',
        url: '/search',
        schema: searchSchema,
        handler: async (request, reply) => {
            const { query } = request;
            const products = await secondService.getProductsByQuery(query);
            reply.code(200).send(products);
        },
    });
};
