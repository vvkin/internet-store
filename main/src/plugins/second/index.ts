import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { SecondService } from '@plugins/second/second.service';
import { ObjectCache } from '@lib/object-cache';
import { ProductPageListDto } from '@model/dto/product-page-list.dto';

export const second: FastifyPluginAsync = async (fastify) => {
    const cache = new ObjectCache<ProductPageListDto>();
    const secondService = new SecondService(cache);
    fastify.decorate('secondService', secondService);
};

export default fp(second, { name: 'second' });
