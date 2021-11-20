import { join } from 'path';
import { FastifyPluginAsync } from 'fastify';
import fastifyAutoload, { AutoloadPluginOptions } from 'fastify-autoload';
import { errorHandler } from '@shared/modules/fastify/error-hander';

export type AutoloadOptions = {
    // additional options
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AutoloadOptions> = async (fastify, opts) => {
    fastify.register(fastifyAutoload, {
        dir: join(__dirname, 'plugins'),
        options: opts,
    });
    fastify.setErrorHandler(errorHandler);
};

export { app };
