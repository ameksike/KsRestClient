const srv = require('../');
const app = require('./test.server');

const endpoint = '/api/person'
const personId = 25;
const token = 'MTYyOTQ5NjMxMDIDMwM24MDAwNjkzMjQ2NQ==';
const payload = {
    name: 'Jon',
    age: 55
};
const query = {
    limit: 10,
    offset: 3
};

beforeAll(() => app.start());
afterAll(() => app.stop());

describe('Auth Explicit', () => {
    it("should a valid get action", async (done) => {
        srv.set({
            url: app.url(),
            end: endpoint,
            key: token
        });
        const data = await srv.get();

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('GET');
        expect(data.metadata.path).toBe(endpoint);
        expect(data.metadata.header.authorization).toBe(`Bearer ${token}`);
        done();
    });

    it("should a valid get action with query", async (done) => {
        srv.set({
            url: app.url(),
            end: endpoint,
            key: token
        });
        const data = await srv.get(query);

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('GET');
        expect(data.metadata.path).toBe(endpoint);
        expect(parseInt(data.metadata.param.limit)).toBe(query.limit);
        expect(parseInt(data.metadata.param.offset)).toBe(query.offset);
        expect(data.metadata.header.authorization).toBe(`Bearer ${token}`);
        done();
    });

    it("should a valid list action", async (done) => {
        srv.set({
            url: app.url(),
            end: endpoint,
            key: token
        });
        const data = await srv.list();

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('GET');
        expect(data.metadata.path).toBe(endpoint);
        expect(data.metadata.header.authorization).toBe(`Bearer ${token}`);
        done();
    });

    it("should a valid list action with query", async (done) => {
        srv.set({
            url: app.url(),
            end: endpoint,
            key: token
        });
        const data = await srv.list(query);

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('GET');
        expect(data.metadata.path).toBe(endpoint);
        expect(parseInt(data.metadata.param.limit)).toBe(query.limit);
        expect(parseInt(data.metadata.param.offset)).toBe(query.offset);
        expect(data.metadata.header.authorization).toBe(`Bearer ${token}`);
        done();
    });

    it("should a valid select action", async (done) => {
        srv.set({
            url: app.url(),
            end: endpoint,
            key: token
        });
        const data = await srv.select(personId);

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('GET');
        expect(data.metadata.param.limit).toBe(undefined);
        expect(data.metadata.param.offset).toBe(undefined);
        expect(data.metadata.path).toBe(endpoint + "/" + personId);
        expect(data.metadata.header.authorization).toBe(`Bearer ${token}`);
        done();
    });

    it("should a valid select action with query", async (done) => {
        srv.set({
            url: app.url(),
            end: endpoint,
            key: token
        });
        const data = await srv.select(personId, query);

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('GET');
        expect(parseInt(data.metadata.param.limit)).toBe(query.limit);
        expect(parseInt(data.metadata.param.offset)).toBe(query.offset);
        expect(data.metadata.path).toBe(endpoint + "/" + personId);
        expect(data.metadata.header.authorization).toBe(`Bearer ${token}`);
        done();
    });

    it("should a valid insert action", async (done) => {
        srv.set({
            url: app.url(),
            end: endpoint,
            key: token
        });
        const data = await srv.insert(payload);

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('POST');
        expect(data.metadata.body.name).toBe(payload.name);
        expect(data.metadata.path).toBe(endpoint);
        expect(data.metadata.header.authorization).toBe(`Bearer ${token}`);
        done();
    });

    it("should a valid update action", async (done) => {
        srv.set({
            url: app.url(),
            end: endpoint,
            key: token
        });
        const data = await srv.update(payload, personId);

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('PUT');
        expect(data.metadata.body.name).toBe(payload.name);
        expect(data.metadata.path).toBe(endpoint + "/" + personId);
        expect(data.metadata.header.authorization).toBe(`Bearer ${token}`);
        done();
    });

    it("should a valid delete action", async (done) => {
        srv.set({
            url: app.url(),
            end: endpoint,
            key: token
        });
        const data = await srv.delete(personId);

        expect(data).toBeInstanceOf(Object);
        expect(data.metadata.method).toBe('DELETE');
        expect(data.metadata.path).toBe(endpoint + "/" + personId);
        expect(data.metadata.header.authorization).toBe(`Bearer ${token}`);
        done();
    });
});