import { STATUS_CODES } from 'http';

export class HttpError extends Error {
    public status: number;
    public error: string;

    constructor(message = 'Internal Server Error', status = 500) {
        super(message);
        this.name = new.target.name;
        this.status = status;
        this.error = STATUS_CODES[status] || message;
    }
}

export class HttpBadRequest extends HttpError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class HttpNotFound extends HttpError {
    constructor(message: string) {
        super(message, 404);
    }
}

export class HttpConflict extends HttpError {
    constructor(message: string) {
        super(message, 409);
    }
}

export class HttpInternal extends HttpError {
    constructor(message?: string) {
        super(message);
    }
}
