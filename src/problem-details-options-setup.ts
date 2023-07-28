import { isProblemDetailsError } from './guards';
import { ProblemDetails } from './problem-details';
import { ProblemDetailsOptions } from './problem-details-options';
import { ProblemDetailsFactoryConfigurationFn } from './problem-details.types';

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