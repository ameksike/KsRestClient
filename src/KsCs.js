/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 * */

class KsCs {
    /**
     * @description initialize the service 
     */
    constructor(payload = null) {
        this.url = '';
        this.key = '';
        this.end = '';
        this.params = '';
        this.endpoint = '';
        this.oauth = null;
        this.basic = null;
        this.token = 'Bearer';
        this.contentType = 'application/json';
        this.log = (inf) => {
            console.log('<< ', inf.message ? inf.message : inf);
        };
        this.set(payload);
    }

    /**
     * @description get request
     */
    getReq() {}

    /**
     * @description initialize the service 
     * @param {*} payload.
     */
    set(payload = null) {
        if (!payload) return this;
        if (typeof (payload) === 'string') {
            this.endpoint = payload;
        } else {
            Object.assign(this, payload);
        }
        this.endpoint = this.endpoint || this.end;
        return this;
    }

    /**
     * @description alias for list action 
     * @param {*} query 
     */
    async get(query = null) {
        return this.list(query);
    }

    /**
     * @description list all entities 
     */
    async list(query = null) {}

    /**
     * @description alias for insert action 
     * @param {*} payload 
     */
    async add(payload) {
        return this.insert(payload);
    }

    /**
     * @description insert an entity
     * @param {*} payload 
     */
    async insert(payload) {}

    /**
     * @description update an entity
     * @param {*} payload 
     * @param {*} id 
     * @param {*} query 
     */
    async update(payload, id = null, query = null) {}

    /**
     * @description delete an entity
     * @param {*} id 
     */
    async delete(id, query = null) {}

    /**
     * @description get an entity
     * @param {*} id 
     * @param {*} query 
     */
    async select(id, query = null) {}

    /**
     * @description custom query
     * @param {*} payload 
     */
    async query(payload) {}

    /**
     * @description get authentication token
     */
    async connect(opt) {}

    /**
     * @description get From Path
     * @param {*} obj 
     * @param {*} path 
     */
    getFromPath(obj, path = null) {
        if (!path) return null;
        let data = null;
        const props = path instanceof Object ? path : path.split('.');
        for (let i in props) {
            data = data ? data[props[i]] : obj[props[i]];
        }
        return data;
    }

    /**
     * @description get params as string 
     * @param {FUNCTION} param.log
     * @param {STRING} param.url
     * @param {STRING} param.key
     * @param {STRING} param.end alias for endpoint
     * @param {OBJECT} param.params 
     * @param {STRING} param.endpoint 
     * @param {STRING} param.token default Bearer
     * @param {STRING} param.contentType default application/json
     * @param {STRING} param.endpoint 
     * @param {OBJECT} param.headers 
     */
    paramToStr(param) {
        let src = '';
        if (!param) return src;
        for (let i in param) {
            src += `${src === '' ? '' : '&'}${i}=${param[i]}`;
        }
        return src;
    }
}

module.exports = KsCs;