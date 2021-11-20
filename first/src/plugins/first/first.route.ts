import { FastifyPluginAsync } from 'fastify';
import {
    DetailsRequest,
    PriceListRequest,
    initSchemas,
} from '@plugins/first/first.schema';

export const firstRoutes: FastifyPluginAsync = async (fastify) => {
    const { firstService } = fastify;
    const { detailsSchema, priceListSchema } = await initSchemas();

    fastify.route<DetailsRequest>({
        method: 'GET',
        url: '/details/:id',
        schema: detailsSchema,
        handler: async (request, reply) => {
            const { id } = request.params;
            const details = await firstService.getProductDetails(id);
            reply.code(200).send(details);
        },
    });

    fastify.route<PriceListRequest>({
        method: 'GET',
        url: '/price-list',
        schema: priceListSchema,
        handler: async (request, reply) => {
            const { limit } = request.query;
            const priceList = await firstService.getPriceList(limit);
            reply.code(200).send(priceList);
        },
    });
};
