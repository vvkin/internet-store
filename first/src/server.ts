import Fastify, { FastifyPluginAsync } from 'fastify';
import { config } from '@config/config';
import { app } from './app';

const { port, host, logger } = config.server;

const bootstrap = async (app: FastifyPluginAsync) => {
    try {
        const server = Fastify({ logger });
        server.register(app);
        await server.listen(port, host);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

bootstrap(app);
