export interface SearchQuery {
    id?: {
        in?: (number | string)[];
        min?: number;
        max?: number;
        like?: string;
    };
    name?: {
        in?: (number | string)[];
        min?: number;
        max?: number;
        like?: string;
    };
    price?: {
        in?: (number | string)[];
        min?: number;
        max?: number;
        like?: string;
    };
    description?: {
        in?: (number | string)[];
        min?: number;
        max?: number;
        like?: string;
    };
}
