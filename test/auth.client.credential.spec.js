const srv = require('../');
const app = require('./test.server');

const endpoint = '/api/person';
const endpoint_oauth_credentials = '/oauth/client/credential';
const payload = {
    name: 'Jon',
    age: 55
};
const credential = {
    client_id: '5d6fd52d1796bd41632099cb5444b7f6',
    client_secret: 'b4ffbdb0e2c9efb45d5963370c2381a5',
}
const credBase64 = 'NWQ2ZmQ1MmQxNzk2YmQ0MTYzMjA5OWNiNTQ0NGI3ZjY6YjRmZmJkYjBlMmM5ZWZiNDVkNTk2MzM3MGMyMzgxYTU=';

beforeAll(() => app.start());
afterAll(() => app.stop());

describe('Oauth Client Credential', () => {
    it("should a valid connect for oauth client credentials by header", async (done) => {
        srv.set({
            url: app.url(),
            end: endpoint
        });
        const connect = await srv.connect({
            oauth: {
                ...credential,
                grant_type: 'client_credentials',
                client_authentication: 'header',
                url_access: app.url() + endpoint_oauth_credentials,
                scope: 'read write',
            }
        });

        expect(connect).toBeInstanceOf(Object);
        expect(connect.metadata.header.authorization).toBe(`Basic ${credBase64}`);
        expect(connect.metadata.body.client_id).toBe(undefined);
        expect(connect.metadata.path).toBe(endpoint_oauth_credentials);
        expect(connect.metadata.body.grant_type).toBe('client_credentials');
        expect(connect.access_token.length > 0).toBe(true);
        expect(connect.metadata.method).toBe('POST');
        done();
    });

    it("should a valid connect for oauth client credentials by body", async (done) => {
        srv.set({
            url: app.url(),
            end: endpoint
        });
        const connect = await srv.connect({
            oauth: {
                ...credential,
                grant_type: 'client_credentials',
                url_access: app.url() + endpoint_oauth_credentials,
                scope: 'read write',
            }
        });
        expect(connect).toBeInstanceOf(Object);
        expect(connect.metadata.header.authorization).toBe(undefined);
        expect(connect.metadata.path).toBe(endpoint_oauth_credentials);
        expect(connect.metadata.body.client_id).toBe(credential.client_id);
        expect(connect.metadata.body.client_secret).toBe(credential.client_secret);
        expect(connect.metadata.body.grant_type).toBe('client_credentials');
        expect(connect.access_token.length > 0).toBe(true);
        expect(connect.metadata.method).toBe('POST');
        done();
    });

    it("should a valid insert action with oauth client credentials", async (done) => {
        srv.set({
            url: app.url(),
            end: endpoint,
            oauth: {
                ...credential,
                grant_type: 'client_credentials',
                url_access: app.url() + endpoint_oauth_credentials,
                scope: 'read write',
            }
        });

        const connect = await srv.connect();
        expect(connect).toBeInstanceOf(Object);
        expect(connect.metadata.header.authorization).toBe(undefined);
        expect(connect.metadata.path).toBe(endpoint_oauth_credentials);
        expect(connect.metadata.body.client_id).toBe(credential.client_id);
        expect(connect.metadata.body.client_secret).toBe(credential.client_secret);
        expect(connect.metadata.body.grant_type).toBe('client_credentials');
        expect(connect.access_token.length > 0).toBe(true);
        expect(connect.metadata.method).toBe('POST');

        const data = await srv.insert(payload);
        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('POST');
        expect(data.metadata.body.name).toBe(payload.name);
        expect(data.metadata.path).toBe(endpoint);
        expect(data.metadata.header.authorization).toBe(`${connect.token_type} ${connect.access_token}`);
        done();
    });

});