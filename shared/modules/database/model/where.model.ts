import { StringQuery } from './string-query.model';
import { NumberQuery } from './number-query.model';

export type WhereQuery<T> = {
    [key in keyof T]?: StringQuery | NumberQuery;
};
