import Fastify, { FastifyPluginAsync } from 'fastify';
import { parse } from 'qs';
import { config } from '@config/config';
import { app } from './app';

const { port, host, logger, pluginTimeout } = config.server;

const bootstrap = async (app: FastifyPluginAsync) => {
    try {
        const server = Fastify({
            logger,
            querystringParser: (str) => parse(str),
            pluginTimeout,
        });
        server.register(app);
        await server.listen(port, host);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

bootstrap(app);
