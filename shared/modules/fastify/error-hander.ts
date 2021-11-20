import { FastifyRequest } from 'fastify';
import { mapError } from '../errors/map-error';

export const errorHandler = async (
    abstractError: Error,
    request: FastifyRequest
): Promise<void> => {
    const mappedError = mapError(abstractError);
    request.log.warn(mappedError, 'error occurred');
    throw mappedError;
};
