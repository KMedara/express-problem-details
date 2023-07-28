/* eslint-disable no-unused-vars */
import { Url } from 'url';
import { HttpStatus } from './HttpStatus';
import { IProblemDetails, ProblemDetailsError } from './problem-details.types';
import { isProblemDetailsError } from './guards';



export class ProblemDetails implements IProblemDetails {
	details?: string;
	title?: string;
	type?: string | Url;
	status?: HttpStatus;
	instance?: string;
	extensions?: Record<string, unknown> | undefined;

	static create = (error: Error, status: HttpStatus, details?: IProblemDetails): IProblemDetails => {
		console.log(!isProblemDetailsError(error), error.constructor.prototype);
		return !isProblemDetailsError(error) ? this._create(error, status, details) : this._createFromProblemDetailsError(error, status, details);
	};
	
	private static _create = (error: Error, status: HttpStatus, details?: IProblemDetails) : IProblemDetails => {
		const result = {
			details: details?.details ?? error.message,
			title: details?.title ?? error.constructor.name.replace('Error', '').replace(/([a-z])([A-Z])/g, '$1 $2'),
			status: status ?? details?.status ?? 500,
			instance: details?.instance ?? '',
		} as IProblemDetails; 

		result.type = details?.type ?? `https://httpstatuses.io/${result.status}`;
		return result; 
	};

	private static _createFromProblemDetailsError = (error: ProblemDetailsError, status: HttpStatus, details?: IProblemDetails) : IProblemDetails => {
		const result = {
			details: details?.details ?? error.message,
			title: details?.title ?? error.constructor.name.replace('Error', '').replace(/([a-z])([A-Z])/g, '$1 $2'),
			status: status ?? details?.status ?? 500,
			instance: details?.instance ?? '',
			extensions: error.extensions ?? {}
		} as IProblemDetails; 

		result.type = details?.type ?? `https://httpstatuses.io/${result.status}`;
		return result; 
	};
	//static createFromStatus = (error: Error, status: HttpStatus) => StatusMapper(error, status);
	//static createFromError = (error: Error) => DefaultMapper(error);
}

// const StatusMapper = (error:Error, status: HttpStatus) => {
// 	return {
// 		...DefaultMapper(error),
// 		status,
// 		type: `https://httpstatuses.io/${status.toString()}`,
// 	} as IProblemDetails;
// };

// const DefaultMapper = (error: Error) => {
// 	return {
// 		details: error.message,
// 		title: error.constructor.name.replace('Error', '').replace(/([a-z])([A-Z])/g, '$1 $2'),
// 		status: 500,
// 		instance: '',
// 		type: `https://httpstatuses.io/${500}`,
// 	} as IProblemDetails;
// };

// const DetailsMapper = (details: IProblemDetails) => {
// 	return {
// 	};
// };