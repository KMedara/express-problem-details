/* eslint-disable no-unused-vars */

import { Request } from 'express';
import { IProblemDetails, ProblemDetailsErrorConstructor, ProblemDetailsMapping, ProblemDetailsPredicate } from './problem-details.types';

export class ErrorMapper {
	private readonly _type: ProblemDetailsErrorConstructor;
	private readonly _mapping: ProblemDetailsMapping;
	private readonly _predicate: ProblemDetailsPredicate;

	/**
	 * 
	 * @param type 
	 * @param mapping 
	 * @param predicate 
	 */
	constructor(type: ProblemDetailsErrorConstructor, mapping: ProblemDetailsMapping, predicate: ProblemDetailsPredicate) {
		this._mapping = mapping;
		this._predicate = predicate;
		this._type = type;
	}

	/**
	 * @description evaluates predicate and checks whether constructor names match
	 * @param request
	 * @param err 
	 * @returns 
	 */
	private _shouldMap = (request: Request, err: Error) => this._predicate(request, err) && (err.constructor.name === (new this._type()).constructor.name);

	tryMap = (request: Request, err: Error) => {
		return this._shouldMap(request, err) ? 
			{ problem: this._mapping(request, err), success: true } : 
			{ problem: null as unknown as IProblemDetails, success: false };
	};
}