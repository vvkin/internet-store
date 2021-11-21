import { Product } from '@model/domain/product';
import { Specification } from '@modules/specification/model/specification';

export type ProductSpecificationMap = {
    [key in keyof Product]: Specification<number | string>;
};
