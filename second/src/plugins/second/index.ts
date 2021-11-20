import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { SecondDao } from '@plugins/second/second.dao';
import { SecondService } from '@plugins/second/second.service';
import { secondRoutes } from '@plugins/second/second.route';

export const second: FastifyPluginAsync = async (fastify) => {
    const secondDao = new SecondDao(fastify.db);
    const secondService = new SecondService(secondDao);

    fastify.decorate('secondService', secondService);
    fastify.register(secondRoutes, { prefix: '/api/public' });
};

export default fp(second, { name: 'second', dependencies: ['db'] });
