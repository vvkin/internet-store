import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { MainDao } from '@plugins/main/main.dao';
import { MainService } from '@plugins/main/main.service';
import { mainRoutes } from '@plugins/main/main.route';

export const main: FastifyPluginAsync = async (fastify) => {
    const { db, firstService } = fastify;
    const mainDao = new MainDao(db);
    const mainService = new MainService(mainDao, firstService);

    fastify.decorate('mainService', mainService);
    fastify.register(mainRoutes, { prefix: '/api/public' });
};

export default fp(main, { name: 'main', dependencies: ['db', 'first'] });
