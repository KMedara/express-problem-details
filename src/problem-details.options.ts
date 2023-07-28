/* eslint-disable no-unused-vars */
import { Url } from 'url';
import { ErrorMapper } from './error-mapper';
import { HttpStatus } from './HttpStatus';
import { ProblemDetails } from './problem-details';
import { IProblemDetails, ProblemDetailsErrorConstructor, ProblemDetailsFactoryConfigurationFn, ProblemDetailsMapping, ProblemDetailsPredicate } from './problem-details.types';
import { Request } from 'express';
import { isProblemDetailsError } from './guards';

/**
 * @description Default configuration for problem details options
 * @param options 
 * @returns 
 */
export const ProblemDetailsOptionsSetup : ProblemDetailsFactoryConfigurationFn = (options) => {

	const _options: ProblemDetailsOptions = options ? {...options} as ProblemDetailsOptions : new ProblemDetailsOptions();
	
	_options.mapStatusCode = _options.mapStatusCode ?? ((error,status) => ProblemDetails.create(error, status));
	
	_options.contentType = _options.contentType ?? 'application/problem+json';

	_options.isProblem = (error) => isProblemDetailsError(error);
	return _options; 
};

/**
 * Problem Details Option Configuration
 */
export class ProblemDetailsOptions {
	private _mappers: ErrorMapper[] = [];
	contentType!: 'application/problem+json' | 'application/problem+xml';
	isProblem!:(error: Error) => boolean;

	mapStatusCode!:(error: Error, status: HttpStatus) => ProblemDetails;

	tryMapProblemDetails = (request: Request, error: Error): {success: boolean, problem: IProblemDetails} => {

		for(const { tryMap } of this._mappers) {
			const result = tryMap(request, error);
			if(result.success) {
				return result;
			}
		}

		return {
			success: false,
			problem: null as unknown as IProblemDetails
		};

	};

	mapToStatusCode = <E extends ProblemDetailsErrorConstructor> (type: E, status: HttpStatus) => {
		this.map(type, (_, err) => ProblemDetails.create(err, status));
	};

	mapToProblemDetails = <E extends ProblemDetailsErrorConstructor> (type: E, status: HttpStatus, errorDescription: Url | string) => {
		this.map(type, (request, err) => ProblemDetails.create(err, status, { instance: request.url, type: errorDescription}));
	};

	map = <E extends ProblemDetailsErrorConstructor>(type: E, mapping: ProblemDetailsMapping) => {
		this.mapWithContext(type, mapping);
	};

	mapWithContext = <E extends ProblemDetailsErrorConstructor>(type: E, mapping: ProblemDetailsMapping) => {
		this.mapWithPredicate(type, () => true, mapping);
	};
	mapWithPredicate = <E extends ProblemDetailsErrorConstructor>(type: E, predicate: ProblemDetailsPredicate, mapping: ProblemDetailsMapping) => {
		this._mappers.push(new ErrorMapper(type, mapping, predicate));
	};
}