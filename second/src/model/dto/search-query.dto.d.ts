export interface SearchQueryDto {
    id?: {
        includes?: number[];
        min?: number;
        max?: number;
    };
    name?: {
        includes?: string[];
        like?: string;
    };
    price?: {
        includes?: number[];
        min?: number;
        max?: number;
    };
    description?: {
        includes?: string[];
        like?: string;
    };
}
