import { SearchQueryDto } from '@model/dto/search-query.dto';
import { StringQuery } from '@model/domain/string-query';
import { NumberQuery } from '@model/domain/number-query';
import { Product } from '@model/domain/product';
import { ProductSpecificationMap } from '@modules/specification/product/model/specification-map.model';
import { TrueSpecification } from '@modules/specification/true.specification';
import { MinSpecification } from '@modules/specification/min-specification';
import { Specification } from '@modules/specification/model/specification';
import { MaxSpecification } from '@modules/specification/max.specification';
import { LikeSpecification } from '@modules/specification/like.specification';
import { IncludesSpecification } from '@modules/specification/includes.specification';
import { ProductSpecificationType } from '@modules/specification/product/model/product-specification-type';

type Filter = keyof (StringQuery & NumberQuery);

type FilterEntry = [Filter, string | number | (string | number)[]];

type QueryEntry = [
    keyof Product,
    Record<Filter, string | number | (string | number)[]>
];

const filtersMap: Record<Filter, ProductSpecificationType> = {
    min: MinSpecification,
    max: MaxSpecification,
    like: LikeSpecification,
    includes: IncludesSpecification,
};

export const buildProductSpecificationMap = (
    query: SearchQueryDto
): ProductSpecificationMap => {
    const specificationMap = Object.fromEntries(
        Object.keys(query).map((key) => [key, new TrueSpecification()])
    ) as ProductSpecificationMap;

    for (const [attribute, filters] of Object.entries(query) as QueryEntry[]) {
        for (const [filter, value] of Object.entries(
            filters
        ) as FilterEntry[]) {
            if (value) {
                const FilterSpecification = filtersMap[filter];
                specificationMap[attribute] = (
                    specificationMap[attribute] as Specification<unknown>
                ).and(new FilterSpecification(value as never));
            }
        }
    }

    return specificationMap;
};
