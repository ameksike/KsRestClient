/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 * */
const axios = require('axios');

class KsRestClient {
    /**
     * @description initialize the service 
     */
    constructor(payload = null) {
        this.url = '';
        this.key = '';
        this.end = '';
        this.params = '';
        this.endpoint = '';
        this.log = (inf) => {
            console.log('<< ', inf.message ? inf.message : inf);
        };
        this.token = 'Bearer';
        this.contentType = 'application/json';
        this.set(payload);
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

    /**
     * @description get request
     */
    getReq(){
        this.headers = this.headers || {};
        this.options = this.options || {};
        const request = {
            url: this.url + this.endpoint,
            method: this.method || 'get',
            ...this.options,
            headers: {
                ...this.headers,
                'Content-Type': this.contentType
            }
        };
        if (this.key) {
            request.headers['Authorization'] = this.token ? `${this.token} ${this.key}` : this.key;
        }
        return request;
    }
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
     * @description list all entities 
     */
    async list(query=null) {
        try {
            const request = this.getReq();
            query = this.paramToStr(query);
            query = query ? '?'+query : '';
            request.url += query;
            const response = await axios(request);
            if (!response || response.status != 200) {
                return null;
            }
            return response.data;
        } catch (err) {
            if (this.log) {
                this.log(err);
            }
            return null;
        }
    }

    /**
     * @description insert an entity
     * @param {*} payload 
     */
    async insert(payload) {
        try {
            const request = this.getReq();
            request.data = payload;
            request.method = 'post';
            const response = await axios(request);
            if (!response || response.status != 200) {
                return null;
            }
            return response.data;
        } catch (err) {
            if (this.log) {
                this.log(err);
            }
            return null;
        }
    }

    /**
     * @description update an entity
     * @param {*} payload 
     * @param {*} id 
     * @param {*} query 
     */
    async update(payload, id=null, query=null) {
        try {
            const request = this.getReq();
            query = this.paramToStr(query);
            query = query ? '?'+query : '';
            id = payload && payload.id ? payload.id : id;
            id = id ? '/' + id : '';
            request.url += id + query;
            request.data = payload;
            request.method = 'put';
            const response = await axios(request);
            if (!response || response.status != 200) {
                return null;
            }
            return response.data;
        } catch (err) {
            if (this.log) {
                this.log(err);
            }
            return null;
        }
    }

    /**
     * @description delete an entity
     * @param {*} id 
     */
    async delete(id, query=null) {
        try {
            const request = this.getReq();
            query = this.paramToStr(query);
            query = query ? '?' + query : '';
            id = id ? '/' + id : '';
            request.url += id + query;
            request.method = 'delete';
            const response = await axios(request);
            if (!response || response.status != 200) {
                return null;
            }
            return response.data;
        } catch (err) {
            if (this.log) {
                this.log(err);
            }
            return null;
        }
    }

    /**
     * @description get an entity
     * @param {*} id 
     * @param {*} query 
     */
    async select(id, query=null) {
        try {
            const request = this.getReq();
            query = this.paramToStr(query);
            query = query ? '?'+query : '';
            id = id ? '/' + id : '';
            request.url += id + query;
            request.method = 'get';
            const response = await axios(request);
            if (!response || response.status != 200) {
                return null;
            }
            return response.data;
        } catch (err) {
            if (this.log) {
                this.log(err);
            }
            return null;
        }
    }

    /**
     * @description custom query
     * @param {*} payload 
     */
    async query(payload) {
        try {
            const req = this.getReq();
            const request = {
                ...req,
                ...payload
            };
            const response = await axios(request);
            if (!response || response.status != 200) {
                return null;
            }
            return response.data;
        } catch (err) {
            if (this.log) {
                this.log(err);
            }
            return null;
        }
    }
}

module.exports = KsRestClient;