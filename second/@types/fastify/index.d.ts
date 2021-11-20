// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as fastify from 'fastify';
import { DatabaseConnection } from '@shared/modules/database/model';
import { SecondService } from '@plugins/second/second.service';

declare module 'fastify' {
    export interface FastifyInstance {
        db: DatabaseConnection;
        secondService: SecondService;
    }
}
