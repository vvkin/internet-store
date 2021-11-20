import { EntityConflict, EntityNotFound } from './abstract-errors';
import { HttpError, HttpNotFound, HttpConflict } from './http-errors';
import { ErrorMap } from './model/error-map.model';

const errorMap: ErrorMap = {
    [EntityNotFound.name]: HttpNotFound,
    [EntityConflict.name]: HttpConflict,
};

const mapError = (error: Error): HttpError => {
    const { name, message } = error;
    const MappedError = errorMap[name];
    return MappedError ? new MappedError(message) : (error as HttpError);
};

export { mapError };
