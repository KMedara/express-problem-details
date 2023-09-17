"use strict";
/* eslint-disable no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMapper = void 0;
var ErrorMapper = /** @class */ (function () {
    /**
     *
     * @param type
     * @param mapping
     * @param predicate
     */
    function ErrorMapper(type, mapping, predicate) {
        var _this = this;
        /**
         * @description evaluates predicate and checks whether constructor names match
         * @param request
         * @param err
         * @returns
         */
        this._shouldMap = function (request, err) { return _this._predicate(request, err) && (err.constructor.name === (new _this._type()).constructor.name); };
        this.tryMap = function (request, err) {
            return _this._shouldMap(request, err) ?
                { problem: _this._mapping(request, err), success: true } :
                { problem: null, success: false };
        };
        this._mapping = mapping;
        this._predicate = predicate;
        this._type = type;
    }
    return ErrorMapper;
}());
exports.ErrorMapper = ErrorMapper;
