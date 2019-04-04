const qs = require('qs');
const Joi = require('joi');
const { ServiceError } = require('../errors');

const performSearch = async (request, h) => {
    try {
        const params = qs.parse(request.query);                        
        const { productService } = request.services();
        const { products, total } = await productService.getAll(params);
        const pagination = params.pagination;
        
        if (pagination) {
            return h.paginate(products, total);
        }           
        return h.response(products);
    } catch (err) {
        if (err instanceof ServiceError) {
            return h.response(err.getJson()).code(err.status);
        }
        throw err;
    }  
}

const getById = {
    path: '/products/{id}', 
    method: 'GET',
    config: {
        auth: false,
        tags: ['api'],
        plugins: {
            pagination: {
                enabled: false
            }
        }
    },
    handler: async (request, h) => {
        try {
            const { productService } = request.services();
            const params = qs.parse(request.params);         
            return await productService.getById(params.id);
        } catch (err) {
            if (err instanceof ServiceError) {
                return h.response(err.getJson()).code(err.status);
            }
            throw err;
        } 
    }
}

const search = {
    path: '/products/search', 
    method: 'GET',
    options: {
        auth: false,
        tags: ['api'],
        validate: {           
            query: {              
                limit: Joi.number().integer().when('pagination', {
                    is: true, then: Joi.required(), otherwise: Joi.optional()
                }),
                page: Joi.number().integer().when('pagination', {
                    is: true, then: Joi.required(), otherwise: Joi.optional()
                }),
                pagination: Joi.boolean().required(),
                description_length: Joi.string().optional()
            }
        }
    },
    handler: performSearch
}

const getByCategory = {
    path: '/products/in-category/{category_id}', 
    method: 'GET',
    options: {
        auth: false,
        tags: ['api'],
        validate: {           
            query: {              
                limit: Joi.number().integer().when('pagination', {
                    is: true, then: Joi.required(), otherwise: Joi.optional()
                }),
                page: Joi.number().integer().when('pagination', {
                    is: true, then: Joi.required(), otherwise: Joi.optional()
                }),
                pagination: Joi.boolean().required(),
                description_length: Joi.string().optional()
            },
            params: {
                category_id: Joi.number().required()
            }
        }
    },
    handler: performSearch
}

const getByDepartment = {
    path: '/products/in-department/{department_id}', 
    method: 'GET',
    options: {
        tags: ['api'],
        auth: false,
        validate: {           
            query: {              
                limit: Joi.number().integer().when('pagination', {
                    is: true, then: Joi.required(), otherwise: Joi.optional()
                }),
                page: Joi.number().integer().when('pagination', {
                    is: true, then: Joi.required(), otherwise: Joi.optional()
                }),
                pagination: Joi.boolean().required(),
                description_length: Joi.string().optional()
            },
            params: {
                department_id: Joi.number().required()
            }
        }
    },
    handler: performSearch
}

const getAllProducts = {
    path: '/products', 
    method: 'GET',
    options: {
        plugins: {
            pagination: {
                enabled: true
            }
        },
        tags: ['api'],
        auth: false,
        validate: {           
            query: {              
                limit: Joi.number().integer().when('pagination', {
                    is: true, then: Joi.required(), otherwise: Joi.optional()
                }),
                page: Joi.number().integer().when('pagination', {
                    is: true, then: Joi.required(), otherwise: Joi.optional()
                }),
                pagination: Joi.boolean().required(),
                description_length: Joi.string().optional()
            }
        }
    },
    handler: performSearch
};

const addReview = {
    path: '/products/{product_id}/reviews', 
    method: 'POST',
    options: {
        plugins: {
            pagination: {
                enabled: false
            }
        },
        tags: ['api'],
        auth: 'jwt',
        validate: {           
            payload: {              
                review: Joi.string().required(),
                rating: Joi.number().required(),
            },
            params: {
                product_id: Joi.number().required()
            }
        },
    },
    handler: async (request, h) => {
        try {
            const { email } = request.auth.credentials;
            const { reviewService } = request.services();
            const params = qs.parse(request.payload);   
            return await reviewService.addReview(email, request.params.product_id, params);
        } catch (err) {
            if (err instanceof ServiceError) {
                return h.response(err.getJson()).code(err.status);
            }
            throw err;
        } 
    }
}

const getAllReviews = {
    path: '/products/{product_id}/reviews', 
    method: 'GET',
    options: {
        plugins: {
            pagination: {
                enabled: true
            }
        },
        tags: ['api'],
        auth: false,
        validate: {           
            query: {              
                limit: Joi.number().integer().when('pagination', {
                    is: true, then: Joi.required(), otherwise: Joi.optional()
                }),
                page: Joi.number().integer().when('pagination', {
                    is: true, then: Joi.required(), otherwise: Joi.optional()
                }),
                pagination: Joi.boolean().required(),
            },
            params: {
                product_id: Joi.number().required()
            }
        },

    },
    handler: async (request, h) => {
        try {
            const { reviewService } = request.services();
            const pathParams = qs.parse(request.params);   
            const params = qs.parse(request.query);   
            const pagination = params.pagination;
            const { reviews, total } = await reviewService.getReviews(pathParams.product_id, params);
            
            if (pagination) {
                return h.paginate(reviews, total);
            }           
            return h.response(reviews);
        } catch (err) {
            if (err instanceof ServiceError) {
                return h.response(err.getJson()).code(err.status);
            }
            throw err;
        } 
    }
};

module.exports = { getAllProducts, getById, search, getByCategory, getByDepartment, getAllReviews, addReview };

