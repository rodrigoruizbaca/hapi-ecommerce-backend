const Joi = require('joi');
const { InvalidArgumentError } = require('../errors');

const get = {
    path: '/customer', 
    method: 'GET',
    options: {
        tags: ['api'],
        plugins: {
            pagination: {
                enabled: false
            }
        },
        auth: 'jwt'
    },
    handler: async (request, h) => {        
        const { email } = request.auth.credentials;
        const { customerService } = request.services();  
        const customer = await customerService.getCustomer(email);
        return customer;        
    }
}

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
            },
            failAction: (request, h, err) => {
                throw new InvalidArgumentError(err.message);
            }
        },
        auth: false
    },
    handler: async (request, h) => {
        
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
        
    }
}

const updateAddress = {
    path: '/customers/address', 
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
                address_1: Joi.string().required(),   
                address_2: Joi.string().optional(),
                city: Joi.string().required(),
                region: Joi.string().required(),
                postal_code: Joi.string().required(),
                country: Joi.string().required(),
                shipping_region_id: Joi.string().required()
            },
            failAction: (request, h, err) => {
                throw new InvalidArgumentError(err.message);
            }
        }
    },
    handler: async (request, h) => {        
        const { email } = request.auth.credentials;
        const { customerService } = request.services();                    
        await customerService.updateCustomer(email, request.payload);
        return h.response().code(200);        
    }
}

const updateCreditCard = {
    path: '/customers/credit-card', 
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
                credit_card: Joi.string().required()
            },
            failAction: (request, h, err) => {
                throw new InvalidArgumentError(err.message);
            }
        }
    },
    handler: async (request, h) => {
        
        const { email } = request.auth.credentials;

        const { customerService } = request.services();                    
        await customerService.updateCustomer(email, request.payload);
        return h.response().code(200);
        
    }
}

const update = {
    path: '/customer', 
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
                name: Joi.string().optional(),
                password: Joi.string().optional(),
                day_phone: Joi.string().optional(),
                eve_phone: Joi.string().optional(),
                mob_phone: Joi.string().optional()
            },
            failAction: (request, h, err) => {
                throw new InvalidArgumentError(err.message);
            }
        }
    },
    handler: async (request, h) => {
       
        const { email } = request.auth.credentials;
        const { customerService } = request.services();                    
        await customerService.updateCustomer(email, request.payload);
        return h.response().code(200);
       
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
            },
            failAction: (request, h, err) => {
                throw new InvalidArgumentError(err.message);
            }
        }
    },
    handler: async (request, h) => {
        
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
        
    }
}

module.exports = { add, login, update, updateAddress, updateCreditCard, get };