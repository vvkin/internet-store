import pg from 'pg';
import { getSchema } from './schema.js';
import { generateTableRandomInsertQuery } from './util.js';

const getDbConfig = (prefix) => ({
    host: process.env[`${prefix}_PG_HOST`],
    port: parseInt(process.env[`${prefix}_PG_PORT`] ?? '', 10),
    user: process.env[`${prefix}_PG_USER`],
    database: process.env[`${prefix}_PG_DATABASE`],
    password: process.env[`${prefix}_PG_PASSWORD`],
});

const main = new pg.Pool(getDbConfig('MAIN'));
const first = new pg.Pool(getDbConfig('FIRST'));
const second = new pg.Pool(getDbConfig('SECOND'));

const extendQuery = (query) => `${query} RETURNING id`;

export const fillFirst = async (amount) => {
    const schema = await getSchema('partial-product');
    const query = generateTableRandomInsertQuery('products', schema, amount);
    await first.query(query);
};

export const fillSecond = async (amount) => {
    const schema = await getSchema('partial-product');
    const query = generateTableRandomInsertQuery('products', schema, amount);
    await second.query(query);
};

const executeMainWithReturning = async (table, schema, amount) => {
    const query = generateTableRandomInsertQuery(table, schema, amount);
    const { rows } = await main.query(extendQuery(query));
    return rows.map((row) => row.id);
};

export const fillMain = async (amount) => {
    const countryIds = await executeMainWithReturning(
        'countries',
        await getSchema('country'),
        100
    );
    const categoryIds = await executeMainWithReturning(
        'categories',
        await getSchema('category'),
        100
    );

    const suppliersSchema = await getSchema('supplier');
    suppliersSchema['country_id'].value.push(...countryIds);
    const supplierIds = await executeMainWithReturning(
        'suppliers',
        suppliersSchema,
        100
    );

    const productsSchema = await getSchema('full-product');
    productsSchema['supplier_id'].value.push(...supplierIds);
    productsSchema['category_id'].value.push(...categoryIds);
    const productQuery = generateTableRandomInsertQuery(
        'products',
        productsSchema,
        amount
    );
    await main.query(productQuery);
};
