const srv = require('kswc');
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

describe('Auth implicit', () => {
    it("should a valid get action", async (done) => {
        srv.set({
            url: app.url(),
            end: endpoint,
            key: token
        });
        const data = await srv.get();

        expect(data).toBeInstanceOf(Object);
        expect(data.method).toBe('GET');
        expect(data.path).toBe(endpoint);
        expect(data.header.authorization).toBe(`Bearer ${token}`);
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
        expect(data.method).toBe('GET');
        expect(data.path).toBe(endpoint);
        expect(parseInt(data.param.limit)).toBe(query.limit);
        expect(parseInt(data.param.offset)).toBe(query.offset);
        expect(data.header.authorization).toBe(`Bearer ${token}`);
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
        expect(data.method).toBe('GET');
        expect(data.path).toBe(endpoint);
        expect(data.header.authorization).toBe(`Bearer ${token}`);
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
        expect(data.method).toBe('GET');
        expect(data.path).toBe(endpoint);
        expect(parseInt(data.param.limit)).toBe(query.limit);
        expect(parseInt(data.param.offset)).toBe(query.offset);
        expect(data.header.authorization).toBe(`Bearer ${token}`);
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
        expect(data.method).toBe('GET');
        expect(data.param.limit).toBe(undefined);
        expect(data.param.offset).toBe(undefined);
        expect(data.path).toBe(endpoint + "/" + personId);
        expect(data.header.authorization).toBe(`Bearer ${token}`);
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
        expect(data.method).toBe('GET');
        expect(parseInt(data.param.limit)).toBe(query.limit);
        expect(parseInt(data.param.offset)).toBe(query.offset);
        expect(data.path).toBe(endpoint + "/" + personId);
        expect(data.header.authorization).toBe(`Bearer ${token}`);
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
        expect(data.method).toBe('POST');
        expect(data.body.name).toBe(payload.name);
        expect(data.path).toBe(endpoint);
        expect(data.header.authorization).toBe(`Bearer ${token}`);
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
        expect(data.method).toBe('PUT');
        expect(data.body.name).toBe(payload.name);
        expect(data.path).toBe(endpoint + "/" + personId);
        expect(data.header.authorization).toBe(`Bearer ${token}`);
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
        expect(data.method).toBe('DELETE');
        expect(data.path).toBe(endpoint + "/" + personId);
        expect(data.header.authorization).toBe(`Bearer ${token}`);
        done();
    });
});