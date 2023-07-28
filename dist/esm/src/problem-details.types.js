export class ProblemDetailsError extends Error {
    constructor(message, extensions) {
        super(message);
        this.extensions = extensions;
    }
}
