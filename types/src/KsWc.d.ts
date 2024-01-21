export = KsWc;
/**
 * @template {any} [T=object]
 * @typedef {{[name:String]: T }} TList
 */
/**
 * @typedef {'Bearer' | 'Basic'} TTokenType
 * @typedef {'application/json' | 'application/xml' | 'text/html' | 'text/javascript'| 'application/gzip' } TContType
 * @typedef {'arraybuffer' | 'document' | 'json' | 'text' | 'stream' | 'blob' } TResType
 * @typedef {'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' | 'trace' | 'connect' } THttpAction
 **/
/**
 * @typedef {Object} KsOption
 * @property {String} [url]
 * @property {String} [key]
 * @property {String} [end]
 * @property {String} [endpoint]
 * @param {typeof KsCs} [payload.driver]
 * @property {TTokenType} [token=Bearer]
 * @property {TContType|String} [contentType=application/json]
 * @property {String|TList} [params]
 */
declare class KsWc {
    /**
     * @description initialize the service
     * @param {KsOption} [payload]
     */
    constructor(payload?: KsOption);
    /**
     * @type {typeof KsCs}
     * @protected
     */
    protected driver: typeof KsCs;
    /**
     * @type {KsCs}
     * @protected
     * @instance
     */
    protected default: KsCs;
    config: {};
    /**
     * @description initialize the service
     * @param {KsOption} [payload]
     * @returns {KsWc} self
     */
    set(payload?: KsOption): KsWc;
    /**
     * @description build instance
     * @param {KsOption} [opt={}]
     * @returns {Object} instance
     */
    build(opt?: KsOption): any;
    /**
     * @description alias for TList action
     * @param {TList} [query=null]
     * @returns {*} result
     */
    get(query?: TList): any;
    /**
     * @description list all entities
     * @param {TList} [query=null]
     * @returns {*} result
     */
    list(query?: TList): any;
    /**
     * @description alias for insert action
     * @param {TList|String} payload
     * @returns {*} result
     */
    add(payload: TList | string): any;
    /**
     * @description insert an entity
     * @param {TList|String} payload
     * @returns {*} result
     */
    insert(payload: TList | string): any;
    /**
     * @description update an entity
     * @param {TList|String} payload
     * @param {Number|String} [id]
     * @param {TList|String} [query]
     * @returns {*} result
     */
    update(payload: TList | string, id?: number | string, query?: TList | string): any;
    /**
     * @description delete an entity
     * @param {Number|String} id
     * @param {TList} [query]
     * @returns {*} result
     */
    delete(id: number | string, query?: TList): any;
    /**
     * @description get an entity
     * @param {Number|String} id
     * @param {TList} [query]
     * @returns {*} result
     */
    select(id: number | string, query?: TList): any;
    /**
     * @description custom query
     * @param {ReqConfig} payload
     * @returns {*} result
     */
    query(payload: ReqConfig): any;
    /**
     * @description alias for custom query
     * @param {ReqConfig} payload
     * @returns {*} result
     */
    request(payload: ReqConfig): any;
    /**
     * @description get authentication token
     * @param {TList} [opt=null]
     * @returns {*} result
     */
    connect(opt?: TList): any;
    #private;
}
declare namespace KsWc {
    export { TList, TTokenType, TContType, TResType, THttpAction, KsOption };
}
import KsCs = require("./KsCs");
type TList<T extends unknown = any> = {
    [name: string]: T;
};
type TTokenType = 'Bearer' | 'Basic';
type TContType = 'application/json' | 'application/xml' | 'text/html' | 'text/javascript' | 'application/gzip';
type TResType = 'arraybuffer' | 'document' | 'json' | 'text' | 'stream' | 'blob';
type THttpAction = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' | 'trace' | 'connect';
type KsOption = {
    url?: string;
    key?: string;
    end?: string;
    endpoint?: string;
};
