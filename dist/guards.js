"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProblemDetailsError = void 0;
var problem_details_types_1 = require("./problem-details.types");
/**
 * Checks if object is ProblemDetailsError or extends ProblemDetailsError by checking the constructor prototype
 *
 * <br/>https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor</para>
 * @param o - object
 * @returns
 */
function isProblemDetailsError(o) {
    var proto = Object.getPrototypeOf;
    var isProblemDetailsError = proto(o).constructor === problem_details_types_1.ProblemDetailsError;
    var extendsProblemDetailsError = proto(proto(o)).constructor === problem_details_types_1.ProblemDetailsError;
    return isProblemDetailsError || extendsProblemDetailsError;
}
exports.isProblemDetailsError = isProblemDetailsError;
