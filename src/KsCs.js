/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @description Observer pattern
 * @copyright  	Copyright (c) 2019-2050
 * @license    	GPL
 * @version    	1.0
 **/
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
    getReq() { /* TODO document why this method 'getReq' is empty */ }

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
    async list(query = null) { /* TODO document why this async method 'list' is empty */ }

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
    async insert(payload) { /* TODO document why this async method 'insert' is empty */ }

    /**
     * @description update an entity
     * @param {*} payload 
     * @param {*} id 
     * @param {*} query 
     */
    async update(payload, id = null, query = null) { /* TODO document why this async method 'update' is empty */ }

    /**
     * @description delete an entity
     * @param {*} id 
     */
    async delete(id, query = null) { /* TODO document why this async method 'delete' is empty */ }

    /**
     * @description get an entity
     * @param {*} id 
     * @param {*} query 
     */
    async select(id, query = null) { /* TODO document why this async method 'select' is empty */ }

    /**
     * @description custom query
     * @param {*} payload 
     */
    async query(payload) { /* TODO document why this async method 'query' is empty */ }

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
    async connect(opt) { /* TODO document why this async method 'connect' is empty */ }

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