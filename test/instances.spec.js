const srv = require('kswc');
const app = require('./test.server');

const endpoint1 = '/api/person';
const endpoint2 = '/api/address';
const endpoint3 = '/api/work';
const endpoint_auth_basic = '/auth/basic';

const credential = {
    client_id: 'my.username.plain',
    client_secret: 'my.password.plain'
}
const credBase64 = 'bXkudXNlcm5hbWUucGxhaW46bXkucGFzc3dvcmQucGxhaW4=';

beforeAll(() => app.start());
afterAll(() => app.stop());

describe('Instances', () => {
    it("should a valid instance", async (done) => {
     
        const srvPerson = new srv.API({
            url: app.url(),
            end: endpoint1,
            basic: {
                ...credential,
                url_access: app.url() + endpoint_auth_basic,
                token_path: 'auth.token'
            }
        });

        const connect = await srvPerson.connect();
        expect(connect).toBeInstanceOf(Object);
        expect(connect.metadata.header.authorization).toBe(`Basic ${credBase64}`);
        expect(connect.metadata.path).toBe(endpoint_auth_basic);

        const data = await srvPerson.get();
        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('GET');
        expect(data.metadata.path).toBe(endpoint1);
        expect(data.metadata.header.authorization).toBe(`Bearer ${connect.auth.token}`);
        done();
    });

    it("should valid instances", async (done) => {
        //... instance for Global service
        srv.set({
            url: app.url(),
            end: endpoint1,
        });
        const data0 = await srv.get();
        expect(data0).toBeInstanceOf(Object);
        expect(data0.metadata.method).toBe('GET');
        expect(data0.metadata.path).toBe(endpoint1);
        //... instance for Person services
        const srvPerson = new srv.API({
            url: app.url(),
            end: endpoint1
        });
        const data1 = await srvPerson.get();
        expect(data1).toBeInstanceOf(Object);
        expect(data1.metadata.method).toBe('GET');
        expect(data1.metadata.path).toBe(endpoint1);
        //... instance for Other services
        const srvOther = new srv.API({
            url: app.url(),
            end: {
                default: endpoint3,
                address: endpoint2
            }
        });
        const data2 = await srvOther.get();
        expect(data2).toBeInstanceOf(Object);
        expect(data2.metadata.method).toBe('GET');
        expect(data2.metadata.path).toBe(endpoint3);

        const data3 = await srvOther.address.get();
        expect(data3).toBeInstanceOf(Object);
        expect(data3.metadata.method).toBe('GET');
        expect(data3.metadata.path).toBe(endpoint2);
        done();
    });

});