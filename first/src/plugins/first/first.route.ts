import { FastifyPluginAsync } from 'fastify';
import { HttpNotFound } from '@shared/lib/errors/http-errors';

export const firstRoutes: FastifyPluginAsync = async (fastify) => {
    const { firstService } = fastify;

    fastify.route<{
        Params: { id: number };
    }>({
        method: 'GET',
        url: '/details/:id',
        handler: async (request, reply) => {
            const { id } = request.params;
            const details = await firstService.getProductDetails(id);

            if (details === null) {
                const message = `Product with id=${id} not found`;
                throw new HttpNotFound(message);
            }

            reply.code(200).send({ details });
        },
    });

    fastify.route<{
        Querystring: { limit: number };
    }>({
        method: 'GET',
        url: '/price-list',
        handler: async (request, reply) => {
            const { limit } = request.query;
            const priceList = await firstService.getPriceList(limit);
            reply.code(200).send(priceList);
        },
    });
};
