import { ErrorMapper } from './error-mapper';
import { ProblemDetails } from './problem-details';
import { isProblemDetailsError } from './guards';
/**
 * @description Default configuration for problem details options
 * @param options
 * @returns
 */
export const ProblemDetailsOptionsSetup = (options) => {
    var _a, _b;
    const _options = options ? Object.assign({}, options) : new ProblemDetailsOptions();
    _options.mapStatusCode = (_a = _options.mapStatusCode) !== null && _a !== void 0 ? _a : ((error, status) => ProblemDetails.create(error, status));
    _options.contentType = (_b = _options.contentType) !== null && _b !== void 0 ? _b : 'application/problem+json';
    _options.isProblem = (error) => isProblemDetailsError(error);
    return _options;
};
/**
 * Problem Details Option Configuration
 */
export class ProblemDetailsOptions {
    constructor() {
        this._mappers = [];
        this.tryMapProblemDetails = (request, error) => {
            for (const { tryMap } of this._mappers) {
                const result = tryMap(request, error);
                if (result.success) {
                    return result;
                }
            }
            return {
                success: false,
                problem: null
            };
        };
        this.mapToStatusCode = (type, status) => {
            this.map(type, (_, err) => ProblemDetails.create(err, status));
        };
        this.mapToProblemDetails = (type, status, errorDescription) => {
            this.map(type, (request, err) => ProblemDetails.create(err, status, { instance: request.url, type: errorDescription }));
        };
        this.map = (type, mapping) => {
            this.mapWithContext(type, mapping);
        };
        this.mapWithContext = (type, mapping) => {
            this.mapWithPredicate(type, () => true, mapping);
        };
        this.mapWithPredicate = (type, predicate, mapping) => {
            this._mappers.push(new ErrorMapper(type, mapping, predicate));
        };
    }
}
