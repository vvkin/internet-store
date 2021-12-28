import './config/env.js';
import { fillFirst, fillSecond, fillMain } from './lib/db.js';

await fillFirst(1e4);
await fillSecond(1e4);
await fillMain(5e4);
