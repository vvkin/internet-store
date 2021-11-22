import * as searchQueryDtoJson from '@schema/dto/search-query.dto.json';
import * as productDtoJson from '@schema/dto/products.dto.json';

import * as RefParser from 'json-schema-ref-parser';
import { JSONSchema } from 'json-schema-to-typescript';
import { config } from '@config/config';
import { SearchQueryDto } from '@model/dto/search-query.dto';

export interface SearchRequest {
    Querystring: SearchQueryDto;
}

export const initSchemas = async () => {
    const { path } = config.schema;
    const parser = new RefParser();

    const searchSchema = {
        querystring: await parser.dereference(
            path,
            searchQueryDtoJson as JSONSchema,
            {}
        ),
        response: {
            200: await parser.dereference(
                path,
                productDtoJson as JSONSchema,
                {}
            ),
        },
    };

    return { searchSchema };
};
