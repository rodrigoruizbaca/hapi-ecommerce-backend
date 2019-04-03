const qs = require('qs');
const Joi = require('joi');

const generateUniqueId = {
    path: '/shoppingcart/generate-unique-id', 
    method: 'GET',
    options: {
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
        tags: ['api'],
        validate: {
            payload: {
                cart_id: Joi.string().required(),   
                product_id: Joi.number().required(),
                attributes: Joi.string().required(),
                quantity: Joi.number().required()
            }
        }
    },
    handler: async (request, h) => {
        try {
            const { shoppingCartService } = request.services();
            return await shoppingCartService.add(request.payload);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = { generateUniqueId, add };