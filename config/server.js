'use strict';

// Dependencies
const Hapi = require('hapi');
const Inert = require('inert');
const parameters = require('./config');
const routes = require('./routes');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');
const Vision = require('vision');
const Schmervice = require('schmervice');
const Schwifty = require('schwifty'); 
const fs   = require('fs');
const path = require('path');

//Services
const ProductService = require('../lib/service/ProductService');
const ShoppingCartService = require('../lib/service/ShoppingCartService');
const CustomerService = require('../lib/service/CustomerService');
const JwtService = require('../lib/service/JwtService');

//Models
const ProductModel = require('../lib/model/ProductModel');
const ShoppingCartModel = require('../lib/model/ShoppingCartModel');
const CustomerModel = require('../lib/model/CustomerModel');

const server = new Hapi.Server({
	host: parameters.server.host,
    port: parameters.server.port
});

const swaggerOptions = {
    info: {
        title: 'Test API Documentation',
        version: Pack.version,
    },
};

const paginationOpts = {
    meta: {
        location: 'body',
        count: {
            active: true,
            name: 'count'
        },
        totalCount: {
            active: true,
            name: 'totalCount'
        },
        pageCount: {
            active: true,
            name: 'pageCount'
        },
        self: {
            active: true,
            name: 'self'
        },
        previous: {
            active: true,
            name: 'previous'
        },
        next: {
            active: true,
            name: 'next'
        },
        hasNext: {
            active: false,
            name: 'hasNext'
        },
        hasPrevious: {
            active: false,
            name: 'hasPrevious'
        },
        first: {
            active: true,
            name: 'first'
        },
        last: {
            active: true,
            name: 'last'
        },
        page: {
            active: false,
            // name == default.query.page.name
        },
        limit: {
            active: false
            // name == default.query.limit.name
        }
    },
    routes: {
        include: ['/product', '/product/search'],
        exclude: ['/documentation', '/shoppingcart​']
    }
};

const filePath = path.join(__dirname, 'public.key');
const publicKEY  = fs.readFileSync(filePath, 'utf8');

const authOpts = { 
    key: publicKEY,
    validate: (decoded, request) => {
        return { isValid: true };
    },          
    verifyOptions: { algorithms: [ 'RS256' ] }
}

const schwiftyOpts = {
    knex: {
        client: 'mysql2',
        connection: {
            host : '127.0.0.1',
            user : 'root',
            password : 'root',
            database : 'store',
            port: 3308
        }
    }
};



module.exports.init = async () => {
	await server.initialize();
    return server;
};

module.exports.start = async () => {
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    await server.register({
        plugin: Schwifty,
        options: schwiftyOpts
    });
    await server.register(
        {
            "plugin": require('hapi-pagination'),
            "options": paginationOpts
        }
    );
    await server.register(Schmervice);
    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt', authOpts);
    //server.auth.default('jwt');

    server.registerService(ProductService);
    server.registerService(ShoppingCartService);
    server.registerService(CustomerService);
    server.registerService(JwtService);

    server.schwifty(ProductModel);
    server.schwifty(ShoppingCartModel);
    server.schwifty(CustomerModel);

    server.route(routes); 

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};
