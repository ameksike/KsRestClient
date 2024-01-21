/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @description Observer pattern
 * @copyright  	Copyright (c) 2019-2050
 * @license    	GPL
 * @version    	1.0
 **/

const KsRest = require('./KsRest');
const KsCs = require('./KsCs');

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

class KsWc {
    /**
     * @type {typeof KsCs}
     * @protected
     */
    driver = null;
    /**
     * @type {KsCs}
     * @protected
     * @instance
     */
    default = null;

    /**
     * @description initialize the service 
     * @param {KsOption} [payload]
     */
    constructor(payload = null) {
        this.driver = KsRest;
        this.config = {};
        this.set(payload);
    }

    /**
     * @description initialize the service 
     * @param {KsOption} [payload]
     * @returns {KsWc} self
     */
    set(payload = null) {
        if (!payload) return this;
        if (payload.driver) {
            this.driver = payload.driver.prototype instanceof KsCs ? payload.driver : this.driver;
            delete payload.driver;
        };
        if (Object.keys(payload).length === 0) return this;
        this.config = Object.assign(this.config, payload);
        this.config.end = this.config.end ? this.config.end : this.config.endpoint;
        if (!this.config.end) return this;
        if (typeof (this.config.end) === 'object') {
            if (!this.config.end.default) {
                throw new Error('"default" endpoint is required');
            }
            const opt = this.#cloneObj(this.config);
            for (let i in this.config.end) {
                const opts = typeof (this.config.end[i]) === 'string' ? {
                    end: this.config.end[i]
                } : this.config.end[i];
                const param = Object.assign(opt, opts);
                this[i] = this.build(param);
            }
        } else {
            this.default = this.build(this.config);
        }
        return this;
    }

    /**
     * @description clone objects
     * @private
     * @param {Object} obj 
     * @returns {Object} clone 
     */
    #cloneObj(obj) {
        try {
            return JSON.parse(JSON.stringify(obj));
        }
        catch (error) {
            return null
        }
    }

    /**
     * @description build instance 
     * @param {KsOption} [opt={}] 
     * @returns {Object} instance
     */
    build(opt = {}) {
        const Drv = this.driver;
        return new Drv(opt);
    }

    /**
     * @description alias for TList action 
     * @param {TList} [query=null] 
     * @returns {*} result
     */
    async get(query = null) {
        if (!this.default) return false;
        return this.default.get(query);
    }

    /**
     * @description list all entities 
     * @param {TList} [query=null]
     * @returns {*} result
     */
    async list(query = null) {
        if (!this.default) return false;
        return this.default.list(query);
    }

    /**
     * @description alias for insert action 
     * @param {TList|String} payload 
     * @returns {*} result 
     */
    async add(payload) {
        if (!this.default) return false;
        return this.default.add(payload);
    }

    /**
     * @description insert an entity
     * @param {TList|String} payload 
     * @returns {*} result 
     */
    async insert(payload) {
        if (!this.default) return false;
        return this.default.insert(payload);
    }

    /**
     * @description update an entity
     * @param {TList|String} payload 
     * @param {Number|String} [id] 
     * @param {TList|String} [query] 
     * @returns {*} result 
     */
    async update(payload, id = null, query = null) {
        if (!this.default) return false;
        return this.default.update(payload, id, query);
    }

    /**
     * @description delete an entity
     * @param {Number|String} id 
     * @param {TList} [query] 
     * @returns {*} result 
     */
    async delete(id, query = null) {
        if (!this.default) return false;
        return this.default.delete(id, query);
    }

    /**
     * @description get an entity
     * @param {Number|String} id 
     * @param {TList} [query] 
     * @returns {*} result 
     */
    async select(id, query = null) {
        if (!this.default) return false;
        return this.default.select(id, query);
    }

    /**
     * @description custom query
     * @param {ReqConfig} payload 
     * @returns {*} result 
     */
    async query(payload) {
        if (!this.default) return false;
        return this.default.query(payload);
    }

    /**
     * @description alias for custom query
     * @param {ReqConfig} payload 
     * @returns {*} result 
     */
    async request(payload) {
        if (!this.default) return false;
        return this.default.request(payload);
    }

    /**
     * @description get authentication token
     * @param {TList} [opt=null]
     * @returns {*} result 
     */
    async connect(opt) {
        if (!this.default) return false;
        const token = await this.default.connect(opt);
        for (let i in this) {
            if (i !== 'default' && this[i] && this[i] instanceof KsCs) {
                this[i].key = this.default.key;
                this[i].exp = this.default.exp;
                this[i].token = this.default.token;
            }
        }
        return token;
    }
}

module.exports = KsWc;