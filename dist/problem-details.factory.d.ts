import { ProblemDetailsOptions } from './problem-details.options';
import { IProblemDetails, IProblemDetailsFactory, ProblemDetailsFactoryConfigurationFn } from './problem-details.types';
import { Request } from 'express';
/**
 *
 */
export declare class ProblemDetailsFactoryConfiguration {
    options: ProblemDetailsOptions;
    constructor(config: ProblemDetailsFactoryConfigurationFn);
}
/**
 *
 */
export declare class ProblemDetailsFactory implements IProblemDetailsFactory {
    private config;
    readonly _options: ProblemDetailsOptions;
    /**
     *
     * @param config
     */
    constructor(config: ProblemDetailsFactoryConfiguration);
    /**
     *
     * @param err
     * @returns
     */
    create(request: Request, err: Error): IProblemDetails;
    /**
     * @description attempts to find and use a mapper for this error, maps to default status code if not found
     * @param err
     * @returns
     */
    private mapToProblemDetails;
}
