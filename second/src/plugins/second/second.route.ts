import { FastifyPluginAsync } from 'fastify';
import { initSchemas } from '@plugins/second/second.schema';
import { ListQuery } from '@model/api/search/list-query';
import { SearchQuery } from '@model/api/search/search-query';

export const secondRoutes: FastifyPluginAsync = async (fastify) => {
    const { secondService } = fastify;
    const { searchSchema, listSchema } = await initSchemas();

    fastify.route<{ Querystring: SearchQuery }>({
        method: 'GET',
        url: '/search',
        schema: searchSchema,
        handler: async (request, reply) => {
            const { query } = request;
            const products = await secondService.getProductsByQuery(query);
            reply.code(200).send(products);
        },
    });

    fastify.route<{ Querystring: ListQuery }>({
        method: 'GET',
        url: '/list',
        schema: listSchema,
        handler: async (request, reply) => {
            const { page } = request.query;
            const listDto = await secondService.getPage(page);
            reply.code(200).send(listDto);
        },
    });
};
