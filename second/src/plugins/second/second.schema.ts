import * as RefParser from 'json-schema-ref-parser';
import { JSONSchema } from 'json-schema-to-typescript';
import * as searchQuery from '@schema/api/search/search-query.json';
import * as searchDto from '@schema/dto/search.dto.json';
import { config } from '@config/config';
import { SearchQuery } from '@model/api/search/search-query';

export interface SearchRequest {
    Querystring: SearchQuery;
}

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

    return { searchSchema };
};
