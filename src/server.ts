import Fastify, { FastifyPluginAsync } from 'fastify';
import { config } from '@config/config';
import { app } from './app';

const { port, host, logger } = config.server;

const bootstrap = async (app: FastifyPluginAsync) => {
    try {
        const server = Fastify({ logger });
        server.register(app);
        server.listen(port, host, () => {
            console.log(`Server started on http://${host}:${port}`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

bootstrap(app);
