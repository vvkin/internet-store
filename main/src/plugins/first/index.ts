import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { FirstService } from '@plugins/first/first.service';
import { ListCache } from '@lib/list-cache';
import { Product } from '@model/domain/product';

export const first: FastifyPluginAsync = async (fastify) => {
    const cache = new ListCache<Product>();
    const firstService = new FirstService(cache);
    fastify.decorate('firstService', firstService);
};

export default fp(first, { name: 'first' });
