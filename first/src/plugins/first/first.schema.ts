import * as RefParser from 'json-schema-ref-parser';
import { JSONSchema } from 'json-schema-to-typescript';
import { config } from '@config/config';
import * as detailsParams from '@schema/api/details/details-params.json';
import * as detailsDto from '@schema/dto/details.dto.json';
import * as priceListQuery from '@schema/api/price-list/price-list-query.json';
import * as priceListDto from '@schema/dto/price-list.dto.json';
import { DetailsParams } from '@model/api/details/details-params';
import { PriceListQuery } from '@model/api/price-list/price-list-query';

export interface DetailsRequest {
    Params: DetailsParams;
}

export interface PriceListRequest {
    Querystring: PriceListQuery;
}

export const initSchemas = async () => {
    const { path } = config.schema;
    const parser = new RefParser();

    const priceListSchema = {
        querystring: priceListQuery,
        response: {
            200: await parser.dereference(path, priceListDto as JSONSchema, {}),
        },
    };

    const detailsSchema = {
        params: detailsParams,
        response: {
            200: await parser.dereference(path, detailsDto as JSONSchema, {}),
        },
    };

    return { priceListSchema, detailsSchema };
};
