const KsWc = require('./src/KsWc');
const KsRest = require('./src/KsRest');
const KsCs = require('./src/KsCs');
module.exports = new KsWc()
module.exports.API = KsWc;
module.exports.API.type = {
    KsRest,
    KsCs
};