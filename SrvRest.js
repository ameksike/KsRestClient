/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 * */
class SrvRest {
    /**
     * @description initialize the service 
     */
    constructor(payload) {
        this.url = '';
        this.key = '';
        this.sec = true;
        this.token = 'Bearer';
        this.contentType = 'application/json';
        this.configure(payload);
    }

    /**
     * @description initialize the service 
     */
    configure(payload) {
        Object.assign(this, payload);
        this.request = {
            url: this.url,
            method: 'get',
            headers: {
                'Content-Type': this.contentType
            }
        };
        if(this.sec){
            this.request.headers['Authorization'] = `${this.token} ${this.key}`
        }
        return this;
    }

    /**
     * @description list all entities 
     */
    async list() {
        try {
            const response = await axios(this.request);
            if (!response || response.status != 200) {
                return null;
            }
            return response.data;

        } catch (err) {
            return null;
        }
    }

    /**
     * @description insert an entity
     * @param {*} payload 
     */
    async insert(payload) {
        try {
            payload = typeof(payload) === 'string' ? { source: payload } : payload;
            this.request.data = payload;
            this.request.method = 'post';
            const response = await axios(this.request);
            if (!response || response.status != 200) {
                return null;
            }
            return response.data;

        } catch (err) {
            return null;
        }
    }

    /**
     * @description update an entity
     * @param {*} payload 
     */
    async update(payload, code=null) {
        try {
            const id = code ? code : (payload && payload.code ? payload.code : '') ;
            payload = typeof(payload) === 'string' ? { source: payload } : payload;
            this.request.url += '/' + id;
            this.request.data = payload;
            this.request.method = 'put';
            const response = await axios(this.request);
            if (!response || response.status != 200) {
                return null;
            }
            return response.data;
        } catch (err) {
            return null;
        }
    }

    /**
     * @description delete an entity
     * @param {*} id 
     */
    async delete(code) {
        try {
            payload = typeof(payload) === 'string' ? { source: payload } : payload;
            this.request.url += '/' + code;
            this.request.method = 'delete';
            const response = await axios(this.request);
            if (!response || response.status != 200) {
                return null;
            }
            return response.data;
        } catch (err) {
            return null;
        }
    }

    /**
     * @description get an entity
     * @param {*} value 
     * @param {*} field 
     */
    async select(payload, code=null) {
        try {
            const id = code ? code : (payload && payload.code ? payload.code : '') ;
            payload = typeof(payload) === 'string' ? { source: payload } : payload;
            this.request.url += '/' + id;
            this.request.data = payload;
            this.request.method = 'get';
            const response = await axios(this.request);
            if (!response || response.status != 200) {
                return null;
            }
            return response.data;
        } catch (err) {
            return null;
        }
    }
}

module.exports = SrvRest;
