/* eslint-disable no-unused-vars */

import { HttpStatus } from './HttpStatus';
import { ProblemDetailsOptions, ProblemDetailsOptionsSetup } from './problem-details.options';
import { IProblemDetails, IProblemDetailsFactory, ProblemDetailsFactoryConfigurationFn } from './problem-details.types';
import { Request } from 'express';

/**
 * 
 */
export class ProblemDetailsFactoryConfiguration {
	options: ProblemDetailsOptions;

	constructor(config: ProblemDetailsFactoryConfigurationFn) {
		this.options = {...ProblemDetailsOptionsSetup(), ...config()} as ProblemDetailsOptions;
	}
}

/**
 * 
 */
export class ProblemDetailsFactory implements IProblemDetailsFactory {
	public readonly _options: ProblemDetailsOptions;
	
	/**
	 * 
	 * @param config 
	 */
	public constructor(private config: ProblemDetailsFactoryConfiguration) {
		this._options = config.options;
	}
	/**
	 * 
	 * @param err 
	 * @returns 
	 */
	create(request: Request, err: Error): IProblemDetails {
		return this.mapToProblemDetails(request, err);
	}

	/**
	 * @description attempts to find and use a mapper for this error, maps to default status code if not found
	 * @param err 
	 * @returns
	 */
	private mapToProblemDetails(request: Request, error: Error): IProblemDetails {
		const result = this._options.tryMapProblemDetails(request, error);
		return result.success ? result.problem : this._options.mapStatusCode(error, HttpStatus.InternalServerError);
	}
}