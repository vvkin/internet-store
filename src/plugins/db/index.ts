import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { Pool, QueryResult, types } from 'pg';
import { config } from '@config/config';
import { DatabaseConfig } from '@config/model/database.config';

types.setTypeParser(types.builtins.INT4, (value) => parseInt(value, 10));
types.setTypeParser(types.builtins.INT8, (value) => parseInt(value, 10));

export type QueryFunction = <T>(
    sql: string,
    values?: unknown[]
) => Promise<QueryResult<T>>;

const spawnQuery: (config: DatabaseConfig) => QueryFunction = (config) => {
    const pool = new Pool(config);
    return (sql, values) => pool.query(sql, values);
};

const db: FastifyPluginAsync = async (fastify) => {
    fastify.decorate('firstSource', {
        query: spawnQuery(config.firstSource),
    });
    fastify.decorate('secondSource', {
        query: spawnQuery(config.secondSource),
    });
};

export default fp(db, { name: 'db' });

declare module 'fastify' {
    interface FastifyInstance {
        firstSource: { query: QueryFunction };
        secondSource: { query: QueryFunction };
    }
}
