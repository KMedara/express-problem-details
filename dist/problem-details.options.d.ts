import { Url } from 'url';
import { HttpStatus } from './HttpStatus';
import { ProblemDetails } from './problem-details';
import { IProblemDetails, ProblemDetailsErrorConstructor, ProblemDetailsFactoryConfigurationFn, ProblemDetailsMapping, ProblemDetailsPredicate } from './problem-details.types';
import { Request } from 'express';
/**
 * @description Default configuration for problem details options
 * @param options
 * @returns
 */
export declare const ProblemDetailsOptionsSetup: ProblemDetailsFactoryConfigurationFn;
/**
 * Problem Details Option Configuration
 */
export declare class ProblemDetailsOptions {
    private _mappers;
    contentType: 'application/problem+json' | 'application/problem+xml';
    isProblem: (error: Error) => boolean;
    mapStatusCode: (error: Error, status: HttpStatus) => ProblemDetails;
    tryMapProblemDetails: (request: Request, error: Error) => {
        success: boolean;
        problem: IProblemDetails;
    };
    mapToStatusCode: <E extends ProblemDetailsErrorConstructor>(type: E, status: HttpStatus) => void;
    mapToProblemDetails: <E extends ProblemDetailsErrorConstructor>(type: E, status: HttpStatus, errorDescription: Url | string) => void;
    map: <E extends ProblemDetailsErrorConstructor>(type: E, mapping: ProblemDetailsMapping) => void;
    mapWithContext: <E extends ProblemDetailsErrorConstructor>(type: E, mapping: ProblemDetailsMapping) => void;
    mapWithPredicate: <E extends ProblemDetailsErrorConstructor>(type: E, predicate: ProblemDetailsPredicate, mapping: ProblemDetailsMapping) => void;
}
