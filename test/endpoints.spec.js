const srv = require('kswc');
const app = require('./test.server');

const endpoint1 = '/api/person';
const endpoint2 = '/api/address';
const endpoint_oauth_credentials = '/oauth/client/credential';
const endpoint_auth_basic = '/auth/basic';
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

describe('Endpoints', () => {
    it("should a valid connect for oauth client credentials by header", async (done) => {
        srv.set({
            url: app.url(),
            end: {
                default: endpoint1,
                address: endpoint2
            },
            basic: {
                ...credential,
                url_access: app.url() + endpoint_auth_basic,
                token_path: 'auth.token'
            }
        });

        expect(srv.default).toBeInstanceOf(Object);
        expect(srv.address).toBeInstanceOf(Object);

        const connect = await srv.connect();
        expect(connect).toBeInstanceOf(Object);
        expect(connect.metadata.header.authorization).toBe(`Basic ${credBase64}`);
        expect(connect.metadata.path).toBe(endpoint_auth_basic);
        expect(connect.metadata.method).toBe('POST');

        const dataDef = await srv.list();
        expect(dataDef.metadata.method).toBe('GET');
        expect(dataDef.metadata.path).toBe(endpoint1);
        expect(dataDef.metadata.header.authorization).toBe(`Bearer ${connect.auth.token}`);

        const dataAdd = await srv.address.get();
        expect(dataAdd.metadata.method).toBe('GET');
        expect(dataAdd.metadata.path).toBe(endpoint2);
        expect(dataAdd.metadata.header.authorization).toBe(`Bearer ${connect.auth.token}`);
        done();
    });
});