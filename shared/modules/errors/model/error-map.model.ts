import { HttpError } from '../http-errors';

export type ErrorMap = {
    [key: string]: typeof HttpError;
};
