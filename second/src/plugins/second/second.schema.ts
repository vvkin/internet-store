import * as RefParser from 'json-schema-ref-parser';
import { JSONSchema } from 'json-schema-to-typescript';
import * as searchQuery from '@schema/api/search/search-query.json';
import * as searchDto from '@schema/dto/search.dto.json';
import * as listDto from '@schema/dto/list.dto.json';
import { config } from '@config/config';

export const initSchemas = async () => {
    const { path } = config.schema;
    const parser = new RefParser();

    const searchSchema = {
        querystring: await parser.dereference(
            path,
            searchQuery as JSONSchema,
            {}
        ),
        response: {
            200: await parser.dereference(path, searchDto as JSONSchema, {}),
        },
    };

    const listSchema = {
        response: {
            200: await parser.dereference(path, listDto as JSONSchema, {}),
        },
    };

    return { searchSchema, listSchema };
};
