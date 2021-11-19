import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { FirstDao } from '@plugins/first/first.dao';
import { FirstService } from '@plugins/first/first.service';
import { firstRoutes } from '@plugins/first/first.route';

const first: FastifyPluginAsync = async (fastify) => {
    const firstDao = new FirstDao(fastify.db);
    const firstService = new FirstService(firstDao);

    fastify.decorate('firstService', firstService);
    fastify.register(firstRoutes, { prefix: '/api/public' });
};

export default fp(first, { name: 'first', dependencies: ['db'] });
