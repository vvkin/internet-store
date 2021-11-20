// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as fastify from 'fastify';
import { DatabaseConnection } from '@shared/database/model';
import { FirstService } from '@plugins/first/first.service';

declare module 'fastify' {
    export interface FastifyInstance {
        db: DatabaseConnection;
        firstService: FirstService;
    }
}
