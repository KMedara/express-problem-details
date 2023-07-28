import { ProblemDetailsError } from './problem-details.types';
/**
 * Checks if object is ProblemDetailsError or extends ProblemDetailsError by checking the constructor prototype
 *
 * <br/>https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor</para>
 * @param o - object
 * @returns
 */
export function isProblemDetailsError(o) {
    var proto = Object.getPrototypeOf;
    var isProblemDetailsError = proto(o).constructor === ProblemDetailsError;
    var extendsProblemDetailsError = proto(proto(o)).constructor === ProblemDetailsError;
    return isProblemDetailsError || extendsProblemDetailsError;
}
