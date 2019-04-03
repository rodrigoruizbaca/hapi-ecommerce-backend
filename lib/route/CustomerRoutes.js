const Joi = require('joi');
const { ServiceError, NotAuthorizedError } = require('../errors');

const login = {
    path: '/customers/login', 
    method: 'POST',
    options: {
        tags: ['api'],
        plugins: {
            pagination: {
                enabled: false
            }
        },
        validate: {
            payload: {
                email: Joi.string().required(),
                password: Joi.string().required()
            }
        },
        auth: false
    },
    handler: async (request, h) => {
        try {
            const { customerService, jwtService } = request.services();   
            const {email, password} = request.payload;
            const customer = await customerService.login(email, password);
            const name = customer.name;
            const accessToken = await jwtService.generateToken({name , email });
            const expiresIn = jwtService.getExpiration();
            return {
                customer: customer,
                accessToken,
                expiresIn
            };
        } catch (err) {
            if (err instanceof ServiceError) {
                return h.response(err.getJson()).code(err.status);
            }
            throw err;
        }
    }
}

const update = {
    path: '/customers', 
    method: 'PUT',
    options: {
        auth: 'jwt',
        tags: ['api'],
        plugins: {
            pagination: {
                enabled: false
            }
        },
        validate: {
            payload: {
                name: Joi.string().required(),   
                email: Joi.string().required(),
                password: Joi.string().optional(),
                day_phone: Joi.string().optional(),
                eve_phone: Joi.string().optional(),
                mob_phone: Joi.string().optional()
            }
        }
    },
    handler: async (request, h) => {
        try {
            const { email } = request.auth.credentials;

            if (email !== request.payload.email) {
                throw new NotAuthorizedError('User not authorized');
            }

            const { customerService } = request.services();                    
            await customerService.updateCustomer(request.payload);
            return h.response().code(200);
        } catch (err) {
            if (err instanceof ServiceError) {
                return h.response(err.getJson()).code(err.status);
            }
            throw err;
        }
    }
}

const add = {
    path: '/customers', 
    method: 'POST',
    options: {
        auth: false,
        tags: ['api'],
        plugins: {
            pagination: {
                enabled: false
            }
        },
        validate: {
            payload: {
                name: Joi.string().required(),   
                email: Joi.string().required(),
                password: Joi.string().required()
            }
        }
    },
    handler: async (request, h) => {
        try {
            const { customerService, jwtService } = request.services();            
            const { name, email } = request.payload;            
            const accessToken = await jwtService.generateToken({ name, email });
            const expiresIn = jwtService.getExpiration();
            const savedCustomer = await customerService.addCustomer(request.payload);
            delete savedCustomer.password;
            return {
                customer: savedCustomer,
                accessToken,
                expiresIn
            };
        } catch (err) {
            if (err instanceof ServiceError) {
                return h.response(err.getJson()).code(err.status);
            }
            throw err;
        }
    }
}

module.exports = { add, login, update };