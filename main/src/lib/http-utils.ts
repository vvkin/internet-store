import { request } from 'undici';
import { IncomingHttpHeaders } from 'http';

export const getRequest = async <T>(
    url: string
): Promise<{ data: T; headers: IncomingHttpHeaders; statusCode: number }> => {
    const { body, statusCode, headers } = await request(url);
    const data = await body.json();
    return { data, headers, statusCode };
};
