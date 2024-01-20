export = KsWc;
declare class KsWc {
    /**
     * @description initialize the service
     * @param {Object} [payload]
     * @param {typeof KsCs} [payload.driver]
     * @param {String} [payload.end] alias of endpoint
     * @param {String} [payload.endpoint]
     */
    constructor(payload?: {
        driver?: typeof KsCs;
        end?: string;
        endpoint?: string;
    });
    driver: typeof KsRest;
    config: {};
    /**
     * @description initialize the service
     * @param {Object} [payload]
     * @param {typeof KsCs} [payload.driver]
     * @param {String} [payload.end] alias of endpoint
     * @param {String} [payload.endpoint]
     * @returns {KsWc} self
     */
    set(payload?: {
        driver?: typeof KsCs;
        end?: string;
        endpoint?: string;
    }): KsWc;
    default: any;
    /**
     * @description build instance
     * @param {Object} [opt={}]
     * @returns {Object} instance
     */
    build(opt?: any): any;
    /**
     * @description alias for list action
     * @param {*} query
     */
    get(query?: any): Promise<any>;
    /**
     * @description list all entities
     */
    list(query?: any): Promise<any>;
    /**
     * @description alias for insert action
     * @param {*} payload
     */
    add(payload: any): Promise<any>;
    /**
     * @description insert an entity
     * @param {*} payload
     */
    insert(payload: any): Promise<any>;
    /**
     * @description update an entity
     * @param {*} payload
     * @param {Number|String} id
     * @param {*} query
     */
    update(payload: any, id?: any, query?: any): Promise<any>;
    /**
     * @description delete an entity
     * @param {Number|String} id
     */
    delete(id: any, query?: any): Promise<any>;
    /**
     * @description get an entity
     * @param {Number|String} id
     * @param {*} query
     */
    select(id: any, query?: any): Promise<any>;
    /**
     * @description custom query
     * @param {*} payload
     */
    query(payload: any): Promise<any>;
    /**
     * @description custom query
     * @param {*} payload
     */
    request(payload: any): Promise<any>;
    /**
     * @description get authentication token
     */
    connect(opt: any): Promise<any>;
    #private;
}
import KsRest = require("./KsRest");
import KsCs = require("./KsCs");
