export = KsWc;
declare class KsWc {
    /**
     * @description initialize the service
     */
    constructor(payload?: any);
    driver: typeof KsRest;
    config: {};
    /**
     * @description initialize the service
     * @param {*} payload
     */
    set(payload?: any): this;
    default: KsRest;
    /**
     * @description build instance
     * @param {*} opt
     */
    build(opt: any): KsRest;
    /**
     * @description alias for list action
     * @param {*} query
     */
    get(query?: any): Promise<false | void>;
    /**
     * @description list all entities
     */
    list(query?: any): Promise<any>;
    /**
     * @description alias for insert action
     * @param {*} payload
     */
    add(payload: any): Promise<false | void>;
    /**
     * @description insert an entity
     * @param {*} payload
     */
    insert(payload: any): Promise<any>;
    /**
     * @description update an entity
     * @param {*} payload
     * @param {*} id
     * @param {*} query
     */
    update(payload: any, id?: any, query?: any): Promise<any>;
    /**
     * @description delete an entity
     * @param {*} id
     */
    delete(id: any, query?: any): Promise<any>;
    /**
     * @description get an entity
     * @param {*} id
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
    request(payload: any): Promise<false | void>;
    /**
     * @description get authentication token
     */
    connect(opt: any): Promise<any>;
}
import KsRest = require("./KsRest");
