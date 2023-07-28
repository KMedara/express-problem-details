/* eslint-disable no-unused-vars */
export class ErrorMapper {
    /**
     *
     * @param type
     * @param mapping
     * @param predicate
     */
    constructor(type, mapping, predicate) {
        /**
         * @description evaluates predicate and checks whether constructor names match
         * @param request
         * @param err
         * @returns
         */
        this._shouldMap = (request, err) => this._predicate(request, err) && (err.constructor.name === (new this._type()).constructor.name);
        this.tryMap = (request, err) => {
            return this._shouldMap(request, err) ?
                { problem: this._mapping(request, err), success: true } :
                { problem: null, success: false };
        };
        this._mapping = mapping;
        this._predicate = predicate;
        this._type = type;
    }
}
