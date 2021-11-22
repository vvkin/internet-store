import { Product } from '@model/domain/product';
import { ProductSpecificationMap } from '@modules/specification/product/model/specification-map.model';

export const applyProductSpecification = (
    items: Product[],
    specificationMap: ProductSpecificationMap
): Product[] => {
    const columns = Object.keys(specificationMap) as (keyof Product)[];
    return items.filter((item) => {
        return columns.every(
            (column) =>
                column in item &&
                specificationMap[column]?.isSatisfiedBy(item[column] as any)
        );
    });
};
