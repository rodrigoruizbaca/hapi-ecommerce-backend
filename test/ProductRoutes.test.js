
const { expect } = require('@hapi/code');
const { it, describe, beforeEach, afterEach, before, after } = exports.lab = require('@hapi/lab').script();
const { init } = require('../config/server');

describe('GET /products', () => {
    let server;

    before(async () => {
        server = await init();
    });

    after(async () => {
        await server.stop();
    });

    it('responds with 400 if pagination is missing', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/products'
        });
        expect(res.result.code).to.equal('INVALID_ARGUMENT');
        expect(res.statusCode).to.equal(400);
    });

    it('responds with 400 if pagination true but limit and page are missing', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/products?pagination=true'
        });
        expect(res.result.code).to.equal('INVALID_ARGUMENT');
        expect(res.statusCode).to.equal(400);
    });


});