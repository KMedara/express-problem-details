"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemDetailsError = void 0;
class ProblemDetailsError extends Error {
    constructor(message, extensions) {
        super(message);
        this.extensions = extensions;
    }
}
exports.ProblemDetailsError = ProblemDetailsError;
