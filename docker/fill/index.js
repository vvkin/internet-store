import './config/env.js';
import { fillFirst, fillSecond, fillMain } from './lib/db.js';

await fillFirst(5e4);
await fillSecond(5e4);
await fillMain(1e5);
