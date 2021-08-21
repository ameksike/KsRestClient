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
        this.oauth = null;
        this.basic = null;
        this.token = 'Bearer';
        this.contentType = 'application/json';
        this.set(payload);
    }

    /**
     * @description get request
     */
    getReq() {
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
     * @description alias for list action 
     * @param {*} query 
     */
    async get(query = null) {
        return this.list(query);
    }

    /**
     * @description list all entities 
     */
    async list(query = null) {
        try {
            const request = this.getReq();
            query = this.paramToStr(query);
            query = query ? '?' + query : '';
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
    async update(payload, id = null, query = null) {
        try {
            const request = this.getReq();
            query = this.paramToStr(query);
            query = query ? '?' + query : '';
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
    async delete(id, query = null) {
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
    async select(id, query = null) {
        try {
            const request = this.getReq();
            query = this.paramToStr(query);
            query = query ? '?' + query : '';
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

   /**
    * @description get authentication token
    */
    async connect(opt) {
        try {
            const oauth = opt && opt.oauth ? opt.oauth : this.oauth;
            const basic = opt && opt.basic ? opt.basic : this.basic;
            if (oauth && oauth['grant_type'] === 'client_credentials') {
                return this.getClientCredentials(oauth);
            }else if(basic){
                return this.getBasicCredentials(basic);
            }
            return null;
        } catch (err) {
            if (this.log) {
                this.log(err);
            }
            return null;
        }
    }

    /**
     * @description get Client Credentials for OAuth
     * @param {OBJECT} oauth 
     * @param {STRING} oauth.grant_type VALUES [client_credentials]
     * @param {STRING} oauth.client_id
     * @param {STRING} oauth.client_secret
     * @param {STRING} oauth.client_authentication VALUES [body, header] 
     * @param {STRING} oauth.url_access 
     * @param {STRING} oauth.scope 
     */
    async getClientCredentials(oauth) {
        if(!opt.url_access ){
            return null;
        }
        const request = {
            url: oauth.url_access,
            method: 'post',
            data: {
                grant_type: oauth.grant_type
            }
        };
        if (oauth.client_authentication && oauth.client_authentication.toLowerCase() === 'header') {
            const key = Buffer.from(oauth.client_id + ':' + oauth.client_secret).toString('base64');
            request.headers = {
                'Content-Type': this.contentType,
                'Authorization': `Basic ${key}`
            }
        } else {
            request.data.client_id = oauth.client_id;
            request.data.client_secret = oauth.client_secret;
            request.data.scope = oauth.scope;
        }
        const response = await axios(request);
        if (!response || (response && (response.status != 200 || !response.data))) {
            return null;
        }
        this.key = response.data.access_token;
        this.token = response.data.token_type;
        this.exp = response.data.expires_in;
        return response.data;
    }

    /**
     * @description get Client Credentials for Basic method
     * @param {OBJECT} opt 
     * @param {STRING} opt.client_id
     * @param {STRING} opt.client_secret
     * @param {STRING} opt.url_access 
     * @param {STRING} opt.token_path 
     * @param {STRING} opt.client_id_field VALUES [username] 
     * @param {STRING} opt.client_secret_field VALUES [password] 
     * @param {STRING} opt.client_authentication VALUES [body, header] 
     */
    async getBasicCredentials(opt) {
        opt.client_id = opt.client_id || opt.username;
        opt.client_secret = opt.client_secret || opt.password;
        opt.token_path = opt.token_path || 'token';
        opt.client_authentication = opt.client_authentication || 'header';
        opt.client_id_field = opt.client_id_field || 'username';
        opt.client_secret_field = opt.client_secret_field || 'password';
        if(!opt.url_access ){
            return null;
        }
        const key = Buffer.from(opt.client_id + ':' + opt.client_secret).toString('base64');
        const request = {
            url: opt.url_access,
            method: 'post' 
        };
        if(opt.client_authentication.toLowerCase() === 'header'){
            request.headers = {
                'Content-Type': this.contentType,
                'Authorization': `Basic ${key}`
            }
        }else{
            request.data = {
                [opt.client_id_field]: opt.client_id,
                [opt.client_secret_field]: opt.client_secret
            }
        }
        const response = await axios(request);
        if (!response || (response && (response.status != 200 || !response.data))) {
            return null;
        }
        const tok = this.getFromPath(response.data, opt.token_path);
        this.key = tok || response.data;
        return response.data;
    }

    /**
     * @description get From Path
     * @param {*} obj 
     * @param {*} path 
     */
    getFromPath(obj, path=null){
        if(!path) return null;
        let data = null;
        const props = path instanceof Object ? path : path.split('.');
        for(let i in props){
            data = data ? data[props[i]] : obj[props[i]] ;
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

module.exports = KsRestClient;