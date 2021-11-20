import 'dotenv/config';
import { join } from 'path';
import {
    ServerConfig,
    DatabaseConfig,
    SchemaConfig,
} from '@shared/model/config';

export const config = {
    server: {
        port: process.env.PORT ?? 8080,
        host: process.env.HOST ?? '0.0.0.0',
        logger: true,
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
};
