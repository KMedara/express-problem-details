import { Request } from 'express';
import { IProblemDetails, ProblemDetailsErrorConstructor, ProblemDetailsMapping, ProblemDetailsPredicate } from './problem-details.types';
export declare class ErrorMapper {
    private readonly _type;
    private readonly _mapping;
    private readonly _predicate;
    /**
     *
     * @param type
     * @param mapping
     * @param predicate
     */
    constructor(type: ProblemDetailsErrorConstructor, mapping: ProblemDetailsMapping, predicate: ProblemDetailsPredicate);
    /**
     * @description evaluates predicate and checks whether constructor names match
     * @param request
     * @param err
     * @returns
     */
    private _shouldMap;
    tryMap: (request: Request, err: Error) => {
        problem: IProblemDetails;
        success: boolean;
    };
}
