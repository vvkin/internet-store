import 'dotenv/config';
import { ServerConfig } from './model/server.config';
import { DatabaseConfig } from './model/database.config';

export const config = {
    server: {
        port: process.env.PORT ?? 8080,
        host: process.env.HOST ?? '0.0.0.0',
        logger: true,
    } as ServerConfig,
    firstSource: {
        host: process.env.PG_HOST,
        port: parseInt(process.env.PG_PORT ?? '', 10),
        user: process.env.PG_FIRST_USER,
        database: process.env.PG_FIRST_DATABASE,
        password: process.env.PG_FIRST_PASSWORD,
    } as DatabaseConfig,
    secondSource: {
        host: process.env.PG_HOST,
        port: parseInt(process.env.PG_PORT ?? '', 10),
        user: process.env.PG_SECOND_USER,
        database: process.env.PG_SECOND_DATABASE,
        password: process.env.PG_SECOND_PASSWORD,
    } as DatabaseConfig,
};
