import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { config } from '@config/config';
import { spawnPostgres } from '@shared/modules/database/spawn';

const db: FastifyPluginAsync = async (fastify) => {
    const connection = spawnPostgres(config.database);
    fastify.decorate('db', connection);
};

export default fp(db, { name: 'db' });
