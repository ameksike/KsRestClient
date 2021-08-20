const SrvRest = require('./SrvRest');
const url = 'https://tpp-shortner.herokuapp.com';
const key = 'MTYyOTQ5NjMxMDI0MDpkZGE5NjVjM2VmNDMwM2I4Njc2YzU4MDAwNjkzMjQ2NQ==';
module.exports = {
    SrvRest,
    srvRest: new SrvRest({ url, key })
};