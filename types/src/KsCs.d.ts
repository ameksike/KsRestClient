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
 * @callback TransformRequest
 * @param {*} data
 * @param {TList} [headers]
 * @returns {*} data
 *
 * @callback TransformResponse
 * @param {*} data
 * @returns {*} data
 *
 * @callback ParamsSerializer
 * @param {TList} params
 * @returns {String} data
 *
 * @callback Configure
 * @param {TList} config
 * @returns {Promise} result
 *
 * @callback ValidateStatus
 * @param {Number} status
 * @returns {Boolean} result
 */
/**
 * @typedef {Object} KsCsOpt
 * @property {String} [url]
 * @property {String} [key]
 * @property {String} [end]
 * @property {String} [endpoint]
 * @property {TTokenType} [token=Bearer]
 * @property {TContType|String} [contentType=application/json]
 * @property {String|TList} [params]
 */
/**
 * @typedef {Object} ReqConfig
 * @property {String} [url] - the server URL that will be used for the request
 * @property {String} [baseURL] - will be prepended to `url` unless `url` is absolute.
 * @property {THttpAction} [method=get] - the request method to be used when making the request It can be convenient to set `baseURL` for an instance of axios to pass relative URLs to methods of that instance.
 * @property {TTokenType} [token=Bearer]
 * @property {TContType|String} [contentType=application/json]
 * @property {Array<TransformRequest>} [transformRequest] - allows changes to the request data before it is sent to the server. This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
 * @property {Array<TransformResponse>} [transformResponse] - allows changes to the response data to be made before
 * @property {ParamsSerializer} [paramsSerializer] -  is an optional function in charge of serializing `params`
 * @property {TList<String>} [headers] - are custom headers to be sent
 * @property {TList|String} [params] - are the URL parameters to be sent with the request. Must be a plain object or a URLSearchParams object
 * @property {TList|String|ArrayBuffer|ArrayBufferView} [data] - is the data to be sent as the request body. Only applicable for request methods 'PUT', 'POST', 'DELETE', and 'PATCH'
 * @property {Number} [timeout=0] -  specifies the number of milliseconds before the request times out.
 * @property {Boolean} [withCredentials=false] - indicates whether or not cross-site Access-Control requests
 * @property {Configure} [adapter] - allows custom handling of requests which makes testing easier.
 * @property {Object} [auth] - indicates that HTTP Basic auth should be used, and supplies credentials.
 * @property {String} [auth.username]
 * @property {String} [auth.password]
 * @property {TResType} [responseType=json] - indicates the type of data that the server will respond with
 * @property {String} [responseEncoding=utf8] - indicates encoding to use for decoding responses (Node.js only)
 * @property {String} [xsrfCookieName=XSRF-TOKEN] - is the name of the cookie to use as a value for xsrf token
 * @property {String} [xsrfHeaderName=X-XSRF-TOKEN] - is the name of the http header that carries the xsrf token value
 * @property {Number} [maxContentLength] - defines the max size of the http response content in bytes allowed in node.js
 * @property {Number} [maxBodyLength] - (Node only option) defines the max size of the http request content in bytes allowed
 * @property {Number} [maxRedirects=5] -  defines the maximum number of redirects to follow in node.js.
 * @property {String} [socketPath=null] - defines a UNIX Socket to be used in node.js.
 * @property {ValidateStatus} [validateStatus] - defines whether to resolve or reject the promise for a given
 * @property {Object} [proxy] - defines the hostname, port, and protocol of the proxy server.
 * @property {String} [proxy.protocol] - Ex: https
 * @property {String} [proxy.host] - Ex: 127.0.0.1
 * @property {Number} [proxy.port] - Ex: 9000
 * @property {Object} [proxy.auth] - indicates that HTTP Basic auth should be through the proxy.
 * @property {String} [proxy.auth.username]
 * @property {String} [proxy.auth.password]
 * @property {Boolean} [decompress=true] - indicates whether or not the response body should be decompressed
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
     * @returns {ReqConfig} config
     */
    getReq(): ReqConfig;
    /**
     * @description initialize the service
     * @param {KsCsOpt} payload
     * @returns {KsCs} self
     */
    set(payload?: KsCsOpt): KsCs;
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
    /**
     * @description get From Path
     * @param {TList} obj
     * @param {TList|String} path
     * @returns {*} result
     */
    getFromPath(obj: TList, path?: TList | string): any;
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
    export { TList, TTokenType, TContType, TResType, THttpAction, TransformRequest, TransformResponse, ParamsSerializer, Configure, ValidateStatus, KsCsOpt, ReqConfig };
}
type TList<T extends unknown = any> = {
    [name: string]: T;
};
type TTokenType = 'Bearer' | 'Basic';
type TContType = 'application/json' | 'application/xml' | 'text/html' | 'text/javascript' | 'application/gzip';
type TResType = 'arraybuffer' | 'document' | 'json' | 'text' | 'stream' | 'blob';
type THttpAction = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' | 'trace' | 'connect';
type TransformRequest = (data: any, headers?: TList) => any;
type TransformResponse = (data: any) => any;
type ParamsSerializer = (params: TList) => string;
type Configure = (config: TList) => Promise<any>;
type ValidateStatus = (status: number) => boolean;
type KsCsOpt = {
    url?: string;
    key?: string;
    end?: string;
    endpoint?: string;
    token?: TTokenType;
    contentType?: TContType | string;
    params?: string | TList;
};
type ReqConfig = {
    /**
     * - the server URL that will be used for the request
     */
    url?: string;
    /**
     * - will be prepended to `url` unless `url` is absolute.
     */
    baseURL?: string;
    /**
     * - the request method to be used when making the request It can be convenient to set `baseURL` for an instance of axios to pass relative URLs to methods of that instance.
     */
    method?: THttpAction;
    token?: TTokenType;
    contentType?: TContType | string;
    /**
     * - allows changes to the request data before it is sent to the server. This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
     */
    transformRequest?: Array<TransformRequest>;
    /**
     * - allows changes to the response data to be made before
     */
    transformResponse?: Array<TransformResponse>;
    /**
     * -  is an optional function in charge of serializing `params`
     */
    paramsSerializer?: ParamsSerializer;
    /**
     * - are custom headers to be sent
     */
    headers?: TList<string>;
    /**
     * - are the URL parameters to be sent with the request. Must be a plain object or a URLSearchParams object
     */
    params?: TList | string;
    /**
     * - is the data to be sent as the request body. Only applicable for request methods 'PUT', 'POST', 'DELETE', and 'PATCH'
     */
    data?: TList | string | ArrayBuffer | ArrayBufferView;
    /**
     * -  specifies the number of milliseconds before the request times out.
     */
    timeout?: number;
    /**
     * - indicates whether or not cross-site Access-Control requests
     */
    withCredentials?: boolean;
    /**
     * - allows custom handling of requests which makes testing easier.
     */
    adapter?: Configure;
    /**
     * - indicates that HTTP Basic auth should be used, and supplies credentials.
     */
    auth?: {
        username?: string;
        password?: string;
    };
    /**
     * - indicates the type of data that the server will respond with
     */
    responseType?: TResType;
    /**
     * - indicates encoding to use for decoding responses (Node.js only)
     */
    responseEncoding?: string;
    /**
     * - is the name of the cookie to use as a value for xsrf token
     */
    xsrfCookieName?: string;
    /**
     * - is the name of the http header that carries the xsrf token value
     */
    xsrfHeaderName?: string;
    /**
     * - defines the max size of the http response content in bytes allowed in node.js
     */
    maxContentLength?: number;
    /**
     * - (Node only option) defines the max size of the http request content in bytes allowed
     */
    maxBodyLength?: number;
    /**
     * -  defines the maximum number of redirects to follow in node.js.
     */
    maxRedirects?: number;
    /**
     * - defines a UNIX Socket to be used in node.js.
     */
    socketPath?: string;
    /**
     * - defines whether to resolve or reject the promise for a given
     */
    validateStatus?: ValidateStatus;
    /**
     * - defines the hostname, port, and protocol of the proxy server.
     */
    proxy?: {
        protocol?: string;
        host?: string;
        port?: number;
        auth?: {
            username?: string;
            password?: string;
        };
    };
    /**
     * - indicates whether or not the response body should be decompressed
     */
    decompress?: boolean;
};
