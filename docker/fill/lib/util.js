import { randomInt, randomUUID } from 'crypto';
import { loremIpsum } from 'lorem-ipsum';

const RANDOM_GENERATOR_MAP = {
    pick: (...items) => items[Math.floor(Math.random() * items.length)],
    float: (min, max, precision) => {
        const value = Math.random() * (max - min) + min;
        return parseFloat(value.toFixed(precision));
    },
    int: randomInt,
    uuid: (prefix, length) => {
        const value = `${prefix}_${randomUUID()}`;
        return length ? value.slice(length) : value;
    },
    lorem: (maxLength) => loremIpsum({ count: randomInt(1, maxLength) }),
    email: (domain) => `${randomUUID()}@${domain}`,
};

const getRandomGenerator = (type) => {
    const mapper = RANDOM_GENERATOR_MAP[type];
    if (mapper === undefined) {
        throw new Error('Invalid generator type');
    } else return mapper;
};

const getGeneratorsFromKeysAndConfig = (keys, config) =>
    keys.map((key) => {
        const { type, value } = config[key];
        const generator = getRandomGenerator(type);
        return Array.isArray(value)
            ? generator.bind(null, ...value)
            : generator.bind(null, value);
    });

const getInsertBaseQuery = (table, keys) =>
    `INSERT INTO ${table}(${keys.join(', ')})`;

const generateTableRandomInsertQuery = (table, config, amount) => {
    const tableKeys = Object.keys(config);
    const tableValues = [];
    const generators = getGeneratorsFromKeysAndConfig(tableKeys, config);

    for (let idx = 0; idx < amount; ++idx) {
        const parts = generators.map((generator) => {
            const value = generator();
            return typeof value === 'string' ? `'${value}'` : value;
        });
        tableValues.push(`(${parts.join(', ')})`);
    }

    const baseQuery = getInsertBaseQuery(table, tableKeys);
    return [baseQuery, 'VALUES', tableValues.join(',')].join(' ');
};

export { generateTableRandomInsertQuery };
