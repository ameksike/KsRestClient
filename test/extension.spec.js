const srv = require('kswc');
const app = require('./test.server');

const endpoint1 = '/api/person';

beforeAll(() => app.start());
afterAll(() => app.stop());

describe('Extension', () => {
    it("should a valid extension", async (done) => {

        class MyService extends srv.API.type.KsRest {

            constructor(payload = null) {
                super(payload);
            }

            async get(query = null) {
                const res = await super.get(query) || {};
                res.info = {
                    subclass: 'MyService'
                };
                return res;
            }
        }

        srv.set({
            url: app.url(),
            end: endpoint1,
            driver: MyService
        });

        const data = await srv.get();

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('GET');
        expect(data.metadata.path).toBe(endpoint1);
        expect(data.info.subclass).toBe('MyService');
        done();
    });

});