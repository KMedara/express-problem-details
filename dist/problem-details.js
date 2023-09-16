"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemDetails = void 0;
var guards_1 = require("./guards");
var ProblemDetails = exports.ProblemDetails = /** @class */ (function () {
    function ProblemDetails() {
    }
    var _a;
    _a = ProblemDetails;
    ProblemDetails.create = function (error, status, details) {
        console.log(!(0, guards_1.isProblemDetailsError)(error), error.constructor.prototype);
        return !(0, guards_1.isProblemDetailsError)(error) ? _a._create(error, status, details) : _a._createFromProblemDetailsError(error, status, details);
    };
    ProblemDetails._create = function (error, status, details) {
        var _b, _c, _d, _e, _f;
        var result = {
            details: (_b = details === null || details === void 0 ? void 0 : details.details) !== null && _b !== void 0 ? _b : error.message,
            title: (_c = details === null || details === void 0 ? void 0 : details.title) !== null && _c !== void 0 ? _c : error.constructor.name.replace('Error', '').replace(/([a-z])([A-Z])/g, '$1 $2'),
            status: (_d = status !== null && status !== void 0 ? status : details === null || details === void 0 ? void 0 : details.status) !== null && _d !== void 0 ? _d : 500,
            instance: (_e = details === null || details === void 0 ? void 0 : details.instance) !== null && _e !== void 0 ? _e : '',
        };
        result.type = (_f = details === null || details === void 0 ? void 0 : details.type) !== null && _f !== void 0 ? _f : "https://httpstatuses.io/".concat(result.status);
        return result;
    };
    ProblemDetails._createFromProblemDetailsError = function (error, status, details) {
        var _b, _c, _d, _e, _f, _g;
        var result = {
            details: (_b = details === null || details === void 0 ? void 0 : details.details) !== null && _b !== void 0 ? _b : error.message,
            title: (_c = details === null || details === void 0 ? void 0 : details.title) !== null && _c !== void 0 ? _c : error.constructor.name.replace('Error', '').replace(/([a-z])([A-Z])/g, '$1 $2'),
            status: (_d = status !== null && status !== void 0 ? status : details === null || details === void 0 ? void 0 : details.status) !== null && _d !== void 0 ? _d : 500,
            instance: (_e = details === null || details === void 0 ? void 0 : details.instance) !== null && _e !== void 0 ? _e : '',
            extensions: (_f = error.extensions) !== null && _f !== void 0 ? _f : {}
        };
        result.type = (_g = details === null || details === void 0 ? void 0 : details.type) !== null && _g !== void 0 ? _g : "https://httpstatuses.io/".concat(result.status);
        return result;
    };
    return ProblemDetails;
}());
// const StatusMapper = (error:Error, status: HttpStatus) => {
// 	return {
// 		...DefaultMapper(error),
// 		status,
// 		type: `https://httpstatuses.io/${status.toString()}`,
// 	} as IProblemDetails;
// };
// const DefaultMapper = (error: Error) => {
// 	return {
// 		details: error.message,
// 		title: error.constructor.name.replace('Error', '').replace(/([a-z])([A-Z])/g, '$1 $2'),
// 		status: 500,
// 		instance: '',
// 		type: `https://httpstatuses.io/${500}`,
// 	} as IProblemDetails;
// };
// const DetailsMapper = (details: IProblemDetails) => {
// 	return {
// 	};
// };
