const { expect } = require('@hapi/code');
const sinon = require('sinon');
const { it, describe, before, after } = exports.lab = require('@hapi/lab').script();
const { ProductService } = require('../../lib/service');
const { ProductModel } = require('../mocks/ProductModelMock');

describe('product service', () => {
    it('get products by id', async () => {
        const service = new ProductService();
        sinon.stub(service, 'server').value({
            models: () => {
                return {
                    ProductModel
                };
            }
        });        
        const product = await service.getById(1);
        expect(product.product_id).to.equal(1);
    });

    it('get all products', async () => {
        const service = new ProductService();
        sinon.stub(service, 'server').value({
            models: () => {
                return {
                    ProductModel
                };
            }
        });        
        const params = {
            
        };
        const products = await service.getAll(params);
        //expect(product.product_id).to.equal(1);
    });
})