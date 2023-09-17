/* eslint-disable no-unused-vars */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { HttpStatus } from './HttpStatus';
import { ProblemDetailsOptionsSetup } from './problem-details.options';
/**
 *
 */
var ProblemDetailsFactoryConfiguration = /** @class */ (function () {
    function ProblemDetailsFactoryConfiguration(config) {
        this.options = __assign(__assign({}, ProblemDetailsOptionsSetup()), config());
    }
    return ProblemDetailsFactoryConfiguration;
}());
export { ProblemDetailsFactoryConfiguration };
/**
 *
 */
var ProblemDetailsFactory = /** @class */ (function () {
    /**
     *
     * @param config
     */
    function ProblemDetailsFactory(config) {
        this.config = config;
        this._options = config.options;
    }
    /**
     *
     * @param err
     * @returns
     */
    ProblemDetailsFactory.prototype.create = function (request, err) {
        return this.mapToProblemDetails(request, err);
    };
    /**
     * @description attempts to find and use a mapper for this error, maps to default status code if not found
     * @param err
     * @returns
     */
    ProblemDetailsFactory.prototype.mapToProblemDetails = function (request, error) {
        var result = this._options.tryMapProblemDetails(request, error);
        return result.success ? result.problem : this._options.mapStatusCode(error, HttpStatus.InternalServerError);
    };
    return ProblemDetailsFactory;
}());
export { ProblemDetailsFactory };
