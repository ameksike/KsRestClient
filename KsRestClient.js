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
        this.sec = true;
        this.params = '';
        this.endpoint = '';
        this.token = 'Bearer';
        this.contentType = 'application/json';
        this.set(payload);
    }

    /**
     * @description get params as string 
     * @param {BOOLEAN} param.sec
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
        if(!param) return src;
        for (let i in param) {
            src += `${src === '' ? '' : '&'}${i}=${param[i]}`;
        }
        return src;
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
        this.headers = this.headers || {};
        this.options = this.options || {};
        this.request = {
            url: this.url + this.endpoint,
            method: this.method || 'get',
            ...this.options,
            headers: {
                ...this.headers,
                'Content-Type': this.contentType
            }
        };
        if (this.sec) {
            this.request.headers['Authorization'] = `${this.token} ${this.key}`
        }
        return this;
    }

    /**
     * @description list all entities 
     */
    async list() {
        return new Promise((resolve, reject) => {
            try {
                const response = await axios(this.request);
                if (!response || response.status != 200) {
                    return null;
                }
                resolve(response.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * @description insert an entity
     * @param {*} payload 
     */
    async insert(payload) {
        return new Promise((resolve, reject) => {
            try {
                this.request.data = payload;
                this.request.method = 'post';
                const response = await axios(this.request);
                if (!response || response.status != 200) {
                    return null;
                }
                resolve(response.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * @description update an entity
     * @param {*} payload 
     */
    async update(payload, code = null) {
        return new Promise((resolve, reject) => {
            try {
                const id = code ? code : (payload && payload.code ? payload.code : '');
                payload = typeof (payload) === 'string' ? {
                    source: payload
                } : payload;
                this.request.url +=  this.paramToStr(this.params) + '/' + id;
                this.request.data = payload;
                this.request.method = 'put';
                const response = await axios(this.request);
                if (!response || response.status != 200) {
                    return null;
                }
                resolve(response.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * @description delete an entity
     * @param {*} id 
     */
    async delete(code) {
        return new Promise((resolve, reject) => {
            try {
                this.request.url +=  '/' + code ;
                this.request.method = 'delete';
                const response = await axios(this.request);
                if (!response || response.status != 200) {
                    return null;
                }
                resolve(response.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * @description get an entity
     * @param {*} payload 
     * @param {*} code 
     */
    async select(payload, code = null) {
        return new Promise((resolve, reject) => {
            try {
                const id = code ? code : (payload && payload.code ? payload.code : '');
                this.request.url += '/' + id;
                this.request.data = payload;
                this.request.method = 'get';
                const response = await axios(this.request);
                if (!response || response.status != 200) {
                    return null;
                }
                resolve(response.data);
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = KsRestClient;