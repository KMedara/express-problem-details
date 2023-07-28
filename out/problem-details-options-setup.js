"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemDetailsOptionsSetup = void 0;
const guards_1 = require("./guards");
const problem_details_1 = require("./problem-details");
const problem_details_options_1 = require("./problem-details-options");
/**
 * @description Default configuration for problem details options
 * @param options
 * @returns
 */
const ProblemDetailsOptionsSetup = (options) => {
    var _a, _b;
    const _options = options ? Object.assign({}, options) : new problem_details_options_1.ProblemDetailsOptions();
    _options.mapStatusCode = (_a = _options.mapStatusCode) !== null && _a !== void 0 ? _a : ((error, status) => problem_details_1.ProblemDetails.create(error, status));
    _options.contentType = (_b = _options.contentType) !== null && _b !== void 0 ? _b : 'application/problem+json';
    _options.isProblem = (error) => (0, guards_1.isProblemDetailsError)(error);
    return _options;
};
exports.ProblemDetailsOptionsSetup = ProblemDetailsOptionsSetup;
