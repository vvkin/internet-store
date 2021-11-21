import * as searchQueryDto from '@schema/dto/search-query.dto.json';
import * as productDto from '@schema/dto/product.dto.json';

import { SearchQueryDto } from '@model/dto/search-query.dto';
import * as RefParser from 'json-schema-ref-parser';
import { config } from '@config/config';
import { JSONSchema } from 'json-schema-to-typescript';

export interface SearchRequest {
    Querystring: SearchQueryDto;
}

export const initSchemas = async () => {
    const { path } = config.schema;
    const parser = new RefParser();

    const searchSchema = {
        querystring: await parser.dereference(
            path,
            searchQueryDto as JSONSchema,
            {}
        ),
        response: {
            200: await parser.dereference(path, productDto as JSONSchema, {}),
        },
    };

    return { searchSchema };
};
