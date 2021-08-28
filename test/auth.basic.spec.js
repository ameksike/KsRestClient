const srv = require('kswc');
const app = require('./test.server');

const endpoint = '/api/person';
const endpoint_auth_basic = '/auth/basic';
const payload = {
    name: 'Jon',
    age: 55
};
const query = {
    limit: 10,
    offset: 3
};
const credential = {
    client_id: 'my.username.plain',
    client_secret: 'my.password.plain'
}
const credBase64 = 'bXkudXNlcm5hbWUucGxhaW46bXkucGFzc3dvcmQucGxhaW4=';


beforeAll(() => app.start());
afterAll(() => app.stop());

describe('Auth Basic', () => {
    it("should a valid connect for basic auth", async (done) => {
        srv.set({
            url: app.url(),
            end: endpoint
        });
        const connect = await srv.connect({
            basic: {
                ...credential,
                url_access: app.url() + endpoint_auth_basic,
                token_path: 'auth.token'
            }
        });

        expect(connect).toBeInstanceOf(Object);
        expect(connect.metadata.header.authorization).toBe(`Basic ${credBase64}`);
        expect(connect.metadata.path).toBe(endpoint_auth_basic);
        done();
    });

    it("should a valid get action", async (done) => {
        srv.set({
            url: app.url(),
            end: endpoint,
            basic: {
                ...credential,
                url_access: app.url() + endpoint_auth_basic,
                token_path: 'auth.token'
            }
        });

        const connect = await srv.connect();
        expect(connect).toBeInstanceOf(Object);
        expect(connect.metadata.header.authorization).toBe(`Basic ${credBase64}`);
        expect(connect.metadata.path).toBe(endpoint_auth_basic);

        const data = await srv.get();
        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('GET');
        expect(data.metadata.path).toBe(endpoint);
        expect(data.metadata.header.authorization).toBe(`Bearer ${connect.auth.token}`);
        done();
    });

    it("should a valid insert action", async (done) => {
        srv.set({
            url: app.url(),
            end: endpoint,
            basic: {
                ...credential,
                url_access: app.url() + endpoint_auth_basic,
                token_path: 'auth.token'
            }
        });

        const connect = await srv.connect();
        expect(connect).toBeInstanceOf(Object);
        expect(connect.metadata.header.authorization).toBe(`Basic ${credBase64}`);
        expect(connect.metadata.path).toBe(endpoint_auth_basic);

        const data = await srv.insert(payload);
        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('POST');
        expect(data.metadata.body.name).toBe(payload.name);
        expect(data.metadata.path).toBe(endpoint);
        expect(data.metadata.header.authorization).toBe(`Bearer ${connect.auth.token}`);
        done();
    });
});