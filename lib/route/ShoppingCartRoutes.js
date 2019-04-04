
const Joi = require('joi');
const { InvalidArgumentError } = require('../errors');

const generateUniqueId = {
    path: '/shoppingcart/generate-unique-id', 
    method: 'GET',
    options: {
        auth: false,
        tags: ['api']
    },
    handler: (request, h) => {
        const { shoppingCartService } = request.services();
        return {
            "cart_id": shoppingCartService.generateUniqueId()
        }
    }
}

const add = {
    path: '/shoppingcart/add', 
    method: 'POST',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: {
                cart_id: Joi.string().required(),   
                product_id: Joi.number().required(),
                attributes: Joi.string().required(),
                quantity: Joi.number().required()
            },
            failAction: (request, h, err) => {
                throw new InvalidArgumentError(err.message);
            }
        }
    },
    handler: async (request, h) => {       
        const { shoppingCartService } = request.services();
        return await shoppingCartService.add(request.payload);        
    }
}

module.exports = { generateUniqueId, add };