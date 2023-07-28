"use strict";
/* eslint-disable no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemDetailsFactory = exports.ProblemDetailsFactoryConfiguration = void 0;
const HttpStatus_1 = require("./HttpStatus");
const problem_details_options_setup_1 = require("./problem-details-options-setup");
/**
 *
 */
class ProblemDetailsFactoryConfiguration {
    constructor(config) {
        this.options = Object.assign(Object.assign({}, (0, problem_details_options_setup_1.ProblemDetailsOptionsSetup)()), config());
    }
}
exports.ProblemDetailsFactoryConfiguration = ProblemDetailsFactoryConfiguration;
/**
 *
 */
class ProblemDetailsFactory {
    /**
     *
     * @param config
     */
    constructor(config) {
        this.config = config;
        this._options = config.options;
    }
    /**
     *
     * @param err
     * @returns
     */
    create(request, err) {
        return this.mapToProblemDetails(request, err);
    }
    /**
     * @description attempts to find and use a mapper for this error, maps to default status code if not found
     * @param err
     * @returns
     */
    mapToProblemDetails(request, error) {
        const result = this._options.tryMapProblemDetails(request, error);
        return result.success ? result.problem : this._options.mapStatusCode(error, HttpStatus_1.HttpStatus.InternalServerError);
    }
}
exports.ProblemDetailsFactory = ProblemDetailsFactory;
