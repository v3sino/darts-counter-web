export class AlreadyExistError extends Error {
    constructor(message: string | undefined) {
        super(message);
        this.name = 'AlreadyExistError';
    }
}