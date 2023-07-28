import { Url } from 'url';
import { ProblemDetailsOptions } from './problem-details-options';
import { HttpStatus } from './HttpStatus';
import { Request } from 'express';

/* eslint-disable no-unused-vars */
export type Mapping<Request, T extends Error, K> = (request: Request, err: T) => K

export type ProblemDetailsPredicate = Mapping<Request, Error | ProblemDetailsError, boolean>;
export type ProblemDetailsMapping = Mapping<Request, Error | ProblemDetailsError,IProblemDetails>;

export type ProblemDetailsFactoryConfigurationFn = (options?: ProblemDetailsOptions) => ProblemDetailsOptions;


export interface IProblemDetails {
    details?: string;
    title?: string;
    type?: Url | string;
    status?: HttpStatus;
    instance?: string;
    extensions?: Record<string, unknown>;
}

export interface IProblemDetailsFactory {
    create(request: Request, err: Error): IProblemDetails
}

export type ProblemDetailsErrorConstructor = new (message?:string, extensions?: Record<string,unknown>) => Error


export abstract class ProblemDetailsError extends Error implements IProblemDetails {
	details?: string;
	title?: string | undefined;
	type?: string | Url | undefined;
	status?: HttpStatus | undefined;
	instance?: string | undefined;
	extensions?: Record<string, unknown> | undefined;

	constructor(message?: string, extensions?: Record<string,unknown>){
		super(message);
		this.extensions = extensions;
	}

}
