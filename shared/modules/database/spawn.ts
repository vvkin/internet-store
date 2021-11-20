import { knex } from 'knex';
import { DatabaseConfig } from '../../model/config';
import { DatabaseConnection } from './model';

export const spawnPostgres = (config: DatabaseConfig): DatabaseConnection => {
    return knex({
        client: 'pg',
        connection: config,
        pool: { min: 2, max: 10 },
    });
};
