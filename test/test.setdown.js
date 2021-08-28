const app = require('./test.server');

const teardown = async () => {
    app.stop();
}

module.exports = teardown;