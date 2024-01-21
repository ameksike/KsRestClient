const KsWc = require('./src/KsWc');
const KsRest = require('./src/KsRest');
const KsCs = require('./src/KsCs');
module.exports = new (class extends KsWc {
    API = KsWc;
    Cls = KsWc;
    KsWc = KsWc;
    KsRest = KsRest;
    KsCs = KsCs;
});