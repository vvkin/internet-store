import { __dirname } from './env.js';
import { join } from 'path';

export const config = {
    schemaPath: join(__dirname, '../', 'schema'),
};
