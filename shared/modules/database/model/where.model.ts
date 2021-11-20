export type WhereQuery<T> = {
    [key in keyof T]?: {
        in?: (number | string)[];
        min?: number;
        max?: number;
        like?: string;
    };
};
