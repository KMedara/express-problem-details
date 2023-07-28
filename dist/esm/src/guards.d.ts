import { ProblemDetailsError } from './problem-details.types';
/**
 * Checks if object is ProblemDetailsError or extends ProblemDetailsError by checking the constructor prototype
 *
 * <br/>https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor</para>
 * @param o - object
 * @returns
 */
export declare function isProblemDetailsError(o: object): o is ProblemDetailsError;
