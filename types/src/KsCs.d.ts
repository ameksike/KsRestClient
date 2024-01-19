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
declare class KsCs {
    /**
     * @description initialize the service
     */
    constructor(payload?: any);
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
     * @param {*} payload.
     */
    set(payload?: any): this;
    /**
     * @description alias for list action
     * @param {*} query
     */
    get(query?: any): Promise<void>;
    /**
     * @description list all entities
     */
    list(query?: any): Promise<void>;
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
     * @param {*} id
     * @param {*} query
     */
    update(payload: any, id?: any, query?: any): Promise<void>;
    /**
     * @description delete an entity
     * @param {*} id
     */
    delete(id: any, query?: any): Promise<void>;
    /**
     * @description get an entity
     * @param {*} id
     * @param {*} query
     */
    select(id: any, query?: any): Promise<void>;
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
     * @param {*} path
     */
    getFromPath(obj: any, path?: any): any;
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
