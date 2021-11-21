import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { SecondService } from '@plugins/second/second.service';

export const second: FastifyPluginAsync = async (fastify) => {
    const secondService = new SecondService();
    fastify.decorate('secondService', secondService);
};

export default fp(second, { name: 'second' });
