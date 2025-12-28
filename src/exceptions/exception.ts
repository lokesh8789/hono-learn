export class RuntimeException extends Error {
    constructor(public status: number, public message: string, public code?: string) {
        super(message);
        this.name = this.constructor.name;
        this.code = "ERR_BAD_REQUEST"
    }
}

export class ResourceNotFoundException extends RuntimeException {
    constructor(message = "Resource not found") {
        super(404, message, "ERR_NOT_FOUND");
    }
}

export class UnauthorizedException extends RuntimeException {
    constructor(message = "Unauthorized access") {
        super(401, message, "ERR_UNAUTHORIZED");
    }
}