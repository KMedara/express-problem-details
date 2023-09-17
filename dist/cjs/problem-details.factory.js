"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemDetailsFactory = exports.ProblemDetailsFactoryConfiguration = void 0;
var HttpStatus_1 = require("./HttpStatus");
var problem_details_options_1 = require("./problem-details.options");
/**
 *
 */
var ProblemDetailsFactoryConfiguration = /** @class */ (function () {
    function ProblemDetailsFactoryConfiguration(config) {
        this.options = __assign(__assign({}, (0, problem_details_options_1.ProblemDetailsOptionsSetup)()), config());
    }
    return ProblemDetailsFactoryConfiguration;
}());
exports.ProblemDetailsFactoryConfiguration = ProblemDetailsFactoryConfiguration;
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
        return result.success ? result.problem : this._options.mapStatusCode(error, HttpStatus_1.HttpStatus.InternalServerError);
    };
    return ProblemDetailsFactory;
}());
exports.ProblemDetailsFactory = ProblemDetailsFactory;
