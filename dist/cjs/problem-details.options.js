"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemDetailsOptions = exports.ProblemDetailsOptionsSetup = void 0;
var error_mapper_1 = require("./error-mapper");
var problem_details_1 = require("./problem-details");
var guards_1 = require("./guards");
/**
 * @description Default configuration for problem details options
 * @param options
 * @returns
 */
var ProblemDetailsOptionsSetup = function (options) {
    var _a, _b;
    var _options = options ? __assign({}, options) : new ProblemDetailsOptions();
    _options.mapStatusCode = (_a = _options.mapStatusCode) !== null && _a !== void 0 ? _a : (function (error, status) { return problem_details_1.ProblemDetails.create(error, status); });
    _options.contentType = (_b = _options.contentType) !== null && _b !== void 0 ? _b : 'application/problem+json';
    _options.isProblem = function (error) { return (0, guards_1.isProblemDetailsError)(error); };
    return _options;
};
exports.ProblemDetailsOptionsSetup = ProblemDetailsOptionsSetup;
/**
 * Problem Details Option Configuration
 */
var ProblemDetailsOptions = /** @class */ (function () {
    function ProblemDetailsOptions() {
        var _this = this;
        this._mappers = [];
        this.tryMapProblemDetails = function (request, error) {
            for (var _i = 0, _a = _this._mappers; _i < _a.length; _i++) {
                var tryMap = _a[_i].tryMap;
                var result = tryMap(request, error);
                if (result.success) {
                    return result;
                }
            }
            return {
                success: false,
                problem: null
            };
        };
        this.mapToStatusCode = function (type, status) {
            _this.map(type, function (_, err) { return problem_details_1.ProblemDetails.create(err, status); });
        };
        this.mapToProblemDetails = function (type, status, errorDescription) {
            _this.map(type, function (request, err) { return problem_details_1.ProblemDetails.create(err, status, { instance: request.url, type: errorDescription }); });
        };
        this.map = function (type, mapping) {
            _this.mapWithContext(type, mapping);
        };
        this.mapWithContext = function (type, mapping) {
            _this.mapWithPredicate(type, function () { return true; }, mapping);
        };
        this.mapWithPredicate = function (type, predicate, mapping) {
            _this._mappers.push(new error_mapper_1.ErrorMapper(type, mapping, predicate));
        };
    }
    return ProblemDetailsOptions;
}());
exports.ProblemDetailsOptions = ProblemDetailsOptions;
