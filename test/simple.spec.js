const app = require('kswc/test/server');
const srv = require('kswc');

describe('Simple', () => {
    it("should a valid get action", async (done) => {

        const endpoint = '/api/person'
        srv.set({
            url: app.url,
            end: endpoint,
        });

        const data = await srv.get();

        expect(data).toBeInstanceOf(Object);
        expect(data.method).toBe('GET');
        expect(data.path).toBe(endpoint);

        done();
    });

    it("should a valid get action with query", async (done) => {
        const query = {
            limit: 10,
            offset: 3
        };
        const endpoint = '/api/person'
        srv.set({
            url: app.url,
            end: endpoint,
        });
        const data = await srv.get(query);

        expect(data).toBeInstanceOf(Object);
        expect(data.method).toBe('GET');
        expect(data.path).toBe(endpoint);
        expect(parseInt(data.param.limit)).toBe(query.limit);
        expect(parseInt(data.param.offset)).toBe(query.offset);
        done();
    });

    it("should a valid list action", async (done) => {

        const endpoint = '/api/person'
        srv.set({
            url: app.url,
            end: endpoint,
        });
        const data = await srv.list();

        expect(data).toBeInstanceOf(Object);
        expect(data.method).toBe('GET');
        expect(data.path).toBe(endpoint);
        done();
    });

    it("should a valid list action with query", async (done) => {
        const query = {
            limit: 10,
            offset: 3
        };
        const endpoint = '/api/person'
        srv.set({
            url: app.url,
            end: endpoint,
        });
        const data = await srv.list(query);

        expect(data).toBeInstanceOf(Object);
        expect(data.method).toBe('GET');
        expect(data.path).toBe(endpoint);
        expect(parseInt(data.param.limit)).toBe(query.limit);
        expect(parseInt(data.param.offset)).toBe(query.offset);
        done();
    });

    it("should a valid select action", async (done) => {
        const endpoint = '/api/person'
        const personId = 25;
        srv.set({
            url: app.url,
            end: endpoint,
        });
        const data = await srv.select(personId);

        expect(data).toBeInstanceOf(Object);
        expect(data.method).toBe('GET');
        expect(data.param.limit).toBe(undefined);
        expect(data.param.offset).toBe(undefined);
        expect(data.path).toBe(endpoint + "/" + personId);
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
            url: app.url,
            end: endpoint,
        });
        const data = await srv.select(personId, query);

        expect(data).toBeInstanceOf(Object);
        expect(data.method).toBe('GET');
        expect(parseInt(data.param.limit)).toBe(query.limit);
        expect(parseInt(data.param.offset)).toBe(query.offset);
        expect(data.path).toBe(endpoint + "/" + personId);
        done();
    });

    it("should a valid insert action", async (done) => {
        const endpoint = '/api/person'
        const payload = {
            name: 'Jon',
            age: 55
        };
        srv.set({
            url: app.url,
            end: endpoint,
        });
        const data = await srv.insert(payload);

        expect(data).toBeInstanceOf(Object);
        expect(data.method).toBe('POST');
        expect(data.body.name).toBe(payload.name);
        expect(data.path).toBe(endpoint);
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
            url: app.url,
            end: endpoint,
        });
        const data = await srv.update(payload, personId);

        expect(data).toBeInstanceOf(Object);
        expect(data.method).toBe('PUT');
        expect(data.body.name).toBe(payload.name);
        expect(data.path).toBe(endpoint + "/" + personId);
        done();
    });

    it("should a valid delete action", async (done) => {
        const personId = 25;
        const endpoint = '/api/person'
        srv.set({
            url: app.url,
            end: endpoint,
        });
        const data = await srv.delete(personId);

        expect(data).toBeInstanceOf(Object);
        expect(data.method).toBe('DELETE');
        expect(data.path).toBe(endpoint + "/" + personId);
        done();
    });
});

afterAll(() => {
    app.stop();
});

beforeAll(async () => {
    app.start();
});