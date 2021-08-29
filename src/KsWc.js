/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 * */
const KsRest = require('./KsRest');
const KsCs = require('./KsCs');

class KsWc {
    /**
     * @description initialize the service 
     */
    constructor(payload = null) {
        this.default = this.build(payload);
        this.config = {};
    }

    /**
     * @description initialize the service 
     * @param {*} payload.
     */
    set(payload = null) {
        if (!payload) return this;
        this.config = Object.assign(this.config, payload);
        this.config.end = this.config.end ? this.config.end : this.config.endpoint;
        if (!this.config.end) return this;
        if (typeof (this.config.end) === 'object') {
            if(!this.config.end.default){
                throw new Error('"default" endpoint is required');
            }
            const opt = JSON.parse(JSON.stringify(this.config));
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
     * @description build instance 
     * @param {*} opt 
     */
    build(opt) {
        return new KsRest(opt);
    }

    /**
     * @description alias for list action 
     * @param {*} query 
     */
    async get(query = null) {
        if (!this.default) return false;
        return this.default.list(query);
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
        return this.default.insert(payload);
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
     * @param {*} id 
     * @param {*} query 
     */
    async update(payload, id = null, query = null) {
        if (!this.default) return false;
        return this.default.update(payload, id, query);
    }

    /**
     * @description delete an entity
     * @param {*} id 
     */
    async delete(id, query = null) {
        if (!this.default) return false;
        return this.default.delete(id, query);
    }

    /**
     * @description get an entity
     * @param {*} id 
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
        return this.query(payload);
    }

    /**
     * @description get authentication token
     */
    async connect(opt) {
        if (!this.default) return false;
        const token = await this.default.connect(opt);
        for(let i in this){
            if(i !== 'default' && this[i] && this[i] instanceof KsCs){
                this[i].key = this.default.key;
                this[i].exp = this.default.exp;
                this[i].token = this.default.token;
            }
        }
        return token;
    }
}

module.exports = KsWc;