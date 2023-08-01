class HttpError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

/** 
 * Status code: 401
 */
export class UnautorizedError extends HttpError {}


/**
 * Status code: 409
 */
export class ConflictError extends HttpError {}

// Add more classes here if you need them