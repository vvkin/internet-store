import 'dotenv/config';
import {
    DatabaseConfig,
    SchemaConfig,
    ServerConfig,
} from '@shared/model/config';
import { SuppliersConfig } from '@config/model/suppliers.config';
import { join } from 'path';

export const config = {
    server: {
        port: process.env.PORT ?? 8080,
        host: process.env.HOST ?? '0.0.0.0',
        logger: true,
        pluginTimeout: 240000,
    } as ServerConfig,
    database: {
        host: process.env.PG_HOST,
        port: parseInt(process.env.PG_PORT ?? '', 10),
        user: process.env.PG_USER,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
    } as DatabaseConfig,
    schema: {
        path: join(__dirname, '../', 'schema/'),
    } as SchemaConfig,
    suppliers: {
        firstHost: process.env.FIRST_SUPPLIER_HOST,
        secondHost: process.env.SECOND_SUPPLIER_HOST,
    } as SuppliersConfig,
};
