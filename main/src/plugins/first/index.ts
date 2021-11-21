import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { FirstService } from '@plugins/first/first.service';

export const first: FastifyPluginAsync = async (fastify) => {
    const firstService = new FirstService();
    fastify.decorate('firstService', firstService);
};

export default fp(first, { name: 'first' });
