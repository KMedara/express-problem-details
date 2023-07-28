
import { Request, Response, NextFunction} from 'express';
import { ProblemDetailsFactory } from './problem-details.factory';
import { ProblemDetails } from './problem-details';
import { HttpStatus } from './HttpStatus';

export function problemDetailsMiddleware(factory: ProblemDetailsFactory) {
	return function(error: Error, req: Request, res: Response, next: NextFunction) {	
		if(res.headersSent) {
			return next(error);
		}
		let problem = new ProblemDetails();
		try {
			problem = factory.create(req, error);
		} catch {
			problem = ProblemDetails.create(error, HttpStatus.InternalServerError);
	
		}
		res.setHeader('Content-Type', factory._options.contentType);
		res.status(problem.status ?? 500);
		return res.json(problem);
	};	
}
