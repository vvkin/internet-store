import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

config({ path: join(__dirname, '../../.env') });
