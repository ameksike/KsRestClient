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

class KsWc {
    /**
     * @description initialize the service 
     * @param {Object} [payload]
     * @param {typeof KsCs} [payload.driver]
     * @param {String} [payload.end] alias of endpoint
     * @param {String} [payload.endpoint] 
     */
    constructor(payload = null) {
        this.driver = KsRest;
        this.config = {};
        this.set(payload);
    }

    /**
     * @description initialize the service 
     * @param {Object} [payload]
     * @param {typeof KsCs} [payload.driver]
     * @param {String} [payload.end] alias of endpoint
     * @param {String} [payload.endpoint] 
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
     * @param {Object} [opt={}] 
     * @returns {Object} instance
     */
    build(opt = {}) {
        const Drv = this.driver;
        return new Drv(opt);
    }

    /**
     * @description alias for list action 
     * @param {*} query 
     */
    async get(query = null) {
        if (!this.default) return false;
        return this.default.get(query);
    }

    /**
     * @description list all entities 
     */
    async list(query = null) {
        if (!this.default) return false;
        return this.default.list(query);
    }

    /**
     * @description alias for insert action 
     * @param {*} payload 
     */
    async add(payload) {
        if (!this.default) return false;
        return this.default.add(payload);
    }

    /**
     * @description insert an entity
     * @param {*} payload 
     */
    async insert(payload) {
        if (!this.default) return false;
        return this.default.insert(payload);
    }

    /**
     * @description update an entity
     * @param {*} payload 
     * @param {Number|String} id 
     * @param {*} query 
     */
    async update(payload, id = null, query = null) {
        if (!this.default) return false;
        return this.default.update(payload, id, query);
    }

    /**
     * @description delete an entity
     * @param {Number|String} id 
     */
    async delete(id, query = null) {
        if (!this.default) return false;
        return this.default.delete(id, query);
    }

    /**
     * @description get an entity
     * @param {Number|String} id 
     * @param {*} query 
     */
    async select(id, query = null) {
        if (!this.default) return false;
        return this.default.select(id, query);
    }

    /**
     * @description custom query
     * @param {*} payload 
     */
    async query(payload) {
        if (!this.default) return false;
        return this.default.query(payload);
    }

    /**
     * @description custom query
     * @param {*} payload 
     */
    async request(payload) {
        if (!this.default) return false;
        return this.default.request(payload);
    }

    /**
     * @description get authentication token
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