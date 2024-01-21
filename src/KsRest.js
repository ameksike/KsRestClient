/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @description Observer pattern
 * @copyright  	Copyright (c) 2019-2050
 * @license    	GPL
 * @version    	1.0
 **/

const axios = require('axios');
const KsCs = require('./KsCs');

class KsRest extends KsCs {
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
    
    async update(payload, id = null, query = null) {
        try {
            const request = this.getReq();
            query = this.paramToStr(query);
            query = query ? '?' + query : '';
            id = payload?.id || id;
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
            const oauth = opt?.oauth || this.oauth;
            const basic = opt?.basic || this.basic;
            if (oauth && oauth['grant_type'] === 'client_credentials') {
                return await this.getClientCredentials(oauth);
            } else if (basic) {
                return await this.getBasicCredentials(basic);
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
     * @param {Object} oauth 
     * @param {String} oauth.grant_type VALUES [client_credentials]
     * @param {String} oauth.client_id
     * @param {String} oauth.client_secret
     * @param {String} oauth.client_authentication VALUES [body, header] 
     * @param {String} oauth.url_access 
     * @param {String} oauth.scope 
     */
    async getClientCredentials(oauth) {
        if (!oauth.url_access) {
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
     * @param {Object} opt 
     * @param {String} opt.client_id
     * @param {String} opt.client_secret
     * @param {String} opt.url_access 
     * @param {String} opt.token_path 
     * @param {String} opt.client_id_field VALUES [username] 
     * @param {String} opt.client_secret_field VALUES [password] 
     * @param {String} opt.client_authentication VALUES [body, header] 
     */
    async getBasicCredentials(opt) {
        opt.client_id = opt.client_id || opt.username;
        opt.client_secret = opt.client_secret || opt.password;
        opt.token_path = opt.token_path || 'token';
        opt.client_authentication = opt.client_authentication || 'header';
        opt.client_id_field = opt.client_id_field || 'username';
        opt.client_secret_field = opt.client_secret_field || 'password';
        if (!opt.url_access) {
            return null;
        }
        const key = Buffer.from(opt.client_id + ':' + opt.client_secret).toString('base64');
        const request = {
            url: opt.url_access,
            method: 'post'
        };
        if (opt.client_authentication.toLowerCase() === 'header') {
            request.headers = {
                'Content-Type': this.contentType,
                'Authorization': `Basic ${key}`
            }
        } else {
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
}

module.exports = KsRest;