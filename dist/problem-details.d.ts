/// <reference types="node" />
import { Url } from 'url';
import { HttpStatus } from './HttpStatus';
import { IProblemDetails } from './problem-details.types';
export declare class ProblemDetails implements IProblemDetails {
    details?: string;
    title?: string;
    type?: string | Url;
    status?: HttpStatus;
    instance?: string;
    extensions?: Record<string, unknown> | undefined;
    static create: (error: Error, status: HttpStatus, details?: IProblemDetails) => IProblemDetails;
    private static _create;
    private static _createFromProblemDetailsError;
}
