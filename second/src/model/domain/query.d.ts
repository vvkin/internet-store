export interface Query {
    includes?: (number | string)[];
    min?: number;
    max?: number;
    like?: string;
}
