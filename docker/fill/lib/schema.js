import { join } from 'path';
import { readFile } from 'fs/promises';
import { config } from '../config/config.js';

const { schemaPath } = config;

const getSchema = async (name) => {
    const path = join(schemaPath, `${name}.json`);
    const content = await readFile(path, 'utf-8');
    return JSON.parse(content);
};

export { getSchema };
