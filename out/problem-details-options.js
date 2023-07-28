"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemDetailsOptions = void 0;
const error_mapper_1 = require("./error-mapper");
const problem_details_1 = require("./problem-details");
/**
 * Problem Details Option Configuration
 */
class ProblemDetailsOptions {
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
            this.map(type, (_, err) => problem_details_1.ProblemDetails.create(err, status));
        };
        this.mapToProblemDetails = (type, status, errorDescription) => {
            this.map(type, (request, err) => problem_details_1.ProblemDetails.create(err, status, { instance: request.url, type: errorDescription }));
        };
        this.map = (type, mapping) => {
            this.mapWithContext(type, mapping);
        };
        this.mapWithContext = (type, mapping) => {
            this.mapWithPredicate(type, () => true, mapping);
        };
        this.mapWithPredicate = (type, predicate, mapping) => {
            this._mappers.push(new error_mapper_1.ErrorMapper(type, mapping, predicate));
        };
    }
}
exports.ProblemDetailsOptions = ProblemDetailsOptions;
