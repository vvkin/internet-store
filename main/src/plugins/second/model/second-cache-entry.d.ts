import { Product } from '@model/domain/product';

export type SecondCacheEntry = {
    [page: string]: Product[];
};
