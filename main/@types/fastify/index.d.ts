// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as fastify from 'fastify';
import { DatabaseConnection } from '@shared/modules/database/model';
import { MainService } from '@plugins/main/main.service';
import { FirstService } from '@plugins/first/first.service';
import { SecondService } from '@plugins/second/second.service';

declare module 'fastify' {
    export interface FastifyInstance {
        db: DatabaseConnection;
        mainService: MainService;
        firstService: FirstService;
        secondService: SecondService;
    }
}
