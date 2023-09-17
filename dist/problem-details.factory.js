/* eslint-disable no-unused-vars */
import { HttpStatus } from './HttpStatus';
import { ProblemDetailsOptionsSetup } from './problem-details.options';
/**
 *
 */
export class ProblemDetailsFactoryConfiguration {
    constructor(config) {
        this.options = Object.assign(Object.assign({}, ProblemDetailsOptionsSetup()), config());
    }
}
/**
 *
 */
export class ProblemDetailsFactory {
    /**
     *
     * @param config
     */
    constructor(config) {
        this.config = config;
        this._options = config.options;
    }
    /**
     *
     * @param err
     * @returns
     */
    create(request, err) {
        return this.mapToProblemDetails(request, err);
    }
    /**
     * @description attempts to find and use a mapper for this error, maps to default status code if not found
     * @param err
     * @returns
     */
    mapToProblemDetails(request, error) {
        const result = this._options.tryMapProblemDetails(request, error);
        return result.success ? result.problem : this._options.mapStatusCode(error, HttpStatus.InternalServerError);
    }
}
