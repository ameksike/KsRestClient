const srv = require('../');
const app = require('./test.server');

beforeAll(() => app.start());
afterAll(() => app.stop());

describe('Simple', () => {
    it("should a valid get action", async (done) => {

        const endpoint = '/api/person'
        srv.set({
            url: app.url(),
            end: endpoint,
        });

        const data = await srv.get();

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('GET');
        expect(data.metadata.path).toBe(endpoint);

        done();
    });

    it("should a valid get action with query", async (done) => {
        const query = {
            limit: 10,
            offset: 3
        };
        const endpoint = '/api/person'
        srv.set({
            url: app.url(),
            end: endpoint,
        });
        const data = await srv.get(query);

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('GET');
        expect(data.metadata.path).toBe(endpoint);
        expect(parseInt(data.metadata.param.limit)).toBe(query.limit);
        expect(parseInt(data.metadata.param.offset)).toBe(query.offset);
        done();
    });

    it("should a valid list action", async (done) => {

        const endpoint = '/api/person'
        srv.set({
            url: app.url(),
            end: endpoint,
        });
        const data = await srv.list();

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('GET');
        expect(data.metadata.path).toBe(endpoint);
        done();
    });

    it("should a valid list action with query", async (done) => {
        const query = {
            limit: 10,
            offset: 3
        };
        const endpoint = '/api/person'
        srv.set({
            url: app.url(),
            end: endpoint,
        });
        const data = await srv.list(query);

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('GET');
        expect(data.metadata.path).toBe(endpoint);
        expect(parseInt(data.metadata.param.limit)).toBe(query.limit);
        expect(parseInt(data.metadata.param.offset)).toBe(query.offset);
        done();
    });

    it("should a valid select action", async (done) => {
        const endpoint = '/api/person'
        const personId = 25;
        srv.set({
            url: app.url(),
            end: endpoint,
        });
        const data = await srv.select(personId);

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('GET');
        expect(data.metadata.param.limit).toBe(undefined);
        expect(data.metadata.param.offset).toBe(undefined);
        expect(data.metadata.path).toBe(endpoint + "/" + personId);
        done();
    });

    it("should a valid select action with query", async (done) => {
        const endpoint = '/api/person'
        const personId = 25;
        const query = {
            limit: 10,
            offset: 3
        };
        srv.set({
            url: app.url(),
            end: endpoint,
        });
        const data = await srv.select(personId, query);

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('GET');
        expect(parseInt(data.metadata.param.limit)).toBe(query.limit);
        expect(parseInt(data.metadata.param.offset)).toBe(query.offset);
        expect(data.metadata.path).toBe(endpoint + "/" + personId);
        done();
    });

    it("should a valid insert action", async (done) => {
        const endpoint = '/api/person'
        const payload = {
            name: 'Jon',
            age: 55
        };
        srv.set({
            url: app.url(),
            end: endpoint,
        });
        const data = await srv.insert(payload);

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('POST');
        expect(data.metadata.body.name).toBe(payload.name);
        expect(data.metadata.path).toBe(endpoint);
        done();
    });

    it("should a valid add action", async (done) => {
        const endpoint = '/api/person'
        const payload = {
            name: 'Jon',
            age: 55
        };
        srv.set({
            url: app.url(),
            end: endpoint,
        });
        const data = await srv.add(payload);

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('POST');
        expect(data.metadata.body.name).toBe(payload.name);
        expect(data.metadata.path).toBe(endpoint);
        done();
    });

    it("should a valid update action", async (done) => {
        const personId = 25;
        const endpoint = '/api/person'
        const payload = {
            name: 'Jon',
            age: 55
        };
        srv.set({
            url: app.url(),
            end: endpoint,
        });
        const data = await srv.update(payload, personId);

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('PUT');
        expect(data.metadata.body.name).toBe(payload.name);
        expect(data.metadata.path).toBe(endpoint + "/" + personId);
        done();
    });

    it("should a valid delete action", async (done) => {
        const personId = 25;
        const endpoint = '/api/person'
        srv.set({
            url: app.url(),
            end: endpoint,
        });
        const data = await srv.delete(personId);

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('DELETE');
        expect(data.metadata.path).toBe(endpoint + "/" + personId);
        done();
    });

    it("should a valid custom action", async (done) => {
        const endpoint = '/api/person'
        const payload = {
            dni: 324234423423,
            age: 21
        };
        const data = await srv.request({
            url: app.url() + endpoint,
            method: 'PUT',
            data: {
                ...payload
            }
        });

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('PUT');
        expect(data.metadata.path).toBe(endpoint);
        expect(data.metadata.body.dni).toBe(payload.dni);
        expect(data.metadata.body.age).toBe(payload.age);
        done();
    });
});