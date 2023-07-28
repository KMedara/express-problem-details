"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.problemDetailsMiddleware = void 0;
const problem_details_1 = require("./problem-details");
const HttpStatus_1 = require("./HttpStatus");
function problemDetailsMiddleware(factory) {
    return function (error, req, res, next) {
        var _a;
        if (res.headersSent) {
            return next(error);
        }
        let problem = new problem_details_1.ProblemDetails();
        try {
            problem = factory.create(req, error);
        }
        catch (_b) {
            problem = problem_details_1.ProblemDetails.create(error, HttpStatus_1.HttpStatus.InternalServerError);
        }
        res.setHeader('Content-Type', factory._options.contentType);
        res.status((_a = problem.status) !== null && _a !== void 0 ? _a : 500);
        return res.json(problem);
    };
}
exports.problemDetailsMiddleware = problemDetailsMiddleware;
