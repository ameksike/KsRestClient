export = KsCs;
/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @description Observer pattern
 * @copyright  	Copyright (c) 2019-2050
 * @license    	GPL
 * @version    	1.0
 **/
/**
 * @typedef {({[name:String]:Object})} List
 * @typedef {'Bearer' | 'Basic'} EnumTokenType
 * @typedef {'application/json' | 'application/xml' | 'text/html' | 'text/javascript'| 'application/gzip' } EnumTokenType
 **/
/**
 * @typedef {Object} KsCsOpt
 * @property {String} [url]
 * @property {String} [key]
 * @property {String} [end]
 * @property {String} [endpoint]
 * @property {EnumTokenType} [token=Bearer]
 * @property {EnumTokenType|String} [contentType=application/json]
 * @property {String|List} [params]
 *
 */
declare class KsCs {
    /**
     * @description initialize the service
     * @param {KsCsOpt} [payload=null]
     */
    constructor(payload?: KsCsOpt);
    url: string;
    key: string;
    end: string;
    params: string;
    endpoint: string;
    oauth: any;
    basic: any;
    token: string;
    contentType: string;
    log: (inf: any) => void;
    /**
     * @description get request
     */
    getReq(): void;
    /**
     * @description initialize the service
     * @param {*} payload
     * @returns {KsCs} self
     */
    set(payload?: any): KsCs;
    /**
     * @description alias for list action
     * @param {List} [query=null]
     * @returns {*} result
     */
    get(query?: List): any;
    /**
     * @description list all entities
     * @param {List} [query=null]
     * @returns {*} result
     */
    list(query?: List): any;
    /**
     * @description alias for insert action
     * @param {*} payload
     */
    add(payload: any): Promise<void>;
    /**
     * @description insert an entity
     * @param {*} payload
     */
    insert(payload: any): Promise<void>;
    /**
     * @description update an entity
     * @param {*} payload
     * @param {Number|String} id
     * @param {String} query
     */
    update(payload: any, id?: number | string, query?: string): Promise<void>;
    /**
     * @description delete an entity
     * @param {Number|String} id
     * @param {List} query
     */
    delete(id: number | string, query?: List): Promise<void>;
    /**
     * @description get an entity
     * @param {Number|String} id
     * @param {List} query
     */
    select(id: number | string, query?: List): Promise<void>;
    /**
     * @description custom query
     * @param {*} payload
     */
    query(payload: any): Promise<void>;
    /**
     * @description custom query
     * @param {*} payload
     */
    request(payload: any): Promise<void>;
    /**
     * @description get authentication token
     */
    connect(opt: any): Promise<void>;
    /**
     * @description get From Path
     * @param {*} obj
     * @param {List|String} path
     */
    getFromPath(obj: any, path?: List | string): any;
    /**
     * @description get params as string
     * @param {Object} param
     * @param {Console} param.log
     * @param {String} param.url
     * @param {String} param.key
     * @param {String} param.end alias for endpoint
     * @param {Object} param.params
     * @param {String} param.endpoint
     * @param {String} param.token default Bearer
     * @param {String} param.contentType default application/json
     * @param {String} param.endpoint
     * @param {Object} param.headers
     */
    paramToStr(param: {
        log: Console;
        url: string;
        key: string;
        end: string;
        params: any;
        endpoint: string;
        token: string;
        contentType: string;
        endpoint: string;
        headers: any;
    }): string;
}
declare namespace KsCs {
    export { List, EnumTokenType, KsCsOpt };
}
type List = {
    [name: string]: any;
};
type EnumTokenType = 'Bearer' | 'Basic';
type KsCsOpt = {
    url?: string;
    key?: string;
    end?: string;
    endpoint?: string;
    token?: EnumTokenType;
    contentType?: EnumTokenType | string;
    params?: string | List;
};
