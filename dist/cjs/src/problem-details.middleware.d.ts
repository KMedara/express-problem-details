import { Request, Response, NextFunction } from 'express';
import { ProblemDetailsFactory } from './problem-details.factory';
export declare function problemDetailsMiddleware(factory: ProblemDetailsFactory): (error: Error, req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
