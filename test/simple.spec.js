const app = require('kswc/test/server');
const srv = require('kswc');

describe('Simple', () => {
    it("should a valid instance", async (done) => {

        srv.set({
            url: app.url,
            end: '/api/person',
        });

        const data = await srv.get();

        expect(data).toBeInstanceOf(Object);
        expect(data.method).toBe('GET');
        
        done();
    });
});

afterAll(() => {
    app.stop();
});

beforeAll(async () => {
    app.start();
});