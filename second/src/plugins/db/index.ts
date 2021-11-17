import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const db: FastifyPluginAsync = async (fastify) => {
    fastify.decorate('db', async () => 'mock');
};

export default fp(db, { name: 'db' });

declare module 'fastify' {
    interface FastifyInstance {
        db: () => Promise<string>;
    }
}
