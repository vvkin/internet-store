import { knex } from 'knex';
import { DatabaseConfig } from '../../model/config';
import { DatabaseConnection } from './model';
import { camelCaseToSnakeCase, objectToCamelCase } from '../../lib/case.utils';

export const spawnPostgres = (config: DatabaseConfig): DatabaseConnection => {
    return knex({
        client: 'pg',
        connection: config,
        pool: { min: 2, max: 10 },
        wrapIdentifier: (value) => camelCaseToSnakeCase(value),
        postProcessResponse: (result) => objectToCamelCase(result),
    });
};
