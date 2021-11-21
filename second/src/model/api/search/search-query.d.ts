export interface SearchQuery {
    id?: {
        includes?: (number | string)[];
        min?: number;
        max?: number;
        like?: string;
    };
    name?: {
        includes?: (number | string)[];
        min?: number;
        max?: number;
        like?: string;
    };
    price?: {
        includes?: (number | string)[];
        min?: number;
        max?: number;
        like?: string;
    };
    description?: {
        includes?: (number | string)[];
        min?: number;
        max?: number;
        like?: string;
    };
}
