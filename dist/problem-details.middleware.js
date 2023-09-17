import { ProblemDetails } from './problem-details';
import { HttpStatus } from './HttpStatus';
export function problemDetailsMiddleware(factory) {
    return function (error, req, res, next) {
        var _a;
        if (res.headersSent) {
            return next(error);
        }
        let problem = new ProblemDetails();
        try {
            problem = factory.create(req, error);
        }
        catch (_b) {
            problem = ProblemDetails.create(error, HttpStatus.InternalServerError);
        }
        res.setHeader('Content-Type', factory._options.contentType);
        res.status((_a = problem.status) !== null && _a !== void 0 ? _a : 500);
        return res.json(problem);
    };
}
