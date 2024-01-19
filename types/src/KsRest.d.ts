export = KsRest;
declare class KsRest extends KsCs {
    /**
     * @description get request
     */
    getReq(): any;
    headers: any;
    options: any;
    /**
     * @description list all entities
     */
    list(query?: any): Promise<any>;
    /**
     * @description insert an entity
     * @param {*} payload
     */
    insert(payload: any): Promise<any>;
    /**
     * @description update an entity
     * @param {*} payload
     * @param {Number|String} id
     * @param {String} query
     */
    update(payload: any, id?: number | string, query?: string): Promise<any>;
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
     * @description get authentication token
     */
    connect(opt: any): Promise<any>;
    /**
     * @description get Client Credentials for OAuth
     * @param {Object} oauth
     * @param {String} oauth.grant_type VALUES [client_credentials]
     * @param {String} oauth.client_id
     * @param {String} oauth.client_secret
     * @param {String} oauth.client_authentication VALUES [body, header]
     * @param {String} oauth.url_access
     * @param {String} oauth.scope
     */
    getClientCredentials(oauth: {
        grant_type: string;
        client_id: string;
        client_secret: string;
        client_authentication: string;
        url_access: string;
        scope: string;
    }): Promise<any>;
    exp: any;
    /**
     * @description get Client Credentials for Basic method
     * @param {Object} opt
     * @param {String} opt.client_id
     * @param {String} opt.client_secret
     * @param {String} opt.url_access
     * @param {String} opt.token_path
     * @param {String} opt.client_id_field VALUES [username]
     * @param {String} opt.client_secret_field VALUES [password]
     * @param {String} opt.client_authentication VALUES [body, header]
     */
    getBasicCredentials(opt: {
        client_id: string;
        client_secret: string;
        url_access: string;
        token_path: string;
        client_id_field: string;
        client_secret_field: string;
        client_authentication: string;
    }): Promise<any>;
}
import KsCs = require("./KsCs");
